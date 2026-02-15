import Link from "next/link";
import { Check, Crown, Star, Sparkles, ArrowRight, Camera, IndianRupee } from "lucide-react";

// In production, these come from the `packages` table
const packages = [
    {
        id: "1",
        title: "Silver",
        price: 15000,
        category: "Freelancer",
        description: "Perfect for intimate ceremonies and small gatherings",
        features: [
            "4 Hours Coverage",
            "1 Photographer",
            "100+ Edited Photos",
            "Online Gallery",
            "Basic Retouching",
        ],
        popular: false,
    },
    {
        id: "2",
        title: "Gold",
        price: 30000,
        category: "Freelancer",
        description: "Comprehensive coverage for your complete wedding day",
        features: [
            "8 Hours Coverage",
            "1 Photographer",
            "300+ Edited Photos",
            "Online Gallery",
            "Advanced Retouching",
            "Pre-Wedding Consultation",
            "Photo Album (30 pages)",
        ],
        popular: true,
    },
    {
        id: "3",
        title: "Platinum",
        price: 50000,
        category: "Team",
        description: "Premium multi-photographer team coverage",
        features: [
            "Full Day Coverage",
            "2 Photographers",
            "500+ Edited Photos",
            "Online Gallery",
            "Cinematic Retouching",
            "Pre-Wedding Shoot",
            "Premium Album (50 pages)",
            "Drone Coverage",
            "Same-Day Edit Video",
        ],
        popular: false,
    },
    {
        id: "4",
        title: "Diamond",
        price: 75000,
        category: "Team",
        description: "The ultimate luxury experience for your special day",
        features: [
            "Multi-Day Coverage",
            "3 Photographers + Videographer",
            "800+ Edited Photos",
            "Online Gallery",
            "Cinematic Retouching",
            "Pre-Wedding Shoot",
            "Luxury Album (80 pages)",
            "Drone Coverage",
            "Cinematic Video",
            "Canvas Print (24x36)",
            "Priority Editing",
        ],
        popular: false,
    },
];

export default function PricingPage() {
    const freelancerPkgs = packages.filter((p) => p.category === "Freelancer");
    const teamPkgs = packages.filter((p) => p.category === "Team");

    return (
        <div className="bg-[#0a0005] min-h-screen">
            {/* ═══ Hero ═══ */}
            <section className="pt-32 pb-20 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 via-transparent to-transparent" />
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <span className="text-amber-400 font-mono text-xs tracking-[0.3em] uppercase mb-4 block">
                        ◆ Investment ◆
                    </span>
                    <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6">
                        Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">Pricing</span>
                    </h1>
                    <p className="text-lg text-white/40 max-w-2xl mx-auto">
                        Choose the perfect package for your celebration. Every package is fully customizable — reach out and we&apos;ll tailor it to your needs.
                    </p>
                </div>
            </section>

            {/* ═══ Freelancer Packages ═══ */}
            <section className="pb-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-amber-400 font-mono text-xs tracking-[0.2em] uppercase mb-3 block">Solo Coverage</span>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
                            Freelancer <span className="text-amber-400">Packages</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {freelancerPkgs.map((pkg) => (
                            <PricingCard key={pkg.id} pkg={pkg} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ Team Packages ═══ */}
            <section className="py-20 px-6 bg-gradient-to-b from-[#0a0005] via-[#1a1a1a]/50 to-[#0a0005]">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-amber-400 font-mono text-xs tracking-[0.2em] uppercase mb-3 block">Full Team</span>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
                            Team <span className="text-amber-400">Packages</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {teamPkgs.map((pkg) => (
                            <PricingCard key={pkg.id} pkg={pkg} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ Custom Package CTA ═══ */}
            <section className="py-24 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <Crown className="w-10 h-10 text-amber-400 mx-auto mb-6" />
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                        Need a Custom <span className="text-amber-400">Package</span>?
                    </h2>
                    <p className="text-white/40 mb-10 max-w-lg mx-auto">
                        Every wedding is unique. Let us create a bespoke package tailored exactly to your celebration.
                    </p>
                    <Link href="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold px-10 py-4 rounded-xl hover:from-amber-500 hover:to-amber-400 transition-all shadow-lg shadow-amber-900/30">
                        Contact Us <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </div>
    );
}

function PricingCard({ pkg }: { pkg: (typeof packages)[0] }) {
    return (
        <div className={`relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 ${pkg.popular
                ? "bg-gradient-to-b from-amber-900/20 to-white/5 border-2 border-amber-400/40 shadow-lg shadow-amber-900/20"
                : "bg-white/5 border border-white/10 hover:border-amber-400/30"
            }`}>
            {pkg.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-600 to-amber-500 text-white text-xs font-mono tracking-wider px-4 py-1.5 rounded-bl-xl">
                    <Sparkles className="w-3 h-3 inline mr-1" /> POPULAR
                </div>
            )}

            <div className="p-8">
                <h3 className="text-xl font-heading font-bold text-white mb-2">{pkg.title}</h3>
                <p className="text-sm text-white/40 mb-6">{pkg.description}</p>

                <div className="flex items-baseline gap-1 mb-8">
                    <IndianRupee className="w-5 h-5 text-amber-400" />
                    <span className="text-4xl font-heading font-bold text-white">
                        {pkg.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-white/30 text-sm ml-1">onwards</span>
                </div>

                <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-white/50">
                            <Check className="w-4 h-4 text-amber-400 shrink-0" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>

                <Link
                    href="/contact"
                    className={`w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all ${pkg.popular
                            ? "bg-gradient-to-r from-amber-600 to-amber-500 text-white hover:from-amber-500 hover:to-amber-400 shadow-lg shadow-amber-900/30"
                            : "bg-white/10 text-white hover:bg-white/15 border border-white/10"
                        }`}
                >
                    Choose {pkg.title} <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
