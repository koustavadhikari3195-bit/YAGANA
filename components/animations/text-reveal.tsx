"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";
import { splitTextIntoSpans } from "@/lib/gsap-init";

interface TextRevealProps {
    children: ReactNode;
    as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
    mode?: "chars" | "words" | "lines";
    className?: string;
    /** Stagger delay between elements (seconds) */
    stagger?: number;
    /** Animation duration per element */
    duration?: number;
    /** Scrub to scroll (true) or play once (false) */
    scrub?: boolean;
    /** Start trigger position */
    start?: string;
    /** Y offset to animate from */
    fromY?: number;
}

export default function TextReveal({
    children,
    as: Tag = "div",
    mode = "words",
    className = "",
    stagger = 0.05,
    duration = 0.8,
    scrub = false,
    start = "top 85%",
    fromY = 40,
}: TextRevealProps) {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Split text into spans
        const spans = splitTextIntoSpans(el, mode);

        // Animate
        const ctx = gsap.context(() => {
            gsap.from(spans, {
                y: fromY,
                opacity: 0,
                duration,
                stagger,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start,
                    end: scrub ? "bottom 30%" : undefined,
                    scrub: scrub ? 1 : false,
                    toggleActions: scrub ? undefined : "play none none reverse",
                },
            });
        });

        return () => ctx.revert();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Tag
            ref={ref as React.RefObject<never>}
            className={className}
        >
            {children}
        </Tag>
    );
}
