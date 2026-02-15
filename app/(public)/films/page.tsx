"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
    Film,
    Play,
    MapPin,
    ArrowRight,
    Sparkles,
    Camera,
    Quote,
    Star,
} from "lucide-react";
import { featuredFilms, testimonials } from "@/lib/site-data";

const VideoBackground = dynamic(() => import("@/components/video-background"), { ssr: false });

const filmFeatures = [
    { title: "Cinematic Storytelling", desc: "Every film is a narrative crafted with dramatic lighting, carefully chosen music, and emotional pacing.", icon: Film },
    { title: "Creative Direction", desc: "From concept to final cut — we direct, shoot, and edit with an eye for visual poetry.", icon: Camera },
    { title: "Vintage & Modern Vibes", desc: "Choose from grainy vintage Bollywood edits to sleek modern cinematic looks — your story, your aesthetic.", icon: Sparkles },
];

export default function FilmsPage() {
    return (
        <div className="bg-[#0a0005] min-h-screen">
            {/* ═══ Video Background Hero ═══ */}
            <Suspense fallback={
                <section className="min-h-[80vh] bg-[#0a0005] flex items-center justify-center">
                    <div className="text-center">
                        <Film className="w-10 h-10 text-amber-400 mx-auto mb-4 animate-pulse" />
                        <p className="text-white/40 font-mono text-sm">Loading cinematic experience...</p>
                    </div>
                </section>
            }>
                <VideoBackground />
            </Suspense>

            {/* ═══ Featured Films ═══ */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-amber-400 font-mono text-xs tracking-[0.2em] uppercase mb-3 block">
                            Featured Works
                        </span>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
                            Recent <span className="text-amber-400">Films</span>
                        </h2>
                        <p className="text-white/40 max-w-xl mx-auto">
                            Every film is a love letter — crafted with cinematic precision and emotional depth
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {featuredFilms.map((film, i) => (
                            <div key={i} className="group rounded-2xl overflow-hidden border border-white/10 hover-glow transition-all duration-500 bg-white/5">
                                {/* Thumbnail */}
                                <div className="relative aspect-video overflow-hidden">
                                    <img
                                        src={film.thumbnail}
                                        alt={film.couple}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                        <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Play className="w-6 h-6 text-white ml-0.5" />
                                        </div>
                                    </div>
                                    <span className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs font-mono px-3 py-1 rounded-full">
                                        {film.duration}
                                    </span>
                                </div>

                                {/* Info */}
                                <div className="p-6">
                                    <h3 className="text-lg font-heading font-bold text-white mb-1">{film.couple}</h3>
                                    <div className="flex items-center gap-2 mb-3">
                                        <MapPin className="w-3 h-3 text-amber-400" />
                                        <span className="text-xs text-amber-400 font-mono">{film.venue}</span>
                                        <span className="text-white/20">·</span>
                                        <span className="text-xs text-white/40">{film.style}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ Film Features ═══ */}
            <section className="py-24 px-6 bg-gradient-to-b from-[#0a0005] via-[#1a1a1a] to-[#0a0005]">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-amber-400 font-mono text-xs tracking-[0.2em] uppercase mb-3 block">
                            Our Process
                        </span>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
                            Crafted with <span className="text-amber-400">Passion</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {filmFeatures.map((feature, i) => (
                            <div key={i} className="text-center p-8 bg-white/5 border border-white/10 rounded-2xl hover-glow transition-all duration-500">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mx-auto mb-6">
                                    <feature.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-lg font-heading font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-sm text-white/40 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ Testimonials ═══ */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="text-amber-400 font-mono text-xs tracking-[0.2em] uppercase mb-3 block">
                            What Couples Say
                        </span>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white">
                            Film <span className="text-amber-400">Reviews</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {testimonials.map((t, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 relative">
                                <Quote className="w-8 h-8 text-amber-400/10 absolute top-6 right-6" />
                                <div className="flex gap-1 mb-4">
                                    {Array.from({ length: t.rating }).map((_, j) => (
                                        <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                                    ))}
                                </div>
                                <p className="text-white/60 leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                                <span className="text-white font-heading font-bold">{t.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ CTA ═══ */}
            <section className="py-24 px-6 bg-gradient-to-t from-[#1a1a1a] to-[#0a0005]">
                <div className="max-w-3xl mx-auto text-center">
                    <span className="text-amber-400 font-mono text-xs tracking-[0.2em] uppercase mb-4 block">
                        Ready to Roll?
                    </span>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
                        Let&apos;s Make Your <span className="text-amber-400">Film</span>
                    </h2>
                    <p className="text-white/40 mb-10 max-w-lg mx-auto">
                        Every love story deserves a cinematic highlight reel. Let us capture yours.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/contact" className="btn-dark-primary px-10 py-4">
                            Book a Session <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link href="/pricing" className="btn-dark-outline px-10 py-4">
                            View Pricing
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
