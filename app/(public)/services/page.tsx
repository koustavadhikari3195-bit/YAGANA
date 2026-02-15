"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
    Camera,
    Heart,
    Star,
    Users,
    Baby,
    Building2,
    Film,
    Flower2,
    ArrowRight,
    Sparkles,
    MapPin,
    Award,
    Check,
} from "lucide-react";

const MorphTransition = dynamic(() => import("@/components/morph-transition"), { ssr: false });

const allServices = [
    {
        icon: Camera,
        title: "Wedding Photography",
        slug: "wedding",
        desc: "Complete ceremony & reception coverage with cinematic storytelling. Multiple photographers, candid moments, and traditional portraits — all woven into a visual narrative of your day.",
        highlights: ["Full-day coverage", "2–3 photographers", "500+ edited photos", "Premium album"],
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop",
    },
    {
        icon: Heart,
        title: "Candid Photography",
        slug: "candid",
        desc: "Natural, spontaneous shots that capture genuine emotions and unscripted moments. Our candid style brings out the real joy, laughter, and tears of your celebration.",
        highlights: ["Unposed shots", "Emotional storytelling", "Printed collection", "Online gallery"],
        image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=400&fit=crop",
    },
    {
        icon: Users,
        title: "Pre-Wedding Shoots",
        slug: "pre-wedding",
        desc: "Romantic sessions at stunning locations — from tea gardens to mountain trails. Indoor studio sessions and outdoor cinematic shoots that tell your love story.",
        highlights: ["Multiple locations", "Outfit changes", "Creative concepts", "Cinematic edits"],
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop",
    },
    {
        icon: Baby,
        title: "Maternity & Baby",
        slug: "maternity",
        desc: "Tender portraits celebrating new beginnings — from maternity glows to newborn sessions and baby milestones captured with warmth and love.",
        highlights: ["Maternity glow shots", "Newborn sessions", "Baby milestones", "Family portraits"],
        image: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=600&h=400&fit=crop",
    },
    {
        icon: Flower2,
        title: "Rice Ceremony (Annaprashana)",
        slug: "rice-ceremony",
        desc: "Beautiful coverage of your baby's Annaprashana and other traditional Bengali ceremonies — vibrant colors, authentic traditions, and cherished family moments.",
        highlights: ["Ceremony coverage", "Family portraits", "Traditional decor shots", "Candid moments"],
        image: "https://images.unsplash.com/photo-1595407753234-0882f1e77954?w=600&h=400&fit=crop",
    },
    {
        icon: Building2,
        title: "Corporate & Interior",
        slug: "corporate",
        desc: "Professional event and architectural photography for businesses. From corporate events to interior shoots, product photography to team portraits.",
        highlights: ["Event coverage", "Interior shoots", "Product photography", "Team portraits"],
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&h=400&fit=crop",
    },
    {
        icon: Film,
        title: "Wedding Films",
        slug: "films",
        desc: "Cinematic wedding videos that use creative cuts and callouts to collage your most memorable moments. Choose from vintage Bollywood looks with grainy edits to sleek modern cinematic storytelling.",
        highlights: ["Cinematic editing", "Highlight reels", "Full ceremony", "Drone footage"],
        image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&h=400&fit=crop",
    },
];

export default function ServicesPage() {
    return (
        <div className="bg-[#0a0005] min-h-screen">
            {/* ═══ Morph Transition Hero ═══ */}
            <Suspense fallback={
                <section className="h-[300vh]">
                    <div className="sticky top-0 h-screen bg-[#0a0005] flex items-center justify-center">
                        <Camera className="w-10 h-10 text-amber-400 animate-pulse" />
                    </div>
                </section>
            }>
                <MorphTransition />
            </Suspense>

            {/* ═══ All Services Section ═══ */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-amber-400 font-mono text-xs tracking-[0.2em] uppercase mb-3 block">
                            What We Offer
                        </span>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
                            Our <span className="text-amber-400">Services</span>
                        </h2>
                        <p className="text-white/40 max-w-xl mx-auto">
                            From intimate ceremonies to grand celebrations — we capture every story with artistry
                        </p>
                    </div>

                    <div className="space-y-8">
                        {allServices.map((service, i) => (
                            <div
                                key={i}
                                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover-glow transition-all duration-500 ${i % 2 === 1 ? "lg:direction-rtl" : ""
                                    }`}
                            >
                                {/* Image */}
                                <div className={`overflow-hidden aspect-[3/2] ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Content */}
                                <div className={`p-8 lg:p-10 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                                            <service.icon className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="text-xl font-heading font-bold text-white">{service.title}</h3>
                                    </div>
                                    <p className="text-white/40 text-sm leading-relaxed mb-6">{service.desc}</p>
                                    <div className="grid grid-cols-2 gap-2 mb-6">
                                        {service.highlights.map((h, j) => (
                                            <div key={j} className="flex items-center gap-2 text-sm text-white/50">
                                                <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                                <span>{h}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Link
                                        href="/contact"
                                        className="btn-dark-ghost"
                                    >
                                        Book This Service <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ Stats ═══ */}
            <section className="py-20 px-6 bg-gradient-to-b from-[#0a0005] via-[#1a1a1a] to-[#0a0005]">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { icon: Camera, value: "500+", label: "Weddings" },
                            { icon: Heart, value: "1200+", label: "Happy Couples" },
                            { icon: Award, value: "15+", label: "Years" },
                            { icon: Star, value: "4.9", label: "Average Rating" },
                        ].map((stat, i) => (
                            <div key={i}>
                                <stat.icon className="w-6 h-6 text-amber-400 mx-auto mb-3" />
                                <span className="block text-3xl font-heading font-bold text-white">{stat.value}</span>
                                <span className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ CTA ═══ */}
            <section className="py-24 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <span className="text-amber-400 font-mono text-xs tracking-[0.2em] uppercase mb-4 block">
                        Ready?
                    </span>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
                        Let&apos;s Capture Your <span className="text-amber-400">Story</span>
                    </h2>
                    <p className="text-white/40 mb-10 max-w-lg mx-auto">
                        Every moment is unique. Let us preserve yours in stunning frames.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/contact" className="btn-dark-primary px-10 py-4">
                            Get in Touch <ArrowRight className="w-5 h-5" />
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
