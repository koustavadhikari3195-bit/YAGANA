"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";

interface ParallaxImageProps {
    src: string;
    alt: string;
    className?: string;
    /** Speed multiplier — positive moves slower (parallax), negative moves opposite */
    speed?: number;
    /** Scale on scroll */
    scale?: number;
}

export default function ParallaxImage({
    src,
    alt,
    className = "",
    speed = 50,
    scale = 1.15,
}: ParallaxImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const img = imgRef.current;
        if (!container || !img) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                img,
                { yPercent: -speed / 2, scale },
                {
                    yPercent: speed / 2,
                    scale: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: container,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                }
            );
        });

        return () => ctx.revert();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div ref={containerRef} className={`overflow-hidden ${className}`}>
            <img
                ref={imgRef}
                src={src}
                alt={alt}
                className="w-full h-full object-cover will-change-transform"
                loading="lazy"
            />
        </div>
    );
}
