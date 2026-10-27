import Link from "next/link";
import NextRace from "@/components/endurance/NextRace";
import WeeklyVolume from "@/components/endurance/WeeklyVolume";
import SectionHeading from "@/components/SectionHeading";
import type { StravaLines } from "./strava-format";

// A teaser for /endurance: where the training is heading, and what this week looks like.
export default function EnduranceSide({ strava }: { strava: StravaLines | null }) {
    const thisWeek = strava?.weekly.at(-1);

    return (
        <section>
            <SectionHeading eyebrow="02 · Endurance" title="Distance" />
            <p className="mb-8 text-neutral-400">
                A few half marathons done. Now building toward two full marathons in 2027, and an Ironman 70.3 in 2028.
            </p>

            <NextRace compact />

            {strava && (
                <div className="mt-8">
                    <div className="mb-3 flex items-baseline justify-between gap-4">
                        <p className="text-xs font-extrabold tracking-[0.25em] text-muted uppercase">Last 12 weeks</p>
                        {thisWeek && (
                            <p className="font-mono text-xs text-muted">
                                This week <span className="text-paper">{Math.round(thisWeek.distanceKm)} km</span>
                            </p>
                        )}
                    </div>
                    <WeeklyVolume weeks={strava.weekly} compact />
                    {strava.latest && (
                        <p className="mt-3 font-mono text-xs text-muted">
                            Last run <span className="text-paper">{strava.latest.distance}</span> at {strava.latest.pace} ·{" "}
                            {strava.latest.when}
                        </p>
                    )}
                </div>
            )}

            <Link
                href="/endurance"
                className="group mt-8 flex items-baseline gap-4 border-y-2 border-paper py-3 transition-all hover:bg-paper hover:px-3 hover:text-bg"
            >
                <span className="text-xs font-bold tracking-[0.25em] text-accent">→</span>
                <span className="mr-auto font-archivo text-2xl font-black uppercase">Races & training</span>
                <span className="text-xl transition group-hover:translate-x-1">→</span>
            </Link>
        </section>
    );
}
