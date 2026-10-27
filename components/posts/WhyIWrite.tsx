import Link from "next/link";
import { TRACKS, type Track } from "@/lib/posts";

const REASONS = [
    {
        title: "Writing is thinking",
        text: "Writing something down is how I find out whether I actually understand it. AI can produce the text, but it can't do the understanding for me.",
    },
    {
        title: "Real experience",
        text: "Models average the internet. Everything here comes from something I built, broke, ran or raced myself, first-hand and checkable.",
    },
    {
        title: "A human voice",
        text: "Opinions, mistakes and dead ends: the parts a generated summary smooths away, and usually the parts worth reading.",
    },
];

export default function WhyIWrite() {
    return (
        <section aria-labelledby="why-i-write" className="mb-16">
            <h2 id="why-i-write" className="mb-6 text-xs font-extrabold tracking-[0.25em] text-accent uppercase">
                Why I write in the age of AI
            </h2>
            <ol className="grid gap-6 sm:grid-cols-3">
                {REASONS.map((reason, index) => (
                    <li key={reason.title} className="border-t-2 border-paper pt-3">
                        <p className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</p>
                        <h3 className="mt-2 font-archivo text-xl leading-tight font-extrabold text-paper">{reason.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-neutral-400">{reason.text}</p>
                    </li>
                ))}
            </ol>

            <h2 className="mt-12 mb-6 text-xs font-extrabold tracking-[0.25em] text-accent uppercase">What I write about</h2>
            <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
                {(Object.keys(TRACKS) as Track[]).map((track) => (
                    <Link
                        key={track}
                        href={`/posts/tracks/${track}`}
                        className="group bg-bg p-5 transition hover:bg-surface"
                    >
                        <div className="flex items-baseline justify-between">
                            <span className="font-archivo text-2xl font-black text-paper uppercase">{TRACKS[track].label}</span>
                            <span className="text-xl text-muted transition group-hover:translate-x-1 group-hover:text-accent">→</span>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-neutral-400">{TRACKS[track].blurb}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
