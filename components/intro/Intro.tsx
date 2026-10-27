import Link from "next/link";
import { FOOTAGE, INTRO_LINKS } from "@/lib/footage";
import Credits from "./Credits";
import IntroVideo from "./IntroVideo";
import type { StravaLines } from "./strava-format";

// Running-magazine layout: big type and race-split navigation, with the footage as a framed figure.
export default function Intro({ strava }: { strava: StravaLines | null }) {
    return (
        <main className="min-h-svh bg-[#f1ede4] font-archivo text-[#111]">
            <div className="mx-auto grid min-h-svh max-w-7xl gap-x-16 px-6 py-6 sm:px-10 sm:py-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)] lg:grid-rows-[auto_auto_auto_1fr_auto] xl:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
                <header className="flex items-center justify-between border-b-2 border-[#111] pb-3 text-xs font-extrabold tracking-[0.25em] uppercase lg:col-span-2">
                    <span>Indrehus</span>
                    <span>№ 042 · Oslo</span>
                </header>

                <div className="mt-10 lg:mt-16">
                    <h1 className="text-[clamp(3.5rem,15vw,8rem)] leading-[0.82] font-black tracking-[-0.04em] uppercase lg:text-[clamp(4rem,7vw,8.5rem)]">
                        Kjetil
                        <br />
                        Indrehus
                    </h1>
                    <p className="mt-6 max-w-md text-lg font-medium sm:text-xl">
                        Software developer at Bekk. Runs long distances.
                    </p>
                </div>

                <figure className="mt-10 lg:col-start-2 lg:row-span-3 lg:row-start-2 lg:mt-16 lg:self-start">
                    <div className="relative aspect-video overflow-hidden bg-black lg:aspect-[4/5]">
                        <IntroVideo
                            className="[filter:grayscale(1)_contrast(1.25)_brightness(1.05)]"
                            controlClassName="right-3 bottom-3 rounded-full bg-[#f1ede4] px-3 py-1 text-xs font-bold text-[#111] shadow"
                        />
                        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[#ff4f1f] mix-blend-multiply" />
                        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[#1a1aff]/25 mix-blend-screen" />
                    </div>

                    {/* Race bib pinned to the corner of the photo */}
                    <div className="relative -mt-6 ml-4 w-fit rotate-[-4deg] bg-white px-4 pt-2 pb-3 text-center shadow-lg lg:-mt-8">
                        <div className="flex justify-between gap-10 text-[8px] text-black/40">
                            <span>●</span>
                            <span>●</span>
                        </div>
                        <p className="text-4xl leading-none font-black tracking-tight">042</p>
                        <p className="mt-1 text-[10px] font-bold tracking-[0.3em]">INDREHUS</p>
                    </div>

                    <figcaption className="mt-3 flex justify-between text-[11px] font-bold tracking-[0.25em] uppercase">
                        <span>Fig. 01</span>
                        <span>{FOOTAGE.caption}</span>
                    </figcaption>
                </figure>

                <nav aria-label="Main" className="mt-10 lg:mt-12">
                    <ul>
                        {INTRO_LINKS.map((link, index) => (
                            <li key={link.href} className="border-t-2 border-[#111] last:border-b-2">
                                <Link
                                    href={link.href}
                                    className="group flex items-baseline justify-between gap-4 py-3 transition-all hover:bg-[#111] hover:px-3 hover:text-[#f1ede4]"
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

                {strava ? (
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
                ) : (
                    <div />
                )}

                <Credits showStrava={!!strava} className="mt-10 lg:col-span-2" />
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
