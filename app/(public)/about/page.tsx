import Link from "next/link";
import {
    Camera,
    Heart,
    Eye,
    Award,
    Users,
    Target,
    ArrowRight,
    MapPin,
    Star,
} from "lucide-react";

const values = [
    { icon: Eye, title: "Artistic Vision", desc: "We see beyond the moment — capturing the light, emotion, and story behind every frame." },
    { icon: Heart, title: "Passion-Driven", desc: "Photography isn't just our profession — it's our love language. Every shoot is personal." },
    { icon: Target, title: "Attention to Detail", desc: "From the vermillion in her hair to the tear-drop on his cheek — we miss nothing." },
    { icon: Users, title: "People First", desc: "Your comfort is our priority. Relaxed couples make the best photographs." },
];

const process = [
    { step: "01", title: "Connect", desc: "Share your vision — dates, venues, style preferences, and anything that makes your love story unique." },
    { step: "02", title: "Plan", desc: "We create a custom shot list, scout locations, and coordinate timelines so nothing is missed." },
    { step: "03", title: "Capture", desc: "On the day, we blend in with your celebration — capturing every candid moment and traditional ritual." },
    { step: "04", title: "Deliver", desc: "Preview gallery in 1-2 weeks. Complete edited collection with cinematic retouching in 4-6 weeks." },
];

export default function AboutPage() {
    return (
        <div className="bg-[#0a0005] min-h-screen">
            {/* ═══ Hero ═══ */}
            <section className="pt-32 pb-20 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 via-transparent to-transparent" />
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <span className="text-amber-400 font-mono text-xs tracking-[0.3em] uppercase mb-4 block">
                        ◆ Our Story ◆
                    </span>
                    <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6">
                        The Eyes Behind{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
                            the Lens
                        </span>
                    </h1>
                    <p className="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">
                        Rig Photography was born from a simple belief: every love story deserves to be told beautifully.
                        Based in Kolkata, we&apos;ve spent 15+ years turning fleeting moments into timeless art.
                    </p>
                </div>
            </section>

            {/* ═══ Story ═══ */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                        <div className="rounded-2xl overflow-hidden border border-white/10">
                            <img
                                src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=800&fit=crop"
                                alt="Photographer at work"
                                className="w-full h-auto object-cover"
                                loading="lazy"
                            />
                        </div>
                        {/* Floating stat card */}
                        <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-center shadow-xl shadow-amber-900/30">
                            <span className="block text-3xl font-heading font-bold text-white">15+</span>
                            <span className="text-xs text-white/80 uppercase tracking-wider">Years of Passion</span>
                        </div>
                    </div>

                    <div>
                        <span className="text-amber-400 font-mono text-xs tracking-[0.2em] uppercase mb-3 block">
                            Who We Are
                        </span>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                            From Kolkata, With <span className="text-amber-400">Love</span>
                        </h2>
                        <div className="space-y-4 text-white/40 leading-relaxed">
                            <p>
                                What started as a passion project with a borrowed camera has grown into one of
                                Kolkata&apos;s most trusted wedding photography studios. We&apos;ve documented 500+ weddings
                                across India — from intimate Bengali ceremonies to grand Marwari celebrations.
                            </p>
                            <p>
                                Our approach is simple: blend into your celebration, feel the emotion, and capture
                                the authentic moments that make your story unique. No forced poses, no rushed
                                timelines — just genuine artistry.
                            </p>
                            <p>
                                Today, with a team of talented photographers and videographers, we offer
                                end-to-end visual storytelling — from pre-wedding shoots to cinematic films.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 mt-6 text-amber-400">
                            <MapPin className="w-4 h-4" />
                            <span className="font-mono text-sm tracking-wider">Salt Lake, Kolkata</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Values ═══ */}
            <section className="py-24 px-6 bg-gradient-to-b from-[#0a0005] via-[#1a1a1a]/50 to-[#0a0005]">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-amber-400 font-mono text-xs tracking-[0.2em] uppercase mb-3 block">
                            What Drives Us
                        </span>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white">
                            Our <span className="text-amber-400">Values</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {values.map((v, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-amber-400/30 transition-all duration-500">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mb-5">
                                    <v.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-heading font-bold text-white mb-2">{v.title}</h3>
                                <p className="text-sm text-white/40 leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ Process ═══ */}
            <section className="py-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-amber-400 font-mono text-xs tracking-[0.2em] uppercase mb-3 block">
                            How It Works
                        </span>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white">
                            Our <span className="text-amber-400">Process</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {process.map((p, i) => (
                            <div key={i} className="text-center relative">
                                <span className="block text-5xl font-heading font-bold text-amber-400/15 mb-4">{p.step}</span>
                                <h3 className="text-lg font-heading font-bold text-white mb-2">{p.title}</h3>
                                <p className="text-sm text-white/40 leading-relaxed">{p.desc}</p>
                                {i < process.length - 1 && (
                                    <div className="hidden lg:block absolute top-8 -right-4 w-8 text-center">
                                        <ArrowRight className="w-4 h-4 text-white/15" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ CTA ═══ */}
            <section className="py-24 px-6 bg-gradient-to-t from-[#1a1a1a] to-[#0a0005]">
                <div className="max-w-3xl mx-auto text-center">
                    <Camera className="w-10 h-10 text-amber-400 mx-auto mb-6" />
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
                        Ready to Create <span className="text-amber-400">Memories</span>?
                    </h2>
                    <p className="text-white/40 mb-10 max-w-lg mx-auto">
                        Let&apos;s sit down over chai and plan something beautiful for your special day.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold px-10 py-4 rounded-xl hover:from-amber-500 hover:to-amber-400 transition-all shadow-lg shadow-amber-900/30">
                            Get in Touch <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link href="/gallery" className="inline-flex items-center gap-2 border border-white/20 text-white px-10 py-4 rounded-xl hover:bg-white/5 transition-all">
                            View Gallery
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
