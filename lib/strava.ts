const STRAVA_API = "https://www.strava.com/api/v3";
const RUN_TYPES = new Set(["Run", "TrailRun", "VirtualRun"]);

export interface LatestRun {
    name: string;
    distanceKm: number;
    paceSecondsPerKm: number;
    date: string;
}

export interface RunningSummary {
    latest: LatestRun | null;
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

// Distance, pace and date only: no maps or start locations, so nothing reveals where runs begin.
export async function getRunningSummary(): Promise<RunningSummary | null> {
    try {
        const token = await getAccessToken();
        if (!token) return null;

        const athlete = await stravaGet<{ id: number }>("/athlete", token);
        const [stats, activities] = await Promise.all([
            stravaGet<{ ytd_run_totals: StravaTotals }>(`/athletes/${athlete.id}/stats`, token),
            stravaGet<StravaActivity[]>("/athlete/activities?per_page=20", token),
        ]);

        const run = activities.find((activity) => RUN_TYPES.has(activity.sport_type));

        return {
            latest: run
                ? {
                      name: run.name,
                      distanceKm: run.distance / 1000,
                      paceSecondsPerKm: run.distance > 0 ? run.moving_time / (run.distance / 1000) : 0,
                      date: run.start_date,
                  }
                : null,
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
