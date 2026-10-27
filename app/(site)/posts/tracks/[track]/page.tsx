import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import PostList from "@/components/posts/PostList";
import { getPostsByTrack, isTrack, TRACKS, type Track } from "@/lib/posts";
import { getPostViews } from "@/lib/views";

type Props = { params: Promise<{ track: string }> };

export const dynamicParams = false;
export const revalidate = 3600;

export function generateStaticParams() {
    return (Object.keys(TRACKS) as Track[]).map((track) => ({ track }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { track } = await params;
    if (!isTrack(track)) return {};
    return {
        title: TRACKS[track].label,
        description: TRACKS[track].blurb,
        alternates: { canonical: `/posts/tracks/${track}` },
    };
}

export default async function TrackPage({ params }: Props) {
    const { track } = await params;
    if (!isTrack(track)) notFound();
    const views = await getPostViews();

    return (
        <main className="mx-auto max-w-3xl px-6 pt-12 pb-12 sm:pt-16">
            <PageHeader label="01 · Posts" title={TRACKS[track].label}>
                {TRACKS[track].blurb}
            </PageHeader>
            <PostList posts={getPostsByTrack(track)} views={views} activeTrack={track} />
        </main>
    );
}
