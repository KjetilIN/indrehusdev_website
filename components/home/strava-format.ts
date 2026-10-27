import { daysAgo, formatPace, type RunningSummary } from "@/lib/strava";

export interface StravaLines {
    latest?: { distance: string; pace: string; when: string };
    ytd: { year: number; distance: string; runs: string; elevation: string };
}

const km = (value: number) => value.toLocaleString("en-US", { maximumFractionDigits: 1, minimumFractionDigits: 1 });
const whole = (value: number) => Math.round(value).toLocaleString("en-US").replace(/,/g, " ");

export function formatStrava(summary: RunningSummary): StravaLines {
    return {
        latest: summary.latest
            ? {
                  distance: `${km(summary.latest.distanceKm)} km`,
                  pace: `${formatPace(summary.latest.paceSecondsPerKm)}/km`,
                  when: daysAgo(summary.latest.date),
              }
            : undefined,
        ytd: {
            year: summary.year,
            distance: `${whole(summary.ytd.distanceKm)} km`,
            runs: `${summary.ytd.count} ${summary.ytd.count === 1 ? "run" : "runs"}`,
            elevation: `${whole(summary.ytd.elevationM)} m↑`,
        },
    };
}
