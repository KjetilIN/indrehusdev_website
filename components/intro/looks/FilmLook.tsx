import Link from "next/link";
import { FOOTAGE, INTRO_LINKS } from "@/lib/footage";
import Credits from "../Credits";
import IntroVideo from "../IntroVideo";
import type { LookProps } from "./types";

// Warm 80s film stock: faded blacks, grain, vignette, a slight gate weave and a light leak.
export default function FilmLook({ strava }: LookProps) {
    return (
        <main className="relative h-svh min-h-[36rem] overflow-hidden bg-[#0d0a07] text-[#f3e9d2]">
            <div className="absolute inset-0 animate-gate-weave">
                <IntroVideo
                    className="[filter:sepia(0.35)_saturate(1.25)_contrast(0.95)_brightness(0.8)]"
                    controlClassName="right-5 bottom-5 font-mono text-xs text-[#f3e9d2]/70 hover:text-[#f3e9d2]"
                />
            </div>

            {/* Grade, light leak, vignette and grain */}
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[#ff9a3c]/10 mix-blend-soft-light" />
            <div aria-hidden className="pointer-events-none absolute -top-1/4 -right-1/4 h-[70vmax] w-[70vmax] animate-light-leak rounded-full bg-[radial-gradient(circle,rgba(255,120,40,0.35),transparent_60%)] mix-blend-screen" />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.75))]" />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/40" />
            <div aria-hidden className="film-grain pointer-events-none absolute -inset-[50%] opacity-[0.22] mix-blend-overlay" />

            <div className="relative z-10 flex h-full flex-col px-6 py-6 sm:px-10 sm:py-8">
                <header className="flex items-center justify-between font-anton text-lg tracking-wider uppercase">
                    <span>KI.</span>
                    <span className="font-mono text-[11px] tracking-[0.3em] opacity-70">{FOOTAGE.caption}</span>
                </header>

                <div className="mt-auto grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
                    <div>
                        <h1 className="font-anton text-[clamp(4.5rem,15vw,13rem)] leading-[0.82] tracking-tight uppercase">
                            Kjetil
                            <br />
                            Indrehus
                        </h1>
                        <p className="mt-5 max-w-md text-lg text-[#f3e9d2]/85 sm:text-xl">
                            Software developer at Bekk. Runs long distances.
                        </p>

                        {strava && (
                            <dl className="mt-8 space-y-1 font-mono text-[11px] tracking-[0.2em] uppercase sm:text-xs">
                                {strava.latest && (
                                    <div className="flex gap-3">
                                        <dt className="w-20 text-[#ffb36b]">Last run</dt>
                                        <dd>
                                            {strava.latest.distance} · {strava.latest.pace} · {strava.latest.when}
                                        </dd>
                                    </div>
                                )}
                                <div className="flex gap-3">
                                    <dt className="w-20 text-[#ffb36b]">{strava.ytd.year}</dt>
                                    <dd>
                                        {strava.ytd.distance} · {strava.ytd.runs} · {strava.ytd.elevation}
                                    </dd>
                                </div>
                            </dl>
                        )}
                    </div>

                    <nav aria-label="Main" className="lg:pb-3">
                        <ul className="flex gap-6 font-anton text-3xl uppercase sm:text-4xl lg:flex-col lg:gap-1 lg:text-right lg:text-5xl">
                            {INTRO_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="transition hover:text-[#ffb36b]">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <Credits showStrava={!!strava} className="mt-6 pr-10 font-mono" />
            </div>
        </main>
    );
}
