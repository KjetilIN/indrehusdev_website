import { RACES, type RaceStatus } from "@/lib/races";

const markers: Record<RaceStatus, string> = {
    done: "bg-paper/40 border-paper/40",
    next: "bg-accent border-accent",
    planned: "bg-bg border-paper/60",
    goal: "bg-bg border-accent",
};

const tags: Partial<Record<RaceStatus, string>> = {
    next: "Next",
    goal: "Goal",
};

export default function RaceCalendar() {
    return (
        <ol>
            {RACES.map((race, index) => (
                <li key={race.name} className="relative flex gap-4 pb-6 last:pb-0">
                    {index < RACES.length - 1 && (
                        <span aria-hidden className="absolute top-4 bottom-0 left-[5px] w-px bg-border" />
                    )}
                    <span aria-hidden className={`relative mt-1.5 h-[11px] w-[11px] shrink-0 border-2 ${markers[race.status]}`} />
                    <div className="flex flex-1 flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <p
                            className={`font-archivo text-xl font-extrabold uppercase ${
                                race.status === "done" ? "text-paper/50" : "text-paper"
                            }`}
                        >
                            {race.name}
                            {tags[race.status] && (
                                <span
                                    className={`ml-3 align-middle text-[10px] font-bold tracking-[0.25em] ${
                                        race.status === "done" ? "text-paper/50" : "text-accent"
                                    }`}
                                >
                                    {tags[race.status]}
                                </span>
                            )}
                        </p>
                        <span className="font-mono text-xs text-muted">{race.when}</span>
                    </div>
                </li>
            ))}
        </ol>
    );
}
