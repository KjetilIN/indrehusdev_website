import type { WeekLine } from "@/components/home/strava-format";

const km = (value: number) => value.toLocaleString("en-US", { maximumFractionDigits: 1 });

// Kilometres per week, oldest to newest. The current week is the accent bar.
// Bars are plain HTML so labels stay crisp at every width; hover shows the week's numbers.
export default function WeeklyVolume({ weeks, compact = false }: { weeks: WeekLine[]; compact?: boolean }) {
    const max = Math.max(10, ...weeks.map((week) => week.distanceKm));
    const top = Math.ceil(max / 10) * 10;
    const step = top > 40 ? 20 : 10;
    const ticks = Array.from({ length: top / step + 1 }, (_, index) => index * step);

    return (
        <figure>
            <div className={`flex gap-3 ${compact ? "h-16" : "h-48"}`}>
                {!compact && (
                    <div aria-hidden className="relative w-7 shrink-0 font-mono text-[10px] text-muted">
                        {ticks.map((tick) => (
                            <span key={tick} className="absolute right-0 translate-y-1/2" style={{ bottom: `${(tick / top) * 100}%` }}>
                                {tick}
                            </span>
                        ))}
                    </div>
                )}
                <div className="relative flex-1 border-b border-paper/40">
                    {!compact &&
                        ticks.slice(1).map((tick) => (
                            <span
                                key={tick}
                                aria-hidden
                                className="absolute inset-x-0 border-t border-dashed border-border"
                                style={{ bottom: `${(tick / top) * 100}%` }}
                            />
                        ))}
                    <ol aria-hidden className="absolute inset-0 flex items-end gap-0.5">
                        {weeks.map((week, index) => {
                            const current = index === weeks.length - 1;
                            return (
                                <li key={week.weekStart} className="group relative flex h-full flex-1 items-end justify-center">
                                    <span
                                        className={`w-full max-w-8 rounded-t-[4px] transition-colors ${
                                            current ? "bg-accent" : "bg-paper/35 group-hover:bg-paper/70"
                                        }`}
                                        style={{ height: `max(2px, ${(week.distanceKm / top) * 100}%)` }}
                                    />
                                    <span className="pointer-events-none absolute bottom-full z-10 mb-1 hidden border border-border bg-surface px-2 py-1 font-mono text-[10px] whitespace-nowrap text-paper group-hover:block">
                                        {week.label}: {km(week.distanceKm)} km · {week.runs} runs
                                    </span>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </div>
            {!compact && (
                <div aria-hidden className="mt-1 ml-10 flex gap-0.5 font-mono text-[10px] text-muted">
                    {weeks.map((week, index) => (
                        <span key={week.weekStart} className="flex-1 text-center">
                            {index % 3 === 0 || index === weeks.length - 1 ? week.label : ""}
                        </span>
                    ))}
                </div>
            )}
            <figcaption className={compact ? "sr-only" : "mt-3 text-xs text-muted"}>
                Kilometres per week, last {weeks.length} weeks. This week in orange.
            </figcaption>
            <table className="sr-only">
                <thead>
                    <tr>
                        <th>Week of</th>
                        <th>Distance</th>
                        <th>Runs</th>
                    </tr>
                </thead>
                <tbody>
                    {weeks.map((week) => (
                        <tr key={week.weekStart}>
                            <td>{week.label}</td>
                            <td>{km(week.distanceKm)} km</td>
                            <td>{week.runs}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </figure>
    );
}
