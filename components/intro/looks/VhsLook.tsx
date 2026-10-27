"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { INTRO_LINKS } from "@/lib/footage";
import Credits from "../Credits";
import IntroVideo from "../IntroVideo";
import type { LookProps } from "./types";

const pad = (n: number) => n.toString().padStart(2, "0");

// The tape counter and date stamp only exist in the browser, so they start blank to match the server render.
function useTapeClock() {
    const [clock, setClock] = useState<{ counter: string; date: string } | null>(null);

    useEffect(() => {
        const start = Date.now();
        const id = setInterval(() => {
            const elapsed = Math.floor((Date.now() - start) / 1000);
            const now = new Date();
            setClock({
                counter: `${Math.floor(elapsed / 3600)}:${pad(Math.floor(elapsed / 60) % 60)}:${pad(elapsed % 60)}`,
                date: now.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }).replace(",", "").toUpperCase(),
            });
        }, 1000);
        return () => clearInterval(id);
    }, []);

    return clock;
}

export default function VhsLook({ strava }: LookProps) {
    const clock = useTapeClock();

    return (
        <main className="vhs-text relative h-svh min-h-[36rem] overflow-hidden bg-black font-vt323 text-white">
            <IntroVideo
                className="[filter:saturate(1.7)_contrast(1.15)_brightness(0.85)_hue-rotate(-8deg)_blur(0.6px)]"
                controlClassName="right-6 bottom-6 text-xl text-white/80 hover:text-white"
            />

            {/* Scanlines, tracking noise and a soft CRT vignette */}
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.28)_0px,rgba(0,0,0,0.28)_1px,transparent_1px,transparent_3px)]" />
            <div aria-hidden className="pointer-events-none absolute inset-x-0 h-16 animate-vhs-tracking bg-gradient-to-b from-transparent via-white/15 to-transparent mix-blend-screen" />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.7))]" />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent" />

            <div className="relative z-10 flex h-full flex-col px-6 py-6 text-2xl sm:px-10 sm:py-8 sm:text-3xl">
                <header className="flex items-start justify-between">
                    <span>
                        PLAY <span className="animate-blink">▶</span>
                    </span>
                    <span>SP {clock?.counter ?? "0:00:00"}</span>
                </header>

                <div className="my-auto">
                    <h1 className="text-[clamp(3.5rem,11vw,9rem)] leading-[0.85]">
                        KJETIL
                        <br />
                        INDREHUS
                    </h1>
                    <p className="mt-4 max-w-xl text-2xl text-white/90 sm:text-3xl">
                        SOFTWARE DEVELOPER AT BEKK.
                        <br />
                        RUNS LONG DISTANCES.
                    </p>

                    <nav aria-label="Main" className="mt-8">
                        <ul className="flex flex-col items-start gap-1 text-3xl sm:text-4xl">
                            {INTRO_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="group inline-flex items-center gap-3 px-2 hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black"
                                    >
                                        <span className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100">▶</span>
                                        {link.label.toUpperCase()}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <footer className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        {strava && (
                            <div className="text-xl leading-tight sm:text-2xl">
                                {strava.latest && (
                                    <p>
                                        LAST RUN {strava.latest.distance.toUpperCase()} {strava.latest.pace.toUpperCase()}{" "}
                                        {strava.latest.when.toUpperCase()}
                                    </p>
                                )}
                                <p>
                                    {strava.ytd.year} {strava.ytd.distance.toUpperCase()} {strava.ytd.runs.toUpperCase()}
                                </p>
                            </div>
                        )}
                        <Credits showStrava={!!strava} className="mt-2 font-mono [text-shadow:none]" />
                    </div>
                    <span className="pr-10">{clock?.date ?? ""}</span>
                </footer>
            </div>
        </main>
    );
}
