import { longestRun, weekStart, weeklyVolume, WEEKS, type Run, type RunningSummary } from "./strava";

// A believable marathon build for local previews (MOCK_STATS=1): three to four runs a week,
// volume ramping from ~25 to ~45 km with a cutback every fourth week, long run on Sundays.
const WEEK_PLAN = [24, 28, 31, 25, 33, 36, 39, 30, 40, 43, 46, 18];

// [day offset from Monday, share of the week, pace s/km, name]
const SESSIONS: [number, number, number, string][] = [
    [0, 0.22, 330, "Easy run"],
    [3, 0.2, 288, "Intervals 6×1 km"],
    [4, 0.13, 345, "Recovery jog"],
    [6, 0.45, 318, "Long run"],
];

export function mockRunningSummary(now = new Date()): RunningSummary {
    const current = weekStart(now);
    const runs: Run[] = [];

    WEEK_PLAN.forEach((weekKm, index) => {
        const monday = new Date(current);
        monday.setUTCDate(monday.getUTCDate() - (WEEKS - 1 - index) * 7);
        for (const [day, share, pace, name] of SESSIONS) {
            const date = new Date(monday);
            date.setUTCDate(date.getUTCDate() + day);
            date.setUTCHours(17, 30);
            if (date > now) continue;
            const distanceKm = Math.round(weekKm * share * 10) / 10;
            runs.push({
                name,
                distanceKm,
                movingSeconds: Math.round(distanceKm * pace),
                paceSecondsPerKm: pace,
                date: date.toISOString(),
            });
        }
    });
    runs.sort((a, b) => b.date.localeCompare(a.date));

    return {
        latest: runs[0] ?? null,
        recent: runs.slice(0, 5),
        weekly: weeklyVolume(runs, now),
        longest: longestRun(runs),
        year: now.getFullYear(),
        ytd: { distanceKm: 1184, count: 142, elevationM: 9630 },
    };
}
