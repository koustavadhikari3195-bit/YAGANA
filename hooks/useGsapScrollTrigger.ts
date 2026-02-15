"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";

interface UseGsapScrollTriggerOptions {
    /** Start position, e.g. "top 80%" */
    start?: string;
    /** End position, e.g. "bottom 20%" */
    end?: string;
    /** Scrub amount (true or number for smoothing) */
    scrub?: boolean | number;
    /** Pin the trigger element */
    pin?: boolean | string;
    /** Toggle actions: onEnter onLeave onEnterBack onLeaveBack */
    toggleActions?: string;
    /** Markers for debugging */
    markers?: boolean;
}

/**
 * Creates a GSAP ScrollTrigger instance bound to a ref.
 * Returns the trigger ref and a timeline ref for adding animations.
 */
export function useGsapScrollTrigger<T extends HTMLElement = HTMLDivElement>(
    options: UseGsapScrollTriggerOptions = {}
) {
    const triggerRef = useRef<T>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        const el = triggerRef.current;
        if (!el) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: options.start || "top 80%",
                end: options.end || "bottom 20%",
                scrub: options.scrub ?? false,
                pin: options.pin ?? false,
                toggleActions: options.toggleActions || "play none none reverse",
                markers: options.markers || false,
            },
        });

        timelineRef.current = tl;

        return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return { triggerRef, timelineRef };
}
