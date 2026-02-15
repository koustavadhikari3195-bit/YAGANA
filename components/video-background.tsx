"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";
import { splitTextIntoSpans } from "@/lib/gsap-init";

const VIDEO_SRC =
    "https://cdn.coverr.co/videos/coverr-wedding-couple-in-nature-5226/1080p.mp4";
const POSTER_SRC =
    "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1920&h=1080&fit=crop&q=60";

/**
 * VideoBackground → Jesko-style scroll-scrubbed video with text overlays.
 */
export default function VideoBackground() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subtextRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const playBtnRef = useRef<HTMLDivElement>(null);
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
        const video = videoRef.current;
        const headline = headlineRef.current;
        const subtext = subtextRef.current;
        const cta = ctaRef.current;
        const playBtn = playBtnRef.current;

        if (!section || !video || !headline || !subtext || !cta || !playBtn) return;

        const ctx = gsap.context(() => {
            // Wait for video metadata
            const setupVideo = () => {
                if (!video.duration || isNaN(video.duration)) return;

                // Scrub video playback to scroll
                ScrollTrigger.create({
                    trigger: section,
                    start: "top top",
                    end: "+=300%",
                    pin: true,
                    scrub: 1,
                    onUpdate: (self) => {
                        if (video.duration) {
                            video.currentTime = self.progress * video.duration;
                        }
                    },
                });
            };

            // Try to set up immediately or on loadedmetadata
            if (video.readyState >= 1) {
                setupVideo();
            } else {
                video.addEventListener("loadedmetadata", setupVideo, { once: true });
            }

            // Text reveals
            const words = splitTextIntoSpans(headline, "words");
            gsap.from(words, {
                y: 60,
                opacity: 0,
                stagger: 0.08,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 60%",
                    toggleActions: "play none none reverse",
                },
            });

            gsap.from(subtext, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 50%",
                    toggleActions: "play none none reverse",
                },
            });

            gsap.from(cta, {
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 40%",
                    toggleActions: "play none none reverse",
                },
            });

            // Play button pulse
            gsap.to(playBtn, {
                scale: 1.1,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        });

        return () => ctx.revert();
    }, [isMobile]);

    // Mobile fallback
    if (isMobile) {
        return (
            <section className="relative min-h-[80vh] flex items-center overflow-hidden">
                <div className="absolute inset-0">
                    <img src={POSTER_SRC} alt="Wedding film" className="w-full h-full object-cover" loading="eager" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0005] via-[#0a0005]/60 to-[#0a0005]/30" />
                <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
                    <span className="text-amber-400 font-mono text-xs tracking-[0.3em] uppercase mb-4 block">Cinematic Experience</span>
                    <h2 className="text-4xl font-heading font-bold text-white mb-4">Wedding <span className="text-amber-400">Films</span></h2>
                    <p className="text-white/50 max-w-md mb-8">Cinematic wedding films with creative cuts and emotional storytelling.</p>
                    <Link href="/films" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold px-8 py-4 rounded-xl">
                        View Films <Play className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section ref={sectionRef} className="relative h-screen overflow-hidden">
            {/* Video */}
            <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                muted
                playsInline
                preload="auto"
                poster={POSTER_SRC}
            >
                <source src={VIDEO_SRC} type="video/mp4" />
            </video>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0005] via-[#0a0005]/50 to-[#0a0005]/30" />

            {/* Film grain */}
            <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: "128px 128px",
                }}
            />

            {/* Vignette */}
            <div className="absolute inset-0 pointer-events-none" style={{
                background: "radial-gradient(ellipse at center, transparent 50%, rgba(10, 0, 5, 0.6) 100%)",
            }} />

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="text-amber-400 font-mono text-xs tracking-[0.3em] uppercase mb-6 block">
                            Cinematic Experience
                        </span>

                        <h2
                            ref={headlineRef}
                            className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 leading-[1.05]"
                        >
                            Wedding Films
                        </h2>

                        <p
                            ref={subtextRef}
                            className="text-lg text-white/50 leading-relaxed mb-8 max-w-lg opacity-0"
                        >
                            Cinematic wedding films with creative cuts, emotional storytelling,
                            and a vintage Bollywood aesthetic that makes your love story timeless.
                        </p>

                        <div ref={ctaRef} className="flex flex-wrap gap-4 opacity-0">
                            <Link href="/films" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold px-8 py-4 rounded-xl hover:from-amber-500 hover:to-amber-400 transition-all shadow-lg shadow-amber-900/30">
                                View Our Films <Play className="w-5 h-5" />
                            </Link>
                            <Link href="/contact" className="inline-flex items-center gap-2 border border-white/20 text-white px-8 py-4 rounded-xl hover:bg-white/5 transition-all">
                                Book a Session <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Floating play button */}
                    <div className="hidden lg:flex items-center justify-center">
                        <div ref={playBtnRef} className="w-28 h-28 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
                            <Play className="w-12 h-12 text-white ml-1" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
