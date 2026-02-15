"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * useScrollSpeed — Physics hook for motion blur.
 * Tracks window.scrollY, calculates velocity.
 * Returns { velocity, scrollY, direction }
 *
 * Use in components:
 *   style={{ filter: `blur(${velocity * 0.1}px)`, transform: `skewY(${velocity * 0.05}deg)` }}
 */

interface ScrollSpeedResult {
    velocity: number;
    scrollY: number;
    direction: "up" | "down" | "idle";
}

export function useScrollSpeed(smoothing = 0.15): ScrollSpeedResult {
    const [result, setResult] = useState<ScrollSpeedResult>({
        velocity: 0,
        scrollY: 0,
        direction: "idle",
    });

    const prevScrollY = useRef(0);
    const prevTime = useRef(Date.now());
    const velocityRef = useRef(0);
    const rafRef = useRef<number | null>(null);

    const update = useCallback(() => {
        const now = Date.now();
        const dt = Math.max(now - prevTime.current, 1);
        const currentY = window.scrollY;
        const rawVelocity = (currentY - prevScrollY.current) / dt * 16; // normalize to ~60fps

        // Exponential smoothing
        velocityRef.current += (rawVelocity - velocityRef.current) * smoothing;

        const direction: "up" | "down" | "idle" =
            Math.abs(velocityRef.current) < 0.1
                ? "idle"
                : velocityRef.current > 0
                    ? "down"
                    : "up";

        setResult({
            velocity: velocityRef.current,
            scrollY: currentY,
            direction,
        });

        prevScrollY.current = currentY;
        prevTime.current = now;
        rafRef.current = requestAnimationFrame(update);
    }, [smoothing]);

    useEffect(() => {
        rafRef.current = requestAnimationFrame(update);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [update]);

    return result;
}
