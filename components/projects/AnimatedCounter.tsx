"use client"

import { useEffect, useState } from "react";

interface AnimatedCounterProps {
    target: number;
    duration?: number;
}

export default function AnimatedCounter({ target, duration = 2000 }: AnimatedCounterProps) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (target === 0) return;

        const startTime = Date.now();
        const endTime = startTime + duration;

        const updateCounter = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);

            // Ease out cubic function for smooth deceleration
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(easeOutCubic * target);

            setCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                setCount(target);
            }
        };

        requestAnimationFrame(updateCounter);
    }, [target, duration]);

    return <span className="font-bold text-white">{count}</span>;
}
