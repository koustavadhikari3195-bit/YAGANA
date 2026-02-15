"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

/* ─── Mobile fallback: Static SVG lens instead of heavy 3D ─── */
export default function MobileFallback() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#0a0005] via-[#1a0a0a] to-[#0a0005]">
            {/* Decorative SVG Lens */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                <LensSVG />
            </div>

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0005] via-transparent to-[#0a0005]/50" />
            <div className="absolute inset-0 pattern-mandala opacity-10" />

            {/* Content */}
            <div className="relative z-10 container-custom py-20">
                <div className="max-w-3xl">
                    <div className="flex items-center gap-2 mb-6">
                        <Sparkles className="w-5 h-5 text-amber-400" />
                        <span className="text-amber-400 font-medium text-sm tracking-widest uppercase">
                            Award Winning Photography
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 leading-tight">
                        Through the{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
                            Lens
                        </span>
                    </h1>
                    <p className="text-xl text-white/60 mb-10 max-w-xl leading-relaxed">
                        Rig Photography — Capturing timeless wedding stories with cinematic precision and artistic vision.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/gallery" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold px-8 py-4 rounded-xl hover:from-amber-500 hover:to-amber-400 transition-all duration-300 shadow-lg shadow-amber-900/30">
                            View Our Work <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link href="/contact" className="inline-flex items-center gap-2 border border-white/20 text-white px-8 py-4 rounded-xl hover:bg-white/5 transition-all duration-300">
                            Book a Session
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─── SVG Camera Lens ─── */
function LensSVG() {
    return (
        <svg width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Outer barrel */}
            <circle cx="250" cy="250" r="230" stroke="rgba(212,160,80,0.3)" strokeWidth="4" />
            <circle cx="250" cy="250" r="220" stroke="rgba(212,160,80,0.15)" strokeWidth="1" />

            {/* Focus ring markers */}
            {Array.from({ length: 24 }, (_, i) => {
                const angle = (i / 24) * Math.PI * 2;
                const r1 = 222;
                const r2 = i % 3 === 0 ? 235 : 228;
                return (
                    <line
                        key={i}
                        x1={250 + Math.cos(angle) * r1}
                        y1={250 + Math.sin(angle) * r1}
                        x2={250 + Math.cos(angle) * r2}
                        y2={250 + Math.sin(angle) * r2}
                        stroke="rgba(212,160,80,0.25)"
                        strokeWidth="1.5"
                    />
                );
            })}

            {/* Middle ring */}
            <circle cx="250" cy="250" r="180" stroke="rgba(139,0,32,0.3)" strokeWidth="2" fill="rgba(10,0,5,0.3)" />
            <circle cx="250" cy="250" r="160" stroke="rgba(212,160,80,0.2)" strokeWidth="1" />

            {/* Lens coating reflections */}
            <circle cx="250" cy="250" r="150" fill="url(#lensCoating)" opacity="0.4" />

            {/* Aperture blades */}
            {Array.from({ length: 7 }, (_, i) => {
                const angle = (i / 7) * Math.PI * 2;
                const nextAngle = ((i + 0.6) / 7) * Math.PI * 2;
                const r = 100;
                const innerR = 30;
                const x1 = 250 + Math.cos(angle) * innerR;
                const y1 = 250 + Math.sin(angle) * innerR;
                const x2 = 250 + Math.cos(angle) * r;
                const y2 = 250 + Math.sin(angle) * r;
                const x3 = 250 + Math.cos(nextAngle) * r;
                const y3 = 250 + Math.sin(nextAngle) * r;
                const x4 = 250 + Math.cos(nextAngle) * innerR;
                const y4 = 250 + Math.sin(nextAngle) * innerR;
                return (
                    <polygon
                        key={i}
                        points={`${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}`}
                        fill="rgba(26,10,10,0.7)"
                        stroke="rgba(212,160,80,0.15)"
                        strokeWidth="0.5"
                    />
                );
            })}

            {/* Center glass element */}
            <circle cx="250" cy="250" r="45" fill="url(#centerGlass)" opacity="0.6" />

            <defs>
                <radialGradient id="lensCoating" cx="35%" cy="30%">
                    <stop offset="0%" stopColor="#6644aa" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#2244aa" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="transparent" />
                </radialGradient>
                <radialGradient id="centerGlass" cx="40%" cy="35%">
                    <stop offset="0%" stopColor="#d4a050" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#1a0a0a" stopOpacity="0.8" />
                </radialGradient>
            </defs>
        </svg>
    );
}
