"use client"

import { useEffect, useRef, useState } from "react";
import { FOOTAGE } from "@/lib/footage";

export default function IntroVideo({
    className = "",
    controlClassName = "",
}: {
    className?: string;
    controlClassName?: string;
}) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(false);

    // Only start playback when the visitor hasn't asked for reduced motion; the poster stays otherwise.
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            video.play().catch(() => {});
        }
    }, []);

    function toggle() {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) video.play().catch(() => {});
        else video.pause();
    }

    return (
        <>
            <video
                ref={videoRef}
                className={`absolute inset-0 h-full w-full object-cover ${className}`}
                poster={FOOTAGE.poster}
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
            >
                <source src={FOOTAGE.webm} type="video/webm" />
                <source src={FOOTAGE.mp4} type="video/mp4" />
            </video>
            <button
                type="button"
                onClick={toggle}
                aria-label={playing ? "Pause background video" : "Play background video"}
                className={`absolute z-30 ${controlClassName}`}
            >
                {playing ? "❚❚" : "▶"}
            </button>
        </>
    );
}
