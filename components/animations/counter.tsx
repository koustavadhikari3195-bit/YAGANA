"use client";

import { useRef, useEffect, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";

interface CounterProps {
    /** Target number to count to */
    end: number;
    /** Suffix like "+" or "K" */
    suffix?: string;
    /** Prefix like "₹" */
    prefix?: string;
    /** Duration of count animation */
    duration?: number;
    className?: string;
}

export default function Counter({
    end,
    suffix = "",
    prefix = "",
    duration = 2,
    className = "",
}: CounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const [display, setDisplay] = useState("0");

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const obj = { value: 0 };

        const ctx = gsap.context(() => {
            gsap.to(obj, {
                value: end,
                duration,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
                onUpdate: () => {
                    setDisplay(Math.round(obj.value).toLocaleString());
                },
            });
        });

        return () => ctx.revert();
    }, [end, duration]);

    return (
        <span ref={ref} className={className}>
            {prefix}{display}{suffix}
        </span>
    );
}
