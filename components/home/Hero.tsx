"use client"

import { useState } from "react";
import { FOOTAGE } from "@/lib/footage";
import IntroVideo from "./IntroVideo";

// Full-bleed footage with a caption that follows the montage: marathon now, Ironman next.
export default function Hero() {
    const [chapterIndex, setChapterIndex] = useState(0);
    const chapter = FOOTAGE.chapters[chapterIndex];

    function syncChapter(seconds: number) {
        const index = FOOTAGE.chapters.findIndex((c) => seconds < c.until);
        if (index !== -1 && index !== chapterIndex) setChapterIndex(index);
    }

    return (
        <section className="relative h-svh min-h-[36rem] overflow-hidden bg-bg">
            <IntroVideo
                className="[filter:saturate(0.85)_contrast(1.05)]"
                controlClassName="top-20 right-6 rounded-full border border-paper/30 bg-bg/60 px-3 py-1 text-[11px] font-bold tracking-[0.2em] text-paper uppercase backdrop-blur transition hover:border-paper sm:right-10"
                onTimeUpdate={syncChapter}
            />
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg/80 to-transparent" />
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-bg via-bg/60 to-transparent" />

            <div className="absolute inset-x-0 bottom-0">
                <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 pb-10 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="text-xs font-extrabold tracking-[0.25em] text-accent uppercase">
                            Software developer · Bekk · Oslo
                        </p>
                        <h1 className="mt-4 font-archivo text-[clamp(3.25rem,11vw,7.5rem)] leading-[0.85] font-black tracking-[-0.04em] text-paper uppercase">
                            Kjetil
                            <br />
                            Indrehus
                        </h1>
                        <p className="mt-5 max-w-lg text-lg text-paper/85">
                            Building software by day. Training for my first marathon, and an Ironman 70.3 after that.
                        </p>
                    </div>

                    <div className="w-full max-w-xs border-t-2 border-paper pt-3" aria-live="polite">
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-extrabold tracking-[0.25em] text-accent uppercase">{chapter.label}</p>
                            <div className="flex gap-1.5" aria-hidden>
                                {FOOTAGE.chapters.map((c, index) => (
                                    <span
                                        key={c.label}
                                        className={`h-1 w-6 transition ${index === chapterIndex ? "bg-accent" : "bg-paper/30"}`}
                                    />
                                ))}
                            </div>
                        </div>
                        <p className="mt-2 font-archivo text-xl leading-tight font-extrabold text-paper">{chapter.text}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
