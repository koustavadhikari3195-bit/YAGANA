"use client";

import { useState, useEffect } from "react";

/* Images to preload before the preloader dismisses */
const PRELOAD_ASSETS = [
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=1080&fit=crop&q=80", // ScrollCanvas reveal
    "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1920&h=1080&fit=crop&q=60", // VideoBackground poster
];

/**
 * Preloader — "Developing..." darkroom-style loader.
 * Preloads critical images + simulates film developing with percentage.
 * Fades out after real + simulated loading completes.
 */
export default function Preloader() {
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(true);
    const [phase, setPhase] = useState<"developing" | "fixing" | "done">("developing");
    const [assetsReady, setAssetsReady] = useState(false);

    /* ─── Preload images ─── */
    useEffect(() => {
        let loaded = 0;
        const total = PRELOAD_ASSETS.length;

        if (total === 0) {
            setAssetsReady(true);
            return;
        }

        PRELOAD_ASSETS.forEach((src) => {
            const img = new Image();
            img.onload = img.onerror = () => {
                loaded++;
                if (loaded >= total) setAssetsReady(true);
            };
            img.src = src;
        });

        // Timeout fallback — don't wait forever on slow networks
        const timeout = setTimeout(() => setAssetsReady(true), 5000);
        return () => clearTimeout(timeout);
    }, []);

    /* ─── Simulated progress ─── */
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                // Don't finish simulated progress until assets are loaded
                const cap = assetsReady ? 100 : 85;

                if (prev >= 100) {
                    clearInterval(interval);
                    setPhase("done");
                    setTimeout(() => setVisible(false), 600);
                    return 100;
                }
                if (prev >= 70) setPhase("fixing");

                const increment = prev < 30 ? 4 : prev < 80 ? 1.5 : 3;
                return Math.min(prev + increment, cap);
            });
        }, 50);

        return () => clearInterval(interval);
    }, [assetsReady]);

    if (!visible) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-all duration-700 ${phase === "done" ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
                }`}
            style={{ backgroundColor: "#0a0005" }}
        >
            {/* Safelight glow */}
            <div className="absolute inset-0 bg-gradient-radial from-red-900/10 via-transparent to-transparent" />

            {/* Film reel icon */}
            <div className="relative mb-8">
                <svg
                    width="80" height="80" viewBox="0 0 80 80" fill="none"
                    className="animate-spin"
                    style={{ animationDuration: "3s" }}
                >
                    <circle cx="40" cy="40" r="36" stroke="#fbbf2440" strokeWidth="2" fill="none" />
                    <circle cx="40" cy="40" r="28" stroke="#fbbf2420" strokeWidth="1" fill="none" />
                    {[0, 60, 120, 180, 240, 300].map((deg) => (
                        <circle
                            key={deg}
                            cx={40 + Math.cos((deg * Math.PI) / 180) * 32}
                            cy={40 + Math.sin((deg * Math.PI) / 180) * 32}
                            r="4"
                            fill="transparent"
                            stroke="#fbbf2430"
                            strokeWidth="1.5"
                        />
                    ))}
                    <circle cx="40" cy="40" r="8" stroke="#fbbf2450" strokeWidth="2" fill="#0a0005" />
                </svg>
            </div>

            {/* Text */}
            <div className="text-center">
                <p className="font-mono text-amber-400/80 text-sm tracking-[0.3em] uppercase mb-3">
                    {phase === "developing" ? "Developing..." : phase === "fixing" ? "Fixing..." : "Ready"}
                </p>

                {/* Progress bar */}
                <div className="w-48 h-[3px] bg-white/10 rounded-full overflow-hidden mx-auto mb-3 relative">
                    <div
                        className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-100 relative"
                        style={{ width: `${progress}%` }}
                    >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-amber-400 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                    </div>
                </div>

                <p className="font-mono text-amber-400/40 text-xs tabular-nums">
                    {Math.round(progress)}%
                </p>
            </div>

            {/* Brand */}
            <p className="absolute bottom-8 font-mono text-white/15 text-xs tracking-[0.5em] uppercase">
                Rig Photography
            </p>
        </div>
    );
}
