// Background footage for the home page hero. Swap the files in public/video and update the
// sources and chapters to change it.
export const FOOTAGE = {
    mp4: "/video/intro.mp4",
    webm: "/video/intro.webm",
    poster: "/video/intro-poster.jpg",
    // Time ranges in the montage, each tied to a step in the race calendar (lib/races.ts).
    chapters: [
        { until: 5.7, label: "Now", text: "Marathon build · Manchester, Apr 2027" },
        { until: Infinity, label: "Next", text: "Ironman 70.3 · 2028" },
    ],
    sources: [
        {
            title: "London Marathon 2026",
            author: "Acabashi",
            url: "https://commons.wikimedia.org/wiki/File:2026_London_Marathon_Upper_Thames_Street_from_Blackfriars_Bridge_and_Queenhithe.webm",
            license: "CC BY-SA 4.0",
            licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
        },
        ...[
            ["Triathlon swim start", "Triathlon_plywanie_start.webm"],
            ["swim course", "Triathlon_plywanie_na_trasie.webm"],
            ["swim exit", "Triathlon_plywanie_koniec.webm"],
        ].map(([title, file]) => ({
            title,
            author: "Kapitel",
            url: `https://commons.wikimedia.org/wiki/File:${file}`,
            license: "CC BY-SA 4.0",
            licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
        })),
    ],
};
