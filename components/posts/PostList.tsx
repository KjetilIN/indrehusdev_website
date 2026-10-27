import { getAllTags, type PostMeta } from "@/lib/posts";
import PostCard from "./PostCard";
import { TagChip } from "./TagList";

export default function PostList({
    posts,
    activeTag,
}: {
    posts: PostMeta[];
    activeTag?: string;
}) {
    const tags = getAllTags();

    return (
        <div className="space-y-8">
            {tags.length > 0 && (
                <nav aria-label="Filter by tag" className="flex flex-wrap gap-2">
                    <TagChip label="all" href="/posts" active={!activeTag} />
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
                <p className="text-muted">No posts yet. Check back soon.</p>
            ) : (
                <div className="grid gap-4">
                    {posts.map((post) => (
                        <PostCard key={post.slug} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
}
