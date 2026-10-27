import type { StravaLines } from "./strava-format";

export default function StravaStats({ strava }: { strava: StravaLines }) {
    return (
        <div>
            <dl className="grid grid-cols-2 gap-px border border-border bg-border">
                {strava.latest && (
                    <>
                        <Stat label="Last run" value={strava.latest.distance} sub={strava.latest.when} />
                        <Stat label="Pace" value={strava.latest.pace} />
                    </>
                )}
                <Stat label={`${strava.ytd.year} distance`} value={strava.ytd.distance} sub={strava.ytd.elevation} />
                <Stat label={`${strava.ytd.year} runs`} value={strava.ytd.runs} />
            </dl>
            <a
                href="https://www.strava.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-[10px] font-bold tracking-[0.2em] text-muted uppercase hover:text-accent"
            >
                Powered by Strava
            </a>
        </div>
    );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
    return (
        <div className="bg-bg px-4 py-4">
            <dt className="text-[10px] font-bold tracking-[0.25em] text-muted uppercase">{label}</dt>
            <dd className="mt-1 font-archivo text-2xl font-black text-paper">{value}</dd>
            {sub && <dd className="text-xs text-muted">{sub}</dd>}
        </div>
    );
}
