import Link from "next/link";
import { getAllTags, TRACKS, type PostMeta, type Track } from "@/lib/posts";
import type { PostViews } from "@/lib/views";
import PostCard from "./PostCard";
import { TagChip } from "./TagList";

function TrackTab({ href, label, active }: { href: string; label: string; active: boolean }) {
    return (
        <Link
            href={href}
            aria-current={active ? "page" : undefined}
            className={`border-b-2 pb-1 font-archivo text-lg font-black uppercase transition ${
                active ? "border-accent text-paper" : "border-transparent text-muted hover:text-paper"
            }`}
        >
            {label}
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
    // Only offer tags that appear in the posts being shown.
    const tags = getAllTags(posts);

    return (
        <div className="space-y-8">
            <nav aria-label="Filter by track" className="flex flex-wrap gap-6">
                <TrackTab href="/posts" label="All" active={!activeTrack && !activeTag} />
                {(Object.keys(TRACKS) as Track[]).map((track) => (
                    <TrackTab
                        key={track}
                        href={`/posts/tracks/${track}`}
                        label={TRACKS[track].label}
                        active={track === activeTrack}
                    />
                ))}
            </nav>

            {tags.length > 0 && (
                <nav aria-label="Filter by tag" className="flex flex-wrap gap-2">
                    {tags.map(({ tag, slug, count }) => (
                        <TagChip
                            key={slug}
                            label={tag}
                            href={`/posts/tags/${slug}`}
                            active={slug === activeTag}
                            count={count}
                        />
                    ))}
                </nav>
            )}

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
