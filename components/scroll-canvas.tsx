"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";
import { splitTextIntoSpans } from "@/lib/gsap-init";

const HERO_IMAGE =
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=1080&fit=crop&q=80";

/**
 * ScrollCanvas → Jesko-style pinned hero with text reveal + parallax image.
 * No canvas. Pure GSAP ScrollTrigger.
 */
export default function ScrollCanvas() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subtextRef = useRef<HTMLParagraphElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    useEffect(() => {
        if (isMobile) return;

        const section = sectionRef.current;
        const headline = headlineRef.current;
        const subtext = subtextRef.current;
        const image = imageRef.current;
        const overlay = overlayRef.current;
        const cta = ctaRef.current;
        const scrollInd = scrollIndicatorRef.current;

        if (!section || !headline || !subtext || !image || !overlay || !cta || !scrollInd) return;

        const ctx = gsap.context(() => {
            // Pin the section
            ScrollTrigger.create({
                trigger: section,
                start: "top top",
                end: "+=200%",
                pin: true,
                pinSpacing: true,
            });

            // Split headline into characters
            const chars = splitTextIntoSpans(headline, "chars");

            // Timeline scrubbed to scroll
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "+=200%",
                    scrub: 1,
                },
            });

            // 1) Headline chars stagger in
            tl.from(chars, {
                y: 80,
                opacity: 0,
                rotateX: -90,
                stagger: 0.03,
                duration: 0.5,
                ease: "back.out(1.7)",
            }, 0);

            // 2) Scroll indicator fades out
            tl.to(scrollInd, {
                opacity: 0,
                y: -20,
                duration: 0.2,
            }, 0);

            // 3) Subtext fades in
            tl.from(subtext, {
                y: 40,
                opacity: 0,
                duration: 0.4,
                ease: "power3.out",
            }, 0.3);

            // 4) Background image parallax + scale
            tl.fromTo(image, {
                scale: 1.3,
                yPercent: -10,
            }, {
                scale: 1,
                yPercent: 10,
                duration: 1,
                ease: "none",
            }, 0);

            // 5) Overlay darkens then lightens
            tl.fromTo(overlay, {
                opacity: 0.8,
            }, {
                opacity: 0.4,
                duration: 0.5,
            }, 0.2);

            // 6) CTA appears at end
            tl.from(cta, {
                y: 30,
                opacity: 0,
                duration: 0.3,
                ease: "power2.out",
            }, 0.7);
        });

        return () => ctx.revert();
    }, [isMobile]);

    // Mobile fallback
    if (isMobile) {
        return (
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
                <div className="absolute inset-0">
                    <img src={HERO_IMAGE} alt="Wedding" className="w-full h-full object-cover" loading="eager" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0005] via-[#0a0005]/60 to-[#0a0005]/30" />
                <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
                    <span className="text-amber-400 font-mono text-xs tracking-[0.3em] uppercase mb-4 block">◆ Through the Lens</span>
                    <h2 className="text-4xl font-heading font-bold text-white mb-4">
                        We Capture <span className="text-amber-400">Moments</span>
                    </h2>
                    <p className="text-white/50 max-w-md mb-8">Every frame tells a story of love, tradition, and celebration.</p>
                    <Link href="/gallery" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold px-8 py-4 rounded-xl">
                        Explore Gallery <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section ref={sectionRef} className="relative h-screen overflow-hidden">
            {/* Background image */}
            <div ref={imageRef} className="absolute inset-0 will-change-transform">
                <img
                    src={HERO_IMAGE}
                    alt="Wedding couple"
                    className="w-full h-full object-cover"
                    loading="eager"
                />
            </div>

            {/* Dark overlay */}
            <div ref={overlayRef} className="absolute inset-0 bg-[#0a0005]" style={{ opacity: 0.8 }} />

            {/* Film grain */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: "128px 128px",
                }}
            />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                <span className="text-amber-400 font-mono text-xs tracking-[0.4em] uppercase mb-6 block">
                    Rig Photography
                </span>

                <h2
                    ref={headlineRef}
                    className="text-6xl md:text-8xl lg:text-9xl font-heading font-bold text-white mb-6 leading-[0.9]"
                    style={{ perspective: "600px" }}
                >
                    We Capture Moments
                </h2>

                <p
                    ref={subtextRef}
                    className="text-lg md:text-xl text-white/50 max-w-xl leading-relaxed opacity-0"
                >
                    Every frame tells a story of love, tradition, and celebration — crafted with cinematic precision
                </p>

                <div ref={ctaRef} className="mt-10 opacity-0">
                    <Link
                        href="/gallery"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold px-10 py-4 rounded-xl hover:from-amber-500 hover:to-amber-400 transition-all shadow-lg shadow-amber-900/30"
                    >
                        Explore Gallery <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>

            {/* Scroll indicator */}
            <div ref={scrollIndicatorRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
                <span className="text-white/30 text-xs font-mono tracking-widest uppercase">Scroll</span>
                <ChevronDown className="w-5 h-5 text-amber-400 animate-bounce" />
            </div>
        </section>
    );
}
