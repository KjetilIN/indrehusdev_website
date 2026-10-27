const GITHUB_USER = "KjetilIN";

// Mirrors the pinned repositories on the GitHub profile, in display order.
const PINNED_REPOS = [
    "raycasting",
    "rs-distributed-stats",
    "RusticReach",
    "Renewable-Energy-REST-API",
    "WarGames",
    "rs-search-engine",
];

export interface Repo {
    name: string;
    title: string;
    description: string;
    url: string;
    language: string | null;
    stars: number;
}

export interface GitHubSummary {
    repos: Repo[];
    totalRepos: number;
    totalStars: number;
}

interface GitHubRepoResponse {
    name: string;
    description: string | null;
    html_url: string;
    language: string | null;
    stargazers_count: number;
    updated_at: string;
    fork: boolean;
}

function toRepo(repo: GitHubRepoResponse): Repo {
    return {
        name: repo.name,
        title: repo.name
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
        description: repo.description || "No description available",
        url: repo.html_url,
        language: repo.language,
        stars: repo.stargazers_count,
    };
}

// Fetched on the server and cached for an hour, so visitors never hit GitHub's rate limit.
export async function getGitHubSummary(): Promise<GitHubSummary | null> {
    try {
        const response = await fetch(
            `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`,
            {
                headers: process.env.GITHUB_TOKEN
                    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
                    : undefined,
                next: { revalidate: 3600 },
            }
        );
        if (!response.ok) throw new Error(`GitHub API responded ${response.status}`);

        const ownRepos = ((await response.json()) as GitHubRepoResponse[]).filter((repo) => !repo.fork);

        const pinned = PINNED_REPOS.map((name) => ownRepos.find((repo) => repo.name === name)).filter(
            (repo): repo is GitHubRepoResponse => repo !== undefined
        );

        // Fill any missing pinned slots with the most recently updated repos.
        const pinnedNames = new Set(pinned.map((repo) => repo.name));
        const fillers = ownRepos
            .filter((repo) => !pinnedNames.has(repo.name))
            .sort((a, b) => b.updated_at.localeCompare(a.updated_at));

        return {
            repos: [...pinned, ...fillers].slice(0, PINNED_REPOS.length).map(toRepo),
            totalRepos: ownRepos.length,
            totalStars: ownRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
        };
    } catch (error) {
        console.error("Error fetching GitHub repos:", error);
        return null;
    }
}
