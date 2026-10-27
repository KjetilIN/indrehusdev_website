// Background footage for the intro. Swap the files in public/video and update the sources to change it.
export const FOOTAGE = {
    mp4: "/video/intro.mp4",
    webm: "/video/intro.webm",
    poster: "/video/intro-poster.jpg",
    caption: "Run · Swim",
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

export const INTRO_LINKS = [
    { href: "/posts", label: "Posts" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
];
