import type { StravaLines } from "./strava-format";

export function PoweredByStrava() {
    return (
        <a
            href="https://www.strava.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-[10px] font-bold tracking-[0.2em] text-muted uppercase hover:text-accent"
        >
            Powered by Strava
        </a>
    );
}

export default function StravaStats({ strava }: { strava: StravaLines }) {
    return (
        <dl className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
            {strava.latest && (
                <Stat label="Last run" value={strava.latest.distance} sub={`${strava.latest.pace} · ${strava.latest.when}`} />
            )}
            {strava.longest && (
                <Stat label="Longest run" value={strava.longest.distance} sub={`${strava.longest.time} · ${strava.longest.date}`} />
            )}
            <Stat label={`${strava.ytd.year} distance`} value={strava.ytd.distance} sub={strava.ytd.elevation} />
            <Stat label={`${strava.ytd.year} runs`} value={strava.ytd.runs} />
        </dl>
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
