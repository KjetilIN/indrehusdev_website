import AnimatedCounter from "./AnimatedCounter";

// Total commits aren't exposed by the repos API; this mirrors the GitHub profile badge.
const TOTAL_COMMITS = 4950;

export default function GitHubStats({ totalRepos, totalStars }: { totalRepos: number; totalStars: number }) {
    const stats = [
        { label: "Commits", value: TOTAL_COMMITS, suffix: "+" },
        { label: "Public repositories", value: totalRepos },
        { label: "Stars", value: totalStars },
    ];

    return (
        <dl className="grid grid-cols-3 divide-x divide-border rounded-xl border border-border bg-surface/60">
            {stats.map((stat) => (
                <div key={stat.label} className="px-4 py-5 text-center sm:px-6">
                    <dd className="font-mono text-2xl font-semibold text-neutral-50 sm:text-3xl">
                        <AnimatedCounter target={stat.value} />
                        {stat.suffix}
                    </dd>
                    <dt className="mt-1 text-xs text-muted sm:text-sm">{stat.label}</dt>
                </div>
            ))}
        </dl>
    );
}
