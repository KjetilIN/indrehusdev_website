import Link from "next/link";
import { getAllPosts, getAllTags, getPostsByTrack, TRACKS, type PostMeta, type Track } from "@/lib/posts";
import type { PostViews } from "@/lib/views";
import PostCard from "./PostCard";
import { TagChip } from "./TagList";

function Segment({ href, label, count, active }: { href: string; label: string; count: number; active: boolean }) {
    return (
        <Link
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex items-baseline gap-2 px-4 py-2 text-xs font-extrabold tracking-[0.2em] uppercase transition ${
                active ? "bg-paper text-bg" : "text-muted hover:bg-surface hover:text-paper"
            }`}
        >
            {label}
            <span className={`font-mono text-[10px] tracking-normal ${active ? "text-bg/60" : "text-muted/70"}`}>{count}</span>
        </Link>
    );
}

export default function PostList({
    posts,
    views,
    activeTag,
    activeTrack,
}: {
    posts: PostMeta[];
    views?: PostViews | null;
    activeTag?: string;
    activeTrack?: Track;
}) {
    const tags = getAllTags(activeTrack ? getPostsByTrack(activeTrack) : getAllPosts());
    const currentTag = getAllTags().find(({ slug }) => slug === activeTag);

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
                <nav aria-label="Filter by track" className="flex divide-x divide-border border border-border">
                    <Segment href="/posts" label="All" count={getAllPosts().length} active={!activeTrack && !activeTag} />
                    {(Object.keys(TRACKS) as Track[]).map((track) => (
                        <Segment
                            key={track}
                            href={`/posts/tracks/${track}`}
                            label={TRACKS[track].label}
                            count={getPostsByTrack(track).length}
                            active={track === activeTrack}
                        />
                    ))}
                </nav>

                {currentTag ? (
                    <p className="font-mono text-xs text-muted">
                        Filtered by <span className="text-accent">#{currentTag.tag}</span> ·{" "}
                        <Link href="/posts" className="text-paper underline underline-offset-4 hover:text-accent">
                            clear
                        </Link>
                    </p>
                ) : (
                    tags.length > 0 && (
                        <details className="group relative">
                            <summary className="flex cursor-pointer list-none items-center gap-2 border border-border px-4 py-2 text-xs font-extrabold tracking-[0.2em] text-muted uppercase transition hover:text-paper [&::-webkit-details-marker]:hidden">
                                Tags
                                <span aria-hidden className="transition group-open:rotate-180">▾</span>
                            </summary>
                            <nav
                                aria-label="Filter by tag"
                                className="absolute right-0 z-20 mt-2 flex w-72 max-w-[calc(100vw-3rem)] flex-wrap gap-2 border border-border bg-surface p-3 shadow-xl shadow-black/40"
                            >
                                {tags.map(({ tag, slug, count }) => (
                                    <TagChip key={slug} label={`#${tag}`} href={`/posts/tags/${slug}`} count={count} />
                                ))}
                            </nav>
                        </details>
                    )
                )}
            </div>

            {posts.length === 0 ? (
                <p className="text-muted">No posts here yet. Check back soon.</p>
            ) : (
                <div className="grid gap-4">
                    {posts.map((post) => (
                        <PostCard key={post.slug} post={post} views={views?.[post.slug]} />
                    ))}
                </div>
            )}
        </div>
    );
}
