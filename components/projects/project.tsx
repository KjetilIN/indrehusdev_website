import type { Repo } from "@/lib/github";

export default function Project({ repo }: { repo: Repo }) {
    return (
        <article className="group relative flex flex-col border border-border bg-surface/60 p-6 transition hover:-translate-y-0.5 hover:border-accent/40">
            <div className="flex items-center justify-between gap-3 font-mono text-xs text-muted">
                <span>{repo.language ?? "Code"}</span>
                {repo.stars > 0 && (
                    <span className="inline-flex items-center gap-1" aria-label={`${repo.stars} stars`}>
                        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {repo.stars}
                    </span>
                )}
            </div>

            <h3 className="mt-3 text-lg font-semibold text-neutral-100 transition group-hover:text-accent">
                <a href={repo.url} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0">
                    {repo.title}
                </a>
            </h3>

            <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-400">{repo.description}</p>

            <span className="mt-5 font-mono text-xs text-muted transition group-hover:text-accent" aria-hidden>
                View on GitHub ↗
            </span>
        </article>
    );
}
