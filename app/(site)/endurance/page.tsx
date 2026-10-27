import type { Metadata } from "next";
import Link from "next/link";
import NextRace from "@/components/endurance/NextRace";
import RecentRuns from "@/components/endurance/RecentRuns";
import WeeklyVolume from "@/components/endurance/WeeklyVolume";
import { formatStrava } from "@/components/home/strava-format";
import StravaStats, { PoweredByStrava } from "@/components/home/StravaStats";
import PageHeader from "@/components/PageHeader";
import PostCard from "@/components/posts/PostCard";
import RaceCalendar from "@/components/RaceCalendar";
import SectionHeading from "@/components/SectionHeading";
import { getPostsByTrack } from "@/lib/posts";
import { getRunningSummary } from "@/lib/strava";
import { getPostViews } from "@/lib/views";

export const metadata: Metadata = {
    title: "Endurance",
    description: "Race calendar, training log and race reports: from half marathons to an Ironman 70.3.",
    alternates: { canonical: "/endurance" },
};

// Strava numbers and view counts are refreshed at most once an hour.
export const revalidate = 3600;

export default async function EndurancePage() {
    const [summary, views] = await Promise.all([getRunningSummary(), getPostViews()]);
    const strava = summary ? formatStrava(summary) : null;
    const posts = getPostsByTrack("endurance").slice(0, 3);

    return (
        <main className="mx-auto max-w-5xl px-6 pt-12 pb-12 sm:pt-16">
            <PageHeader label="02 · Endurance" title="Distance">
                <p className="leading-relaxed">
                    I&apos;ve run a few half marathons. Next is my first full marathon in Manchester in April 2027, then
                    Oslo in the autumn. After that comes swimming and cycling, toward an Ironman 70.3 in 2028.
                </p>
            </PageHeader>

            <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12">
                <div className="min-w-0 space-y-16">
                    <section>
                        <SectionHeading eyebrow="Training log" title="This build" />
                        {strava ? (
                            <div className="space-y-10">
                                <StravaStats strava={strava} />
                                <WeeklyVolume weeks={strava.weekly} />
                                <div>
                                    <p className="mb-3 text-xs font-extrabold tracking-[0.25em] text-muted uppercase">
                                        Recent runs
                                    </p>
                                    <RecentRuns runs={strava.recent} />
                                    <PoweredByStrava />
                                </div>
                            </div>
                        ) : (
                            <p className="text-muted">The training log is offline right now. Check back soon.</p>
                        )}
                    </section>

                    <section>
                        <SectionHeading eyebrow="Writing" title="Race reports & notes" />
                        {posts.length > 0 ? (
                            <div className="grid gap-4">
                                {posts.map((post) => (
                                    <PostCard key={post.slug} post={post} views={views?.[post.slug]} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted">
                                No endurance posts yet. The first race report lands after Manchester.
                            </p>
                        )}
                        <Link
                            href="/posts/tracks/endurance"
                            className="mt-4 inline-block font-mono text-sm text-muted transition hover:text-accent"
                        >
                            All endurance posts →
                        </Link>
                    </section>
                </div>

                <aside className="order-first space-y-10 lg:order-none lg:sticky lg:top-24 lg:self-start">
                    <NextRace compact />
                    <div>
                        <p className="mb-4 text-xs font-extrabold tracking-[0.25em] text-muted uppercase">Race calendar</p>
                        <RaceCalendar />
                    </div>
                </aside>
            </div>
        </main>
    );
}
