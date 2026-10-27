import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostList from "@/components/posts/PostList";
import { getAllTags, getPostsByTag } from "@/lib/posts";

type Props = { params: Promise<{ tag: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
    return getAllTags().map(({ slug }) => ({ tag: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { tag } = await params;
    const label = getAllTags().find((t) => t.slug === tag)?.tag ?? tag;
    return {
        title: `#${label}`,
        description: `Posts tagged ${label}.`,
        alternates: { canonical: `/posts/tags/${tag}` },
    };
}

export default async function TagPage({ params }: Props) {
    const { tag } = await params;
    const entry = getAllTags().find((t) => t.slug === tag);
    if (!entry) notFound();

    return (
        <main className="mx-auto max-w-3xl px-6 pt-12 pb-12 sm:pt-16">
            <header className="mb-10">
                <h1 className="font-mono text-3xl font-bold text-neutral-100">
                    <span className="text-accent">#</span>
                    {entry.tag}
                </h1>
                <p className="mt-3 text-neutral-400">
                    {entry.count} {entry.count === 1 ? "post" : "posts"} tagged {entry.tag}.
                </p>
            </header>
            <PostList posts={getPostsByTag(tag)} activeTag={tag} />
        </main>
    );
}
