import type { Metadata } from "next";
import PostList from "@/components/posts/PostList";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
    title: "Posts",
    description: "Writing on software, research and things I'm learning.",
    alternates: { canonical: "/posts" },
};

export default function PostsPage() {
    return (
        <main className="mx-auto max-w-3xl px-6 pt-28 pb-24">
            <header className="mb-10">
                <h1 className="font-mono text-3xl font-bold text-neutral-100">Posts</h1>
                <p className="mt-3 text-neutral-400">
                    Writing on software, research and things I&apos;m learning.
                </p>
            </header>
            <PostList posts={getAllPosts()} />
        </main>
    );
}
