import Link from "next/link";
import { formatDate, TRACKS, type PostMeta } from "@/lib/posts";
import TagList from "./TagList";
import ViewCount from "./ViewCount";

export default function PostCard({ post, views }: { post: PostMeta; views?: number }) {
    return (
        <article className="group relative border border-border bg-surface/60 p-5 transition hover:-translate-y-0.5 hover:border-accent/40">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted">
                <span
                    className={`font-sans text-[10px] font-bold tracking-[0.25em] uppercase ${
                        post.track === "endurance" ? "text-accent" : "text-paper/70"
                    }`}
                >
                    {TRACKS[post.track].label}
                </span>
                {views !== undefined && (
                    <>
                        <span aria-hidden>·</span>
                        <ViewCount views={views} />
                    </>
                )}
                <span aria-hidden>·</span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden>·</span>
                <span>{post.readingTime}</span>
                {post.draft && <span className="text-amber-400">draft</span>}
            </div>
            <h3 className="mt-2 text-lg font-semibold text-neutral-100 transition group-hover:text-accent">
                <Link href={`/posts/${post.slug}`} className="after:absolute after:inset-0">
                    {post.title}
                </Link>
            </h3>
            {post.description && (
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">{post.description}</p>
            )}
            {post.tags.length > 0 && (
                <div className="relative z-10 mt-4">
                    <TagList tags={post.tags} />
                </div>
            )}
        </article>
    );
}
