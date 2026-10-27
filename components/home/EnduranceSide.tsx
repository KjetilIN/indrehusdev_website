import RaceCalendar from "@/components/RaceCalendar";
import SectionHeading from "@/components/SectionHeading";
import StravaStats from "./StravaStats";
import type { StravaLines } from "./strava-format";

export default function EnduranceSide({ strava }: { strava: StravaLines | null }) {
    return (
        <section>
            <SectionHeading eyebrow="02 · Endurance" title="Distance" />
            <p className="mb-8 text-neutral-400">
                A few half marathons done. Now building toward two full marathons in 2027, and an Ironman 70.3 in 2028.
            </p>

            <RaceCalendar />

            {strava && (
                <div className="mt-10">
                    <p className="mb-3 text-xs font-extrabold tracking-[0.25em] text-muted uppercase">Training log</p>
                    <StravaStats strava={strava} />
                </div>
            )}
        </section>
    );
}
