"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";
import { services } from "@/lib/site-data";

/**
 * MorphTransition → Jesko-style horizontal scroll services section.
 * Services displayed as large cards that scroll horizontally.
 */
export default function MorphTransition() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
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
        const track = trackRef.current;
        const header = headerRef.current;
        if (!section || !track || !header) return;

        const ctx = gsap.context(() => {
            const totalWidth = track.scrollWidth;
            const viewportWidth = window.innerWidth;
            const distance = totalWidth - viewportWidth;

            if (distance <= 0) return;

            // Header text reveal
            gsap.from(header.querySelectorAll(".reveal-up"), {
                y: 60,
                opacity: 0,
                stagger: 0.15,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                },
            });

            // Horizontal scroll
            gsap.to(track, {
                x: -distance,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: () => `+=${distance * 1.2}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            // Stagger cards entrance
            gsap.from(track.querySelectorAll(".service-card"), {
                scale: 0.85,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 60%",
                    toggleActions: "play none none reverse",
                },
            });
        });

        return () => ctx.revert();
    }, [isMobile]);

    // Mobile fallback — vertical card list
    if (isMobile) {
        return (
            <section className="py-16 px-6 bg-[#0a0005]">
                <div className="text-center mb-10">
                    <span className="text-amber-400 font-mono text-xs tracking-[0.2em] uppercase mb-3 block">Our Craft</span>
                    <h2 className="text-3xl font-heading font-bold text-white">
                        Our <span className="text-amber-400">Services</span>
                    </h2>
                </div>
                <div className="space-y-4 max-w-md mx-auto">
                    {services.map((s, i) => (
                        <Link key={i} href="/services" className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4 hover:border-amber-400/30 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shrink-0">
                                <s.icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-sm">{s.title}</h3>
                                <p className="text-white/40 text-xs">{s.desc}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section ref={sectionRef} className="relative bg-[#0a0005]">
            {/* Header */}
            <div ref={headerRef} className="absolute top-0 left-0 right-0 z-10 pt-20 pb-8 px-8 pointer-events-none">
                <span className="reveal-up text-amber-400 font-mono text-xs tracking-[0.3em] uppercase mb-3 block">
                    Our Craft
                </span>
                <h2 className="reveal-up text-4xl md:text-5xl font-heading font-bold text-white">
                    Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">Services</span>
                </h2>
            </div>

            {/* Horizontal scroll track */}
            <div ref={trackRef} className="flex items-center gap-8 pt-40 pb-20 pl-8 will-change-transform" style={{ width: "max-content" }}>
                {services.map((s, i) => (
                    <div
                        key={i}
                        className="service-card relative w-[420px] h-[520px] rounded-2xl overflow-hidden border border-white/10 hover:border-amber-400/30 transition-all duration-500 group shrink-0"
                    >
                        {/* Image */}
                        <img
                            src={s.image}
                            alt={s.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                        />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0005] via-[#0a0005]/50 to-transparent" />

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mb-4">
                                <s.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-heading font-bold text-white mb-2">{s.title}</h3>
                            <p className="text-sm text-white/50 leading-relaxed mb-4">{s.desc}</p>
                            {s.highlights && (
                                <div className="flex flex-wrap gap-2">
                                    {s.highlights.slice(0, 3).map((h, j) => (
                                        <span key={j} className="text-[10px] font-mono bg-white/10 text-white/60 px-2 py-1 rounded-full">
                                            {h}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {/* End card — CTA */}
                <div className="service-card w-[350px] h-[520px] rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-900/20 to-[#0a0005] flex flex-col items-center justify-center text-center p-8 shrink-0">
                    <h3 className="text-2xl font-heading font-bold text-white mb-4">
                        Ready to <span className="text-amber-400">Book?</span>
                    </h3>
                    <p className="text-white/40 text-sm mb-8">Let us craft your perfect story</p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold px-8 py-4 rounded-xl hover:from-amber-500 hover:to-amber-400 transition-all shadow-lg shadow-amber-900/30"
                    >
                        Book Now <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
