import type { RunLine } from "@/components/home/strava-format";

export default function RecentRuns({ runs }: { runs: RunLine[] }) {
    if (runs.length === 0) return null;

    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[20rem] text-left text-sm">
                <thead className="text-[10px] font-bold tracking-[0.25em] text-muted uppercase">
                    <tr className="border-b-2 border-paper">
                        <th className="py-2 font-bold">Date</th>
                        <th className="py-2 font-bold">Run</th>
                        <th className="py-2 text-right font-bold">Distance</th>
                        <th className="py-2 text-right font-bold">Pace</th>
                        <th className="hidden py-2 text-right font-bold sm:table-cell">Time</th>
                    </tr>
                </thead>
                <tbody className="font-mono text-xs">
                    {runs.map((run) => (
                        <tr key={`${run.date}-${run.name}`} className="border-b border-border">
                            <td className="py-3 text-muted">{run.date}</td>
                            <td className="py-3 font-sans text-sm text-paper">{run.name}</td>
                            <td className="py-3 text-right text-paper">{run.distance}</td>
                            <td className="py-3 text-right text-neutral-400">{run.pace}</td>
                            <td className="hidden py-3 text-right text-neutral-400 sm:table-cell">{run.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
