import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import PostList from "@/components/posts/PostList";
import WhyIWrite from "@/components/posts/WhyIWrite";
import { getAllPosts } from "@/lib/posts";
import { getPostViews } from "@/lib/views";

// View counts are refreshed at most once an hour.
export const revalidate = 3600;

export const metadata: Metadata = {
    title: "Posts",
    description: "Writing on code and endurance: things I've built, broken, run and raced.",
    alternates: { canonical: "/posts" },
};

export default async function PostsPage() {
    const views = await getPostViews();

    return (
        <main className="mx-auto max-w-3xl px-6 pt-12 pb-12 sm:pt-16">
            <PageHeader label="01 · Posts" title="Posts">
                Writing on code and endurance: things I&apos;ve built, broken, run and raced.
            </PageHeader>
            <WhyIWrite />
            <PostList posts={getAllPosts()} views={views} />
        </main>
    );
}
