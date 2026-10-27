import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TagList from "@/components/posts/TagList";
import { TocMobile, TocSidebar } from "@/components/posts/TableOfContents";
import { renderMdx } from "@/lib/mdx";
import { extractToc, formatDate, getAllPosts, getPost, TRACKS } from "@/lib/posts";
import ViewCount from "@/components/posts/ViewCount";
import { getPostViews } from "@/lib/views";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const revalidate = 3600;

export function generateStaticParams() {
    return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPost(slug);
    if (!post) return {};

    return {
        title: post.title,
        description: post.description,
        keywords: post.tags,
        alternates: { canonical: `/posts/${post.slug}` },
        openGraph: {
            type: "article",
            title: post.title,
            description: post.description,
            publishedTime: post.date,
            modifiedTime: post.updated,
            tags: post.tags,
            url: `/posts/${post.slug}`,
        },
        twitter: { card: "summary_large_image", title: post.title, description: post.description },
    };
}

export default async function PostPage({ params }: Props) {
    const { slug } = await params;
    const post = getPost(slug);
    if (!post) notFound();

    const content = await renderMdx(post.content);
    const toc = extractToc(post.content);
    const views = (await getPostViews())?.[post.slug];

    return (
        <main className="mx-auto max-w-5xl px-6 pt-12 pb-12 sm:pt-16">
            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-12">
                <article className="min-w-0">
                    <Link href="/posts" className="font-mono text-sm text-muted transition hover:text-accent">
                        ← All posts
                    </Link>

                    <header className="mt-6 mb-10">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted">
                            <Link
                                href={`/posts/tracks/${post.track}`}
                                className="font-sans text-[10px] font-bold tracking-[0.25em] text-accent uppercase hover:underline"
                            >
                                {TRACKS[post.track].label}
                            </Link>
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
                            {post.updated && (
                                <>
                                    <span aria-hidden>·</span>
                                    <span>updated {formatDate(post.updated)}</span>
                                </>
                            )}
                        </div>
                        <h1 className="mt-3 font-archivo text-4xl leading-[0.95] font-black tracking-[-0.03em] text-paper sm:text-5xl">
                            {post.title}
                        </h1>
                        {post.description && (
                            <p className="mt-4 text-lg text-neutral-400">{post.description}</p>
                        )}
                        {post.tags.length > 0 && (
                            <div className="mt-5">
                                <TagList tags={post.tags} />
                            </div>
                        )}
                        <span aria-hidden className="mt-8 block h-0.5 w-12 bg-accent" />
                    </header>

                    <TocMobile items={toc} />

                    <div className="prose prose-invert max-w-none prose-headings:scroll-mt-24 prose-a:no-underline hover:prose-a:underline">
                        {content}
                    </div>
                </article>

                <aside className="hidden lg:block">
                    <TocSidebar items={toc} />
                </aside>
            </div>
        </main>
    );
}
