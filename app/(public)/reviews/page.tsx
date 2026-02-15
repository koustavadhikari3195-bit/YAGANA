import Link from "next/link";
import {
    Star,
    Heart,
    Award,
    ArrowRight,
    Quote,
    Camera,
    Trophy,
    Users,
    Shield,
    ThumbsUp,
} from "lucide-react";

const reviews = [
    {
        name: "Priya & Rahul",
        text: "Every photo tells our love story with such artistic vision! The team was incredibly professional and made us feel so comfortable. The album exceeded all our expectations.",
        rating: 5,
        highlight: "Rig Biswas",
        event: "Bengali Wedding",
    },
    {
        name: "Ananya & Arjun",
        text: "Every moment was captured perfectly. Outstanding professionalism, creative compositions, and a final product that brought tears of joy to our families.",
        rating: 5,
        highlight: "Professionalism",
        event: "Marwari Wedding",
    },
    {
        name: "Sneha & Vikram",
        text: "The candid shots are our favorites — pure magic in every frame. They captured emotions we didn't even know were happening. Truly exceptional!",
        rating: 5,
        highlight: "Candid Magic",
        event: "Pre-Wedding Shoot",
    },
    {
        name: "Moumita & Sourav",
        text: "Premium quality at a budget-friendly price. True value for money. The team went above and beyond to capture every ritual and every smile.",
        rating: 5,
        highlight: "Value for Money",
        event: "Bengali Wedding",
    },
    {
        name: "Tanisha & Rohan",
        text: "Our destination pre-wedding shoot in Darjeeling was an absolute dream! The team handled logistics perfectly and captured the most stunning shots against the tea gardens and mountains.",
        rating: 5,
        highlight: "Destination Shoots",
        event: "Destination Pre-Wedding",
    },
    {
        name: "Riya & Aman",
        text: "The cinematic wedding film they created for us is better than any Bollywood movie. Our families can't stop watching it! The editing, music selection, and pacing — perfect.",
        rating: 5,
        highlight: "Cinematic Films",
        event: "Wedding Film",
    },
];

const ratingStats = [
    { label: "5 Stars", count: 487, percent: 92 },
    { label: "4 Stars", count: 36, percent: 7 },
    { label: "3 Stars", count: 5, percent: 1 },
];

const trustBadges = [
    { icon: Trophy, label: "500+ Weddings" },
    { icon: Star, label: "4.9 Rating" },
    { icon: Shield, label: "Verified Studio" },
    { icon: ThumbsUp, label: "98% Recommend" },
];

export default function ReviewsPage() {
    return (
        <div className="bg-[#0a0005] min-h-screen">
            {/* ═══ Hero ═══ */}
            <section className="pt-32 pb-20 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 via-transparent to-transparent" />
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <span className="text-amber-400 font-mono text-xs tracking-[0.3em] uppercase mb-4 block">
                        ◆ Client Love ◆
                    </span>
                    <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6">
                        What Couples{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
                            Say
                        </span>
                    </h1>
                    <p className="text-lg text-white/40 max-w-2xl mx-auto">
                        Real stories from real couples. Every review is a testament to our passion for capturing love.
                    </p>
                </div>
            </section>

            {/* ═══ Trust Badges ═══ */}
            <section className="pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {trustBadges.map((badge, i) => (
                            <div key={i} className="text-center bg-white/5 border border-white/10 rounded-xl p-5 hover:border-amber-400/30 transition-all duration-500">
                                <badge.icon className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                                <span className="text-sm text-white/60 font-medium">{badge.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ Rating Breakdown ═══ */}
            <section className="pb-20 px-6">
                <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8">
                    <div className="flex items-center gap-6 mb-6">
                        <div className="text-center">
                            <span className="block text-5xl font-heading font-bold text-white">4.9</span>
                            <div className="flex gap-1 mt-1 justify-center">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
                                ))}
                            </div>
                            <span className="text-xs text-white/30 mt-1 block">528 reviews</span>
                        </div>
                        <div className="flex-1 space-y-2">
                            {ratingStats.map((stat, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <span className="text-xs text-white/40 w-14 shrink-0">{stat.label}</span>
                                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                                            style={{ width: `${stat.percent}%` }}
                                        />
                                    </div>
                                    <span className="text-xs text-white/30 w-8 text-right">{stat.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Reviews Grid ═══ */}
            <section className="pb-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="text-amber-400 font-mono text-xs tracking-[0.2em] uppercase mb-3 block">
                            Testimonials
                        </span>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white">
                            Love <span className="text-amber-400">Letters</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reviews.map((review, i) => (
                            <div
                                key={i}
                                className="bg-white/5 border border-white/10 rounded-2xl p-7 relative hover:border-amber-400/30 transition-all duration-500 group"
                            >
                                <Quote className="w-8 h-8 text-amber-400/10 absolute top-6 right-6" />

                                {/* Stars */}
                                <div className="flex gap-1 mb-4">
                                    {Array.from({ length: review.rating }).map((_, j) => (
                                        <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                    ))}
                                </div>

                                {/* Review text */}
                                <p className="text-white/50 text-sm leading-relaxed mb-6">
                                    &ldquo;{review.text}&rdquo;
                                </p>

                                {/* Author */}
                                <div className="border-t border-white/10 pt-4">
                                    <span className="text-white font-heading font-bold text-sm block">{review.name}</span>
                                    <div className="flex items-center justify-between mt-1">
                                        <span className="text-xs text-white/30">{review.event}</span>
                                        <span className="text-[10px] text-amber-400/60 font-mono uppercase tracking-wider bg-amber-400/5 px-2 py-0.5 rounded-full">
                                            {review.highlight}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ CTA ═══ */}
            <section className="py-24 px-6 bg-gradient-to-t from-[#1a1a1a] to-[#0a0005]">
                <div className="max-w-3xl mx-auto text-center">
                    <Heart className="w-10 h-10 text-amber-400 mx-auto mb-6" />
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
                        Join Our <span className="text-amber-400">Happy Couples</span>
                    </h2>
                    <p className="text-white/40 mb-10 max-w-lg mx-auto">
                        Let us capture your love story and add your review to our wall of love.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold px-10 py-4 rounded-xl hover:from-amber-500 hover:to-amber-400 transition-all shadow-lg shadow-amber-900/30">
                            Book a Session <ArrowRight className="w-5 h-5" />
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
