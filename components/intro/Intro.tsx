"use client"

import { useSyncExternalStore } from "react";
import EditorialLook from "./looks/EditorialLook";
import FilmLook from "./looks/FilmLook";
import VhsLook from "./looks/VhsLook";
import type { LookProps } from "./looks/types";

// Temporary while exploring: switch between looks on the same footage and data.
const LOOKS = { film: FilmLook, vhs: VhsLook, editorial: EditorialLook };
type Look = keyof typeof LOOKS;
const DEFAULT_LOOK: Look = "film";
const STORAGE_KEY = "intro-look";
const CHANGE_EVENT = "intro-look-change";

function isLook(value: string | null): value is Look {
    return value !== null && value in LOOKS;
}

// The chosen look lives in ?look= (shareable) with localStorage as a fallback.
function readLook(): Look {
    let stored: string | null = null;
    try {
        stored = localStorage.getItem(STORAGE_KEY);
    } catch {}
    const fromUrl = new URLSearchParams(window.location.search).get("look");
    if (isLook(fromUrl)) return fromUrl;
    return isLook(stored) ? stored : DEFAULT_LOOK;
}

function subscribe(onChange: () => void) {
    window.addEventListener(CHANGE_EVENT, onChange);
    window.addEventListener("popstate", onChange);
    return () => {
        window.removeEventListener(CHANGE_EVENT, onChange);
        window.removeEventListener("popstate", onChange);
    };
}

function chooseLook(next: Look) {
    try {
        localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    const url = new URL(window.location.href);
    url.searchParams.set("look", next);
    window.history.replaceState(null, "", url);
    window.dispatchEvent(new Event(CHANGE_EVENT));
}

export default function Intro(props: LookProps) {
    const look = useSyncExternalStore(subscribe, readLook, () => DEFAULT_LOOK);
    const Current = LOOKS[look];

    return (
        <>
            <Current {...props} />
            <div
                role="radiogroup"
                aria-label="Intro look"
                className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-full border border-white/20 bg-black/70 p-1 font-mono text-[11px] text-white backdrop-blur"
            >
                {(Object.keys(LOOKS) as Look[]).map((name) => (
                    <button
                        key={name}
                        type="button"
                        role="radio"
                        aria-checked={look === name}
                        onClick={() => chooseLook(name)}
                        className={`rounded-full px-3 py-1 uppercase tracking-wider transition ${
                            look === name ? "bg-white text-black" : "text-white/70 hover:text-white"
                        }`}
                    >
                        {name}
                    </button>
                ))}
            </div>
        </>
    );
}
