import { daysAgo, formatDuration, formatPace, type Run, type RunningSummary } from "@/lib/strava";

export interface RunLine {
    name: string;
    date: string;
    distance: string;
    pace: string;
    time: string;
    when: string;
}

export interface WeekLine {
    weekStart: string;
    label: string;
    distanceKm: number;
    runs: number;
}

export interface StravaLines {
    latest?: RunLine;
    longest?: RunLine;
    recent: RunLine[];
    weekly: WeekLine[];
    ytd: { year: number; distance: string; runs: string; elevation: string };
}

const km = (value: number) => value.toLocaleString("en-US", { maximumFractionDigits: 1, minimumFractionDigits: 1 });
const whole = (value: number) => Math.round(value).toLocaleString("en-US").replace(/,/g, " ");

function formatRun(run: Run): RunLine {
    return {
        name: run.name,
        date: new Date(run.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" }),
        distance: `${km(run.distanceKm)} km`,
        pace: `${formatPace(run.paceSecondsPerKm)}/km`,
        time: formatDuration(run.movingSeconds),
        when: daysAgo(run.date),
    };
}

export function formatStrava(summary: RunningSummary): StravaLines {
    return {
        latest: summary.latest ? formatRun(summary.latest) : undefined,
        longest: summary.longest ? formatRun(summary.longest) : undefined,
        recent: summary.recent.map(formatRun),
        weekly: summary.weekly.map((week) => ({
            ...week,
            label: new Date(week.weekStart).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" }),
        })),
        ytd: {
            year: summary.year,
            distance: `${whole(summary.ytd.distanceKm)} km`,
            runs: `${summary.ytd.count} ${summary.ytd.count === 1 ? "run" : "runs"}`,
            elevation: `${whole(summary.ytd.elevationM)} m↑`,
        },
    };
}
