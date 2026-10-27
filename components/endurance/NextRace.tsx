import { getNextRace, weeksUntil } from "@/lib/races";

// The next race and how many weeks are left. Hidden once nothing is marked "next".
export default function NextRace({ compact = false }: { compact?: boolean }) {
    const race = getNextRace();
    if (!race) return null;
    const weeks = race.date ? weeksUntil(race.date) : null;

    return (
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border border-border bg-surface/60 px-5 py-4">
            <div>
                <p className="text-[10px] font-bold tracking-[0.25em] text-accent uppercase">Next race</p>
                <p className={`mt-1 font-archivo font-black text-paper uppercase ${compact ? "text-xl" : "text-3xl"}`}>
                    {race.name}
                </p>
                <p className="mt-1 font-mono text-xs text-muted">
                    {race.when}
                    {race.distance && ` · ${race.distance}`}
                </p>
            </div>
            {weeks !== null && (
                <p className="shrink-0 text-right">
                    <span className={`block font-archivo leading-none font-black text-accent ${compact ? "text-4xl" : "text-6xl"}`}>
                        {weeks}
                    </span>
                    <span className="text-[10px] font-bold tracking-[0.25em] whitespace-nowrap text-muted uppercase">
                        {weeks === 1 ? "week" : "weeks"} to go
                    </span>
                </p>
            )}
        </div>
    );
}
