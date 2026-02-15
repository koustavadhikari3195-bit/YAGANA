"use client";

import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { Camera, X } from "lucide-react";
import { galleryImages } from "@/lib/site-data";

const ScrollCanvas = dynamic(() => import("@/components/scroll-canvas"), { ssr: false });

const categories = ["All", "Portrait", "Bride", "Groom", "Events", "Pre-Wedding", "Candid"] as const;

export default function GalleryPage() {
    const [activeCategory, setActiveCategory] = useState<string>("All");
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const filteredImages =
        activeCategory === "All"
            ? galleryImages
            : galleryImages.filter((img) => img.category === activeCategory);

    // Keyboard navigation for lightbox
    useEffect(() => {
        if (lightboxIndex === null) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setLightboxIndex(null);
            if (e.key === "ArrowRight") setLightboxIndex((prev) => prev !== null ? Math.min(prev + 1, filteredImages.length - 1) : null);
            if (e.key === "ArrowLeft") setLightboxIndex((prev) => prev !== null ? Math.max(prev - 1, 0) : null);
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [lightboxIndex, filteredImages.length]);

    return (
        <div className="bg-[#0a0005] min-h-screen">
            {/* ═══ Aperture Reveal Hero ═══ */}
            <Suspense fallback={
                <section className="h-[300vh]">
                    <div className="sticky top-0 h-screen bg-[#0a0005] flex items-center justify-center">
                        <div className="text-center">
                            <Camera className="w-10 h-10 text-amber-400 mx-auto mb-4 animate-pulse" />
                            <p className="text-white/40 font-mono text-sm">Loading aperture...</p>
                        </div>
                    </div>
                </section>
            }>
                <ScrollCanvas />
            </Suspense>

            {/* ═══ Category Filters ═══ */}
            <section className="sticky top-16 z-30 bg-[#0a0005]/95 backdrop-blur-lg border-b border-white/10 py-4">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-3 flex-wrap">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat
                                ? "bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-900/30"
                                : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/10"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* ═══ Gallery Grid ═══ */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-14">
                        <span className="text-amber-400 font-mono text-xs tracking-[0.2em] uppercase mb-3 block">
                            Portfolio
                        </span>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-3">
                            Our <span className="text-amber-400">Collection</span>
                        </h2>
                        <p className="text-white/40 max-w-xl mx-auto">
                            Every frame tells a story of love, tradition, and celebration
                        </p>
                    </div>

                    {/* Masonry Grid */}
                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                        {filteredImages.map((img, i) => (
                            <div
                                key={img.id}
                                className="group relative overflow-hidden rounded-xl cursor-pointer break-inside-avoid border border-white/10 hover:border-amber-400/30 transition-all duration-500"
                                style={{ animationDelay: `${i * 0.05}s` }}
                                onClick={() => setLightboxIndex(i)}
                            >
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                    <span className="inline-block bg-amber-500/80 text-white text-[10px] font-mono tracking-wider px-3 py-1 rounded-full mb-2 uppercase">
                                        {img.category}
                                    </span>
                                    <p className="text-white text-sm">{img.alt}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredImages.length === 0 && (
                        <div className="text-center py-20">
                            <Camera className="w-16 h-16 text-white/15 mx-auto mb-4" />
                            <p className="text-xl text-white/30">
                                No photos in this category yet.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* ═══ Lightbox ═══ */}
            {lightboxIndex !== null && filteredImages[lightboxIndex] && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
                    onClick={() => setLightboxIndex(null)}
                >
                    <button
                        className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
                        onClick={() => setLightboxIndex(null)}
                        aria-label="Close lightbox"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>

                    {/* Previous */}
                    {lightboxIndex > 0 && (
                        <button
                            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
                            onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1); }}
                            aria-label="Previous image"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        </button>
                    )}

                    {/* Next */}
                    {lightboxIndex < filteredImages.length - 1 && (
                        <button
                            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
                            onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1); }}
                            aria-label="Next image"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </button>
                    )}

                    <img
                        src={filteredImages[lightboxIndex].src.replace("w=800&h=600", "w=1400&h=1000")}
                        alt={filteredImages[lightboxIndex].alt}
                        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />

                    {/* Counter */}
                    <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 font-mono text-xs">
                        {lightboxIndex + 1} / {filteredImages.length}
                    </span>
                </div>
            )}
        </div>
    );
}
