import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import PostList from "@/components/posts/PostList";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
    title: "Posts",
    description: "Writing on software, research and things I'm learning.",
    alternates: { canonical: "/posts" },
};

export default function PostsPage() {
    return (
        <main className="mx-auto max-w-3xl px-6 pt-12 pb-12 sm:pt-16">
            <PageHeader label="Split 01" title="Posts">
                Writing on software, research and things I&apos;m learning.
            </PageHeader>
            <PostList posts={getAllPosts()} />
        </main>
    );
}
