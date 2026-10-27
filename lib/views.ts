import { unstable_cache } from "next/cache";
import { PLAUSIBLE_DOMAIN } from "./site";

export type PostViews = Record<string, number>;

interface PlausibleQueryResponse {
    results: { dimensions: [string]; metrics: [number] }[];
}

// All-time pageviews per post from the Plausible Stats API, keyed by slug.
async function fetchPostViews(): Promise<PostViews | null> {
    const apiKey = process.env.PLAUSIBLE_API_KEY;
    if (!apiKey) return null;

    try {
        const response = await fetch("https://plausible.io/api/v2/query", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                site_id: PLAUSIBLE_DOMAIN,
                metrics: ["pageviews"],
                date_range: "all",
                dimensions: ["event:page"],
                filters: [["contains", "event:page", ["/posts/"]]],
            }),
        });
        if (!response.ok) throw new Error(`Plausible responded ${response.status}`);

        const { results } = (await response.json()) as PlausibleQueryResponse;
        const views: PostViews = {};
        for (const { dimensions, metrics } of results) {
            // Only direct post pages count, not /posts/tags/… or /posts/tracks/….
            const match = dimensions[0].match(/^\/posts\/([^/]+)\/?$/);
            if (match) views[match[1]] = (views[match[1]] ?? 0) + metrics[0];
        }
        return views;
    } catch (error) {
        console.error("Error fetching post views:", error);
        return null;
    }
}

export const getPostViews = unstable_cache(fetchPostViews, ["post-views"], { revalidate: 3600 });

export function formatViews(count: number) {
    return `${count.toLocaleString("en-US").replace(/,/g, " ")} ${count === 1 ? "view" : "views"}`;
}
