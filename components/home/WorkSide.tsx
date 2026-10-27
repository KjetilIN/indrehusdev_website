import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import PostCard from "@/components/posts/PostCard";
import type { PostMeta } from "@/lib/posts";

const LINKS = [
    { href: "/posts", label: "Posts" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
];

export default function WorkSide({ posts }: { posts: PostMeta[] }) {
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

            {posts.length > 0 && (
                <div className="mt-8">
                    <p className="mb-3 text-xs font-extrabold tracking-[0.25em] text-muted uppercase">Latest writing</p>
                    <div className="grid gap-4">
                        {posts.map((post) => (
                            <PostCard key={post.slug} post={post} />
                        ))}
                    </div>
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
