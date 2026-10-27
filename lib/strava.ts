import { mockRunningSummary } from "./strava-mock";

const STRAVA_API = "https://www.strava.com/api/v3";
const RUN_TYPES = new Set(["Run", "TrailRun", "VirtualRun"]);
export const WEEKS = 12;

export interface Run {
    name: string;
    distanceKm: number;
    movingSeconds: number;
    paceSecondsPerKm: number;
    date: string;
}

export interface WeekVolume {
    // Monday of the week, ISO date.
    weekStart: string;
    distanceKm: number;
    runs: number;
}

export interface RunningSummary {
    latest: Run | null;
    recent: Run[];
    weekly: WeekVolume[];
    longest: Run | null;
    year: number;
    ytd: {
        distanceKm: number;
        count: number;
        elevationM: number;
    };
}

interface StravaActivity {
    name: string;
    sport_type: string;
    distance: number;
    moving_time: number;
    start_date: string;
}

interface StravaTotals {
    count: number;
    distance: number;
    elevation_gain: number;
}

async function getAccessToken(): Promise<string | null> {
    const { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN } = process.env;
    if (!STRAVA_CLIENT_ID || !STRAVA_CLIENT_SECRET || !STRAVA_REFRESH_TOKEN) return null;

    const response = await fetch("https://www.strava.com/oauth/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            client_id: STRAVA_CLIENT_ID,
            client_secret: STRAVA_CLIENT_SECRET,
            refresh_token: STRAVA_REFRESH_TOKEN,
            grant_type: "refresh_token",
        }),
        cache: "no-store",
    });
    if (!response.ok) throw new Error(`Strava token refresh responded ${response.status}`);
    return (await response.json()).access_token;
}

async function stravaGet<T>(path: string, token: string): Promise<T> {
    const response = await fetch(`${STRAVA_API}${path}`, {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error(`Strava ${path} responded ${response.status}`);
    return response.json();
}

function toRun(activity: StravaActivity): Run {
    const distanceKm = activity.distance / 1000;
    return {
        name: activity.name,
        distanceKm,
        movingSeconds: activity.moving_time,
        paceSecondsPerKm: distanceKm > 0 ? activity.moving_time / distanceKm : 0,
        date: activity.start_date,
    };
}

// Monday 00:00 UTC of the week containing `date`.
export function weekStart(date: Date) {
    const monday = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    monday.setUTCDate(monday.getUTCDate() - ((monday.getUTCDay() + 6) % 7));
    return monday;
}

// Buckets runs into the last WEEKS weeks, oldest first, including empty weeks.
export function weeklyVolume(runs: Run[], now = new Date()): WeekVolume[] {
    const current = weekStart(now);
    const weeks: WeekVolume[] = Array.from({ length: WEEKS }, (_, index) => {
        const start = new Date(current);
        start.setUTCDate(start.getUTCDate() - (WEEKS - 1 - index) * 7);
        return { weekStart: start.toISOString().slice(0, 10), distanceKm: 0, runs: 0 };
    });
    for (const run of runs) {
        const week = weeks.find((w) => w.weekStart === weekStart(new Date(run.date)).toISOString().slice(0, 10));
        if (week) {
            week.distanceKm += run.distanceKm;
            week.runs += 1;
        }
    }
    return weeks;
}

export function longestRun(runs: Run[]) {
    return runs.reduce<Run | null>((best, run) => (!best || run.distanceKm > best.distanceKm ? run : best), null);
}

// Distance, pace and date only: no maps or start locations, so nothing reveals where runs begin.
export async function getRunningSummary(): Promise<RunningSummary | null> {
    try {
        const token = await getAccessToken();
        if (!token) return process.env.MOCK_STATS === "1" ? mockRunningSummary() : null;

        const after = Math.floor(weekStart(new Date()).getTime() / 1000) - (WEEKS - 1) * 7 * 86_400;
        const athlete = await stravaGet<{ id: number }>("/athlete", token);
        const [stats, activities] = await Promise.all([
            stravaGet<{ ytd_run_totals: StravaTotals }>(`/athletes/${athlete.id}/stats`, token),
            stravaGet<StravaActivity[]>(`/athlete/activities?after=${after}&per_page=200`, token),
        ]);

        // Strava returns activities oldest first when `after` is set.
        const runs = activities
            .filter((activity) => RUN_TYPES.has(activity.sport_type))
            .map(toRun)
            .sort((a, b) => b.date.localeCompare(a.date));

        return {
            latest: runs[0] ?? null,
            recent: runs.slice(0, 5),
            weekly: weeklyVolume(runs),
            longest: longestRun(runs),
            year: new Date().getFullYear(),
            ytd: {
                distanceKm: stats.ytd_run_totals.distance / 1000,
                count: stats.ytd_run_totals.count,
                elevationM: stats.ytd_run_totals.elevation_gain,
            },
        };
    } catch (error) {
        console.error("Error fetching Strava data:", error);
        return null;
    }
}

export function formatDuration(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const rest = Math.round(seconds % 60);
    const mmss = `${minutes.toString().padStart(hours ? 2 : 1, "0")}:${rest.toString().padStart(2, "0")}`;
    return hours ? `${hours}:${mmss}` : mmss;
}

export function formatPace(secondsPerKm: number) {
    const minutes = Math.floor(secondsPerKm / 60);
    const seconds = Math.round(secondsPerKm % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function daysAgo(iso: string) {
    const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
    if (days <= 0) return "today";
    if (days === 1) return "yesterday";
    return `${days} days ago`;
}
