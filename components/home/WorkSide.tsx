import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { formatDate, TRACKS, type PostMeta } from "@/lib/posts";
import { formatViews, type PostViews } from "@/lib/views";

const LINKS = [
    { href: "/posts", label: "Posts" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
];

// Most read when view counts exist, otherwise the latest posts.
function pickPosts(posts: PostMeta[], views: PostViews | null) {
    const hasViews = !!views && posts.some((post) => (views[post.slug] ?? 0) > 0);
    if (!hasViews) return { title: "Latest writing", picked: posts.slice(0, 3), ranked: false };

    const picked = [...posts].sort((a, b) => (views[b.slug] ?? 0) - (views[a.slug] ?? 0)).slice(0, 3);
    return { title: "Most read", picked, ranked: true };
}

export default function WorkSide({ posts, views }: { posts: PostMeta[]; views: PostViews | null }) {
    const { title, picked, ranked } = pickPosts(posts, views);

    return (
        <section>
            <SectionHeading eyebrow="01 · Work" title="Code" />

            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border border-border bg-surface/60 px-5 py-4">
                <div>
                    <p className="font-medium text-paper">Software Developer</p>
                    <p className="text-sm text-muted">Bekk Consulting AS · Oslo</p>
                </div>
                <span className="font-mono text-xs text-muted">Aug 2026 – present</span>
            </div>

            {picked.length > 0 && (
                <div className="mt-8">
                    <p className="mb-3 text-xs font-extrabold tracking-[0.25em] text-muted uppercase">{title}</p>
                    <ol className="border-y border-border">
                        {picked.map((post, index) => (
                            <li key={post.slug} className="border-t border-border first:border-t-0">
                                <Link href={`/posts/${post.slug}`} className="group flex gap-4 py-3">
                                    <span className="pt-1 font-mono text-xs text-accent">
                                        {ranked ? String(index + 1).padStart(2, "0") : "—"}
                                    </span>
                                    <span className="flex-1">
                                        <span className="block font-medium text-paper transition group-hover:text-accent">
                                            {post.title}
                                        </span>
                                        <span className="mt-1 block font-mono text-xs text-muted">
                                            {TRACKS[post.track].label} ·{" "}
                                            {ranked ? formatViews(views?.[post.slug] ?? 0) : formatDate(post.date)}
                                        </span>
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ol>
                </div>
            )}

            <nav aria-label="Sections" className="mt-8">
                <ul>
                    {LINKS.map((link, index) => (
                        <li key={link.href} className="border-t-2 border-paper last:border-b-2">
                            <Link
                                href={link.href}
                                className="group flex items-baseline gap-4 py-3 transition-all hover:bg-paper hover:px-3 hover:text-bg"
                            >
                                <span className="text-xs font-bold tracking-[0.25em] text-accent">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <span className="mr-auto font-archivo text-2xl font-black uppercase">{link.label}</span>
                                <span className="text-xl transition group-hover:translate-x-1">→</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </section>
    );
}
