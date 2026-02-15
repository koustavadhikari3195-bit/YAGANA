"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";

interface ScrollSectionProps {
    children: ReactNode;
    className?: string;
    /** Pin this section while animating */
    pin?: boolean;
    /** How long the pinned section stays (in vh units beyond 100vh) */
    pinSpacerHeight?: string;
    /** Fade-in animation */
    fadeIn?: boolean;
    /** Scale animation */
    scaleFrom?: number;
}

export default function ScrollSection({
    children,
    className = "",
    pin = false,
    pinSpacerHeight = "100%",
    fadeIn = true,
    scaleFrom,
}: ScrollSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const content = contentRef.current;
        if (!section || !content) return;

        const ctx = gsap.context(() => {
            if (pin) {
                ScrollTrigger.create({
                    trigger: section,
                    start: "top top",
                    end: pinSpacerHeight,
                    pin: true,
                    pinSpacing: true,
                });
            }

            const fromVars: gsap.TweenVars = {};
            const toVars: gsap.TweenVars = {
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "top 20%",
                    scrub: 1,
                },
            };

            if (fadeIn) {
                fromVars.opacity = 0;
                toVars.opacity = 1;
            }
            if (scaleFrom !== undefined) {
                fromVars.scale = scaleFrom;
                toVars.scale = 1;
            }

            if (Object.keys(fromVars).length > 0) {
                gsap.fromTo(content, fromVars, toVars);
            }
        });

        return () => ctx.revert();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div ref={sectionRef} className={className}>
            <div ref={contentRef}>
                {children}
            </div>
        </div>
    );
}
