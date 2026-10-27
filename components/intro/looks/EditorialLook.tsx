import Link from "next/link";
import { FOOTAGE, INTRO_LINKS } from "@/lib/footage";
import Credits from "../Credits";
import IntroVideo from "../IntroVideo";
import type { LookProps } from "./types";

// Running-magazine layout: duotone video panel, huge type, navigation as race splits.
export default function EditorialLook({ strava }: LookProps) {
    return (
        <main className="min-h-svh bg-[#f1ede4] font-archivo text-[#111]">
            <div className="grid min-h-svh lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                <div className="relative h-[52svh] overflow-hidden bg-black lg:h-auto">
                    <IntroVideo
                        className="[filter:grayscale(1)_contrast(1.25)_brightness(1.05)]"
                        controlClassName="right-4 bottom-4 rounded-full bg-[#f1ede4] px-3 py-1 text-xs font-bold text-[#111]"
                    />
                    <div aria-hidden className="pointer-events-none absolute inset-0 bg-[#ff4f1f] mix-blend-multiply" />
                    <div aria-hidden className="pointer-events-none absolute inset-0 bg-[#1a1aff]/25 mix-blend-screen" />

                    {/* Race bib */}
                    <div className="absolute top-5 left-5 rotate-[-4deg] bg-white px-4 pt-2 pb-3 text-center shadow-lg">
                        <div className="flex justify-between gap-10 text-[8px] text-black/40">
                            <span>●</span>
                            <span>●</span>
                        </div>
                        <p className="text-4xl leading-none font-black tracking-tight">042</p>
                        <p className="mt-1 text-[10px] font-bold tracking-[0.3em]">INDREHUS</p>
                    </div>

                    <p className="absolute bottom-4 left-5 text-[11px] font-bold tracking-[0.25em] text-white uppercase">
                        {FOOTAGE.caption}
                    </p>
                </div>

                <div className="flex flex-col px-6 py-6 sm:px-10 sm:py-8">
                    <header className="flex items-center justify-between border-b-2 border-[#111] pb-3 text-xs font-extrabold tracking-[0.25em] uppercase">
                        <span>Indrehus</span>
                        <span>№ 042 · Oslo</span>
                    </header>

                    <h1 className="mt-10 text-[clamp(3.5rem,15vw,8rem)] lg:text-[clamp(3.5rem,7.2vw,9rem)] leading-[0.82] font-black tracking-[-0.04em] uppercase">
                        Kjetil
                        <br />
                        Indrehus
                    </h1>
                    <p className="mt-6 max-w-md text-lg font-medium sm:text-xl">
                        Software developer at Bekk. Runs long distances.
                    </p>

                    <nav aria-label="Main" className="mt-10">
                        <ul>
                            {INTRO_LINKS.map((link, index) => (
                                <li key={link.href} className="border-t-2 border-[#111] last:border-b-2">
                                    <Link
                                        href={link.href}
                                        className="group flex items-baseline justify-between gap-4 py-3 transition hover:bg-[#111] hover:px-3 hover:text-[#f1ede4]"
                                    >
                                        <span className="text-xs font-bold tracking-[0.25em]">
                                            SPLIT {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <span className="mr-auto text-3xl font-black uppercase sm:text-4xl">{link.label}</span>
                                        <span className="text-2xl transition group-hover:translate-x-1 group-hover:text-[#ff4f1f]">→</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {strava && (
                        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 text-sm sm:grid-cols-4">
                            {strava.latest && (
                                <>
                                    <Stat label="Last run" value={strava.latest.distance} />
                                    <Stat label="Pace" value={strava.latest.pace} sub={strava.latest.when} />
                                </>
                            )}
                            <Stat label={`${strava.ytd.year} distance`} value={strava.ytd.distance} />
                            <Stat label={`${strava.ytd.year} runs`} value={strava.ytd.runs} sub={strava.ytd.elevation} />
                        </dl>
                    )}

                    <Credits showStrava={!!strava} className="mt-auto pt-8" />
                </div>
            </div>
        </main>
    );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
    return (
        <div>
            <dt className="text-[10px] font-bold tracking-[0.25em] text-[#111]/60 uppercase">{label}</dt>
            <dd className="mt-1 text-2xl font-black">{value}</dd>
            {sub && <dd className="text-xs text-[#111]/60">{sub}</dd>}
        </div>
    );
}
