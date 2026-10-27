"use client"

import { useEffect, useRef, useState } from "react";
import { FOOTAGE } from "@/lib/footage";

export default function IntroVideo({
    className = "",
    controlClassName = "",
    onTimeUpdate,
}: {
    className?: string;
    controlClassName?: string;
    onTimeUpdate?: (seconds: number) => void;
}) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(false);

    // Always autoplay; the pause button covers anyone who wants it still.
    // React doesn't reliably set `muted` on server-rendered video, and browsers block unmuted autoplay.
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        video.muted = true;
        video.play().catch(() => {});
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
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onTimeUpdate={(event) => onTimeUpdate?.(event.currentTarget.currentTime)}
            >
                {FOOTAGE.renditions.flatMap((rendition) => [
                    <source key={rendition.webm} src={rendition.webm} type="video/webm" media={rendition.media} />,
                    <source key={rendition.mp4} src={rendition.mp4} type="video/mp4" media={rendition.media} />,
                ])}
            </video>
            <button
                type="button"
                onClick={toggle}
                aria-label={playing ? "Pause video" : "Play video"}
                className={`absolute z-30 ${controlClassName}`}
            >
                {playing ? "❚❚ Pause" : "▶ Play video"}
            </button>
        </>
    );
}
