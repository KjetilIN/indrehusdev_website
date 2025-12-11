"use client"

import { useEffect, useState } from "react";
import Project from "./project";
import AnimatedCounter from "./AnimatedCounter";
import GitHubStats from "./GitHubStats";
import TechStackCarousel from "./TechStackCarousel";

interface GitHubRepo {
    name: string;
    description: string;
    html_url: string;
    language: string;
    stargazers_count: number;
    updated_at: string;
    fork: boolean;
}

export default function ProjectsSection() {
    const [projects, setProjects] = useState<GitHubRepo[]>([]);
    const [totalPublicRepos, setTotalPublicRepos] = useState(0);
    const [totalStars, setTotalStars] = useState(0);
    const [totalCommits, setTotalCommits] = useState(4950); // Based on GitHub profile badge
    const [languageStats, setLanguageStats] = useState<{ [key: string]: number }>({});
    const [loading, setLoading] = useState(true);

    // Hardcoded pinned repositories from GitHub profile
    const PINNED_REPOS = [
        'gpt-tui',
        'simple-ecommerce',
        'LoLStatTracker',
        'GoChatCLI',
        'CryptoHack-Writeup',
        'WebGLCardGame'
    ];

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // Fetch all repos to count non-forked ones
                const allReposResponse = await fetch('https://api.github.com/users/KjetilIN/repos?per_page=100');
                const allRepos = await allReposResponse.json();

                // Filter non-forked repositories
                const nonForkedRepos = allRepos.filter((repo: GitHubRepo) => !repo.fork);

                // Count non-forked repositories
                setTotalPublicRepos(nonForkedRepos.length);

                // Calculate total stars from non-forked repos
                const stars = nonForkedRepos.reduce((sum: number, repo: GitHubRepo) => sum + repo.stargazers_count, 0);
                setTotalStars(stars);

                // Calculate language statistics
                const langStats: { [key: string]: number } = {};
                nonForkedRepos.forEach((repo: GitHubRepo) => {
                    if (repo.language) {
                        langStats[repo.language] = (langStats[repo.language] || 0) + 1;
                    }
                });
                setLanguageStats(langStats);

                // Try to fetch specific pinned repos
                try {
                    const pinnedRepoPromises = PINNED_REPOS.map(repoName =>
                        fetch(`https://api.github.com/repos/KjetilIN/${repoName}`)
                            .then(res => {
                                if (res.ok) {
                                    return res.json();
                                } else {
                                    console.warn(`Failed to fetch pinned repo ${repoName}: ${res.status} ${res.statusText}`);
                                    return null;
                                }
                            })
                            .catch(err => {
                                console.warn(`Error fetching pinned repo ${repoName}:`, err);
                                return null;
                            })
                    );
                    const pinnedRepos = await Promise.all(pinnedRepoPromises);
                    const validPinnedRepos = pinnedRepos.filter((repo): repo is GitHubRepo => repo !== null);

                    // If we successfully fetched all pinned repos, use them
                    // Otherwise fallback to ensure we show 6 projects
                    if (validPinnedRepos.length === PINNED_REPOS.length) {
                        setProjects(validPinnedRepos);
                    } else {
                        console.warn(`Only fetched ${validPinnedRepos.length} of ${PINNED_REPOS.length} pinned repos, falling back to top 6`);
                        throw new Error('Not all pinned repos available');
                    }
                } catch (pinnedError) {
                    // Fallback: Fetch top 6 updated repos for display
                    console.warn('Error fetching pinned repos, falling back to top 6:', pinnedError);
                    const response = await fetch('https://api.github.com/users/KjetilIN/repos?sort=updated&per_page=6');
                    const data = await response.json();
                    setProjects(data);
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (<section className="bg-transparent mt-40 antialiased w-full">
        <div className="min-w-full px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
            <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
                    My Projects
                </h2>
                <p className="mt-6 text-lg font-normal text-neutral-400 sm:text-xl">
                    {totalPublicRepos > 0 ? (
                        <>
                            Building open source projects with <AnimatedCounter target={totalCommits} />+ commits across my repositories.
                        </>
                    ) : (
                        <>
                            Building open source projects with <AnimatedCounter target={totalCommits} />+ commits across my repositories.
                        </>
                    )}
                </p>
            </div>

            <GitHubStats
                totalRepos={totalPublicRepos}
                totalStars={totalStars}
                loading={loading}
            />

            <TechStackCarousel />

            {loading ? (
                <div className="flex justify-center items-center mt-12 sm:mt-16">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 mt-12 text-left sm:mt-16 gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                    {projects.map((project) => (
                        <Project
                            key={project.name}
                            company="GitHub"
                            description={project.description || "No description available"}
                            link={project.html_url}
                            projectTitle={project.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            language={project.language}
                            stars={project.stargazers_count}
                        />
                    ))}
                </div>
            )}
        </div>
    </section>);
}