"use client"

interface Props {
    totalRepos: number;
    totalStars: number;
    loading: boolean;
}

export default function GitHubStats({ totalRepos, totalStars, loading }: Props) {
    if (loading) {
        return null;
    }

    const stats = [
        {
            label: "Public Repositories",
            value: totalRepos,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
            )
        },
        {
            label: "Total Stars",
            value: totalStars,
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
            )
        }
    ];

    return (
        <div className="max-w-4xl mx-auto mb-12">
            {/* Main Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="group relative p-6 rounded-xl bg-gradient-to-br from-neutral-950/95 to-neutral-900/80 border border-neutral-800/50 hover:border-neutral-700 transition-all duration-300 backdrop-blur-sm"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/5 to-neutral-700/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        <div className="relative z-10 flex items-center gap-4">
                            <div className="p-3 rounded-lg bg-neutral-800/60 text-neutral-300 border border-neutral-700/50">
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-white">{stat.value}</p>
                                <p className="text-sm text-neutral-400 mt-1">{stat.label}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
