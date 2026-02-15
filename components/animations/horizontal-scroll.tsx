"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";

interface HorizontalScrollProps {
    children: ReactNode;
    className?: string;
    /** Extra scroll distance multiplier */
    speed?: number;
}

export default function HorizontalScroll({
    children,
    className = "",
    speed = 1,
}: HorizontalScrollProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        const ctx = gsap.context(() => {
            const totalWidth = track.scrollWidth;
            const viewportWidth = window.innerWidth;
            const distance = totalWidth - viewportWidth;

            if (distance <= 0) return;

            gsap.to(track, {
                x: -distance,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: () => `+=${distance * speed}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });
        });

        return () => ctx.revert();
    }, [speed]);

    return (
        <div ref={sectionRef} className={`overflow-hidden ${className}`}>
            <div ref={trackRef} className="flex gap-8 will-change-transform" style={{ width: "max-content" }}>
                {children}
            </div>
        </div>
    );
}
