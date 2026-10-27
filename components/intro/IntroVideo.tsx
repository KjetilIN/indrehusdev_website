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

    // Autoplay unless the visitor asked for reduced motion; then the poster shows with a play button.
    // React doesn't reliably set `muted` on server-rendered video, and browsers block unmuted autoplay.
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        video.muted = true;
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            video.play().catch(() => {});
        }
    }, []);

    function toggle() {
        const video = videoRef.current;
        if (!video) return;
        video.muted = true;
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
                preload="metadata"
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
                aria-label={playing ? "Pause video" : "Play video"}
                className={`absolute z-30 ${controlClassName}`}
            >
                {playing ? "❚❚" : "▶ Play video"}
            </button>
        </>
    );
}
