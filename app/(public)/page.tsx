"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
    Camera, Heart, Star, ArrowRight, MapPin, ChevronDown,
    Quote,
} from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";
import { splitTextIntoSpans } from "@/lib/gsap-init";
import {
    stats, services, galleryImages, featuredWeddings,
    testimonials, faqs,
} from "@/lib/site-data";

/* ─── Lazy-load heavy components ─── */
const ScrollCanvas = dynamic(() => import("@/components/scroll-canvas"), { ssr: false });
const MorphTransition = dynamic(() => import("@/components/morph-transition"), { ssr: false });
const VideoBackground = dynamic(() => import("@/components/video-background"), { ssr: false });
const BookingForm = dynamic(() => import("@/components/booking-form"), { ssr: false });
const Counter = dynamic(() => import("@/components/animations/counter"), { ssr: false });

/* ─── Data ─── */
const featuredImages = galleryImages.filter((img) => img.featured).slice(0, 6);
const realWeddings = featuredWeddings;

/* ════════════════════════════════
   ANIMATED SECTION COMPONENT
   ════════════════════════════════ */

function AnimatedSection({
    children,
    className = "",
    delay = 0,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            gsap.from(el.querySelectorAll(".gsap-reveal"), {
                y: 50,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                delay,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });
        });

        return () => ctx.revert();
    }, [delay]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}

/* ════════════════════════════════
   PARALLAX GALLERY GRID
   ════════════════════════════════ */

function ParallaxGallery() {
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const grid = gridRef.current;
        if (!grid) return;

        const ctx = gsap.context(() => {
            const items = grid.querySelectorAll(".gallery-item");
            items.forEach((item, i) => {
                const speed = i % 2 === 0 ? 30 : -20;
                gsap.fromTo(
                    item,
                    { yPercent: speed, opacity: 0.6, scale: 0.92 },
                    {
                        yPercent: -speed * 0.5,
                        opacity: 1,
                        scale: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: item,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1,
                        },
                    }
                );
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {featuredImages.map((img) => (
                <div
                    key={img.id}
                    className="gallery-item group relative overflow-hidden rounded-lg aspect-[3/2] border border-white/10 will-change-transform"
                >
                    <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                        <span className="text-white text-xs font-mono">{img.category}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

/* ════════════════════════════════
   CTA SECTION WITH SCALE ANIMATION
   ════════════════════════════════ */

function ScaleCTA() {
    const ref = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const section = ref.current;
        const text = textRef.current;
        if (!section || !text) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                text,
                { scale: 0.3, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        end: "top 30%",
                        scrub: 1,
                    },
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <section ref={ref} className="py-32 px-6 bg-gradient-to-t from-[#1a1a1a] to-[#0a0005]">
            <div className="max-w-4xl mx-auto text-center">
                <span className="text-amber-400 font-mono text-xs tracking-[0.3em] uppercase mb-6 block">
                    Ready?
                </span>
                <h2
                    ref={textRef}
                    className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-8 will-change-transform"
                >
                    Let&apos;s Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">Magic</span>
                </h2>
                <div className="flex flex-wrap gap-4 justify-center">
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold px-10 py-5 rounded-xl hover:from-amber-500 hover:to-amber-400 transition-all shadow-lg shadow-amber-900/30 text-lg"
                    >
                        Book a Session <ArrowRight className="w-6 h-6" />
                    </Link>
                    <Link
                        href="/gallery"
                        className="inline-flex items-center gap-2 border border-white/20 text-white px-10 py-5 rounded-xl hover:bg-white/5 transition-all text-lg"
                    >
                        View Gallery
                    </Link>
                </div>
            </div>
        </section>
    );
}

/* ════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════ */

export default function HomePage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <>
            {/* ═══════ 1. HERO — Pinned text reveal (ScrollCanvas) ═══════ */}
            <Suspense fallback={<div className="h-screen bg-[#0a0005]" />}>
                <ScrollCanvas />
            </Suspense>

            {/* ═══════ 2. STATS — Animated counters ═══════ */}
            <section className="py-28 px-6 bg-[#0a0005] relative">
                <div className="gold-separator mb-28" />
                <AnimatedSection className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, i) => (
                            <div key={i} className="gsap-reveal text-center">
                                <stat.icon className="w-7 h-7 text-amber-400 mx-auto mb-3" />
                                <span className="block text-3xl md:text-5xl font-heading font-bold text-white">
                                    <Counter
                                        end={parseInt(stat.value.replace(/[^0-9]/g, ""))}
                                        suffix={stat.value.includes("+") ? "+" : stat.value.includes("K") ? "K+" : ""}
                                    />
                                </span>
                                <span className="text-xs text-white/40 uppercase tracking-wider mt-2 block">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>
            </section>

            {/* ═══════ 3. SERVICES — Horizontal scroll (MorphTransition) ═══════ */}
            <Suspense fallback={<div className="h-screen bg-[#0a0005]" />}>
                <MorphTransition />
            </Suspense>

            {/* ═══════ 4. GALLERY — Parallax grid ═══════ */}
            <section className="py-28 px-6 bg-[#0a0005]">
                <AnimatedSection className="max-w-6xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="gsap-reveal text-amber-400 font-mono text-xs tracking-[0.2em] uppercase mb-3 block">Portfolio</span>
                        <h2 className="gsap-reveal text-4xl md:text-6xl font-heading font-bold text-white mb-4">
                            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">Frames</span>
                        </h2>
                        <p className="gsap-reveal text-white/40 max-w-lg mx-auto">Every frame is a story waiting to be told.</p>
                    </div>
                </AnimatedSection>
                <div className="max-w-6xl mx-auto">
                    <ParallaxGallery />
                    <div className="text-center mt-10">
                        <Link href="/gallery" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-mono text-sm tracking-wider transition-colors">
                            View Full Gallery <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ═══════ 5. FILMS — Scroll-scrubbed video (VideoBackground) ═══════ */}
            <Suspense fallback={<div className="h-screen bg-[#0a0005]" />}>
                <VideoBackground />
            </Suspense>

            {/* ═══════ 6. REAL WEDDINGS — Editorial cards with parallax ═══════ */}
            <section className="py-28 px-6 bg-gradient-to-b from-[#0a0005] to-[#1a1a1a]">
                <AnimatedSection className="max-w-6xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="gsap-reveal text-amber-400 font-mono text-xs tracking-[0.2em] uppercase mb-3 block">Real Weddings</span>
                        <h2 className="gsap-reveal text-4xl md:text-6xl font-heading font-bold text-white mb-3">
                            Love <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">Stories</span>
                        </h2>
                    </div>
                </AnimatedSection>

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                    {realWeddings.map((w, i) => (
                        <AnimatedSection key={i} delay={i * 0.15}>
                            <div className="gsap-reveal group rounded-2xl overflow-hidden border border-white/10 hover-glow transition-all duration-500">
                                <div className="overflow-hidden aspect-[4/5]">
                                    <img
                                        src={w.image}
                                        alt={w.couple}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="p-6 bg-white/5">
                                    <h3 className="text-lg font-heading font-bold text-white mb-1">{w.couple}</h3>
                                    <span className="text-xs text-amber-400 font-mono">{w.style}</span>
                                    <p className="text-xs text-white/40 mt-2 leading-relaxed">{w.desc}</p>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </section>

            {/* ═══════ 7. TESTIMONIALS — Quote reveals ═══════ */}
            <section className="py-28 px-6 bg-[#1a1a1a]">
                <AnimatedSection className="max-w-5xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="gsap-reveal text-amber-400 font-mono text-xs tracking-[0.2em] uppercase mb-3 block">Reviews</span>
                        <h2 className="gsap-reveal text-4xl md:text-6xl font-heading font-bold text-white mb-3">
                            Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">Love</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {testimonials.slice(0, 4).map((t, i) => (
                            <div key={i} className="gsap-reveal bg-white/5 border border-white/10 rounded-2xl p-7 relative hover-glow transition-all duration-500">
                                <Quote className="w-8 h-8 text-amber-400/10 absolute top-6 right-6" />
                                <div className="flex gap-1 mb-4">
                                    {Array.from({ length: t.rating }).map((_, j) => (
                                        <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                                    ))}
                                </div>
                                <p className="text-white/60 leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
                                <div>
                                    <span className="text-white font-heading font-bold">{t.name}</span>
                                    <span className="block text-xs text-amber-400/60 mt-0.5">{t.highlight}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>
            </section>

            {/* ═══════ 8. BOOKING — Form section ═══════ */}
            <section className="py-28 px-6 bg-gradient-to-b from-[#1a1a1a] to-[#0a0005]">
                <AnimatedSection className="max-w-6xl mx-auto">
                    <div id="book" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <div>
                            <span className="gsap-reveal text-amber-400 font-mono text-xs tracking-[0.2em] uppercase mb-3 block">Book a Session</span>
                            <h2 className="gsap-reveal text-4xl md:text-5xl font-heading font-bold text-white mb-6">
                                Let&apos;s Create <span className="text-amber-400">Magic</span>
                            </h2>
                            <p className="gsap-reveal text-white/50 leading-relaxed mb-8">
                                Ready to have your love story captured on film? Fill out the form and we&apos;ll confirm your date within 24 hours.
                            </p>
                            <div className="gsap-reveal space-y-3 text-white/40 text-sm">
                                <p className="flex items-center gap-3"><MapPin className="w-4 h-4 text-amber-400" /> Based in Kolkata — Available across India</p>
                                <p className="flex items-center gap-3"><Camera className="w-4 h-4 text-amber-400" /> 500+ weddings documented</p>
                                <p className="flex items-center gap-3"><Heart className="w-4 h-4 text-amber-400" /> Packages from ₹25,000</p>
                            </div>
                        </div>
                        <div className="gsap-reveal">
                            <Suspense fallback={<div className="h-96 bg-white/5 rounded-2xl animate-pulse" />}>
                                <BookingForm />
                            </Suspense>
                        </div>
                    </div>
                </AnimatedSection>
            </section>

            {/* ═══════ 9. FAQ ═══════ */}
            <section className="py-28 px-6 bg-[#0a0005]">
                <AnimatedSection className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="gsap-reveal text-amber-400 font-mono text-xs tracking-[0.2em] uppercase mb-3 block">FAQ</span>
                        <h2 className="gsap-reveal text-3xl md:text-4xl font-heading font-bold text-white">
                            Common <span className="text-amber-400">Questions</span>
                        </h2>
                    </div>
                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <div key={i} className="gsap-reveal bg-white/5 border border-white/10 rounded-xl overflow-hidden hover-glow transition-all">
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full flex items-center justify-between p-5 text-left"
                                >
                                    <span className="font-heading font-bold text-white text-sm pr-4">{faq.q}</span>
                                    <ChevronDown className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                                </button>
                                <div className={`expand-content ${openFaq === i ? "expanded" : ""}`}>
                                    <div>
                                        <div className="px-5 pb-5 text-white/40 text-sm leading-relaxed border-t border-white/10 pt-4">
                                            {faq.a}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>
            </section>

            {/* ═══════ 10. CTA — Scale-in animation ═══════ */}
            <ScaleCTA />
        </>
    );
}
