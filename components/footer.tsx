import Link from "next/link";
import { Camera, Heart, Mail, Phone, MapPin, Film, Star } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#050003] text-white relative">
            {/* Gold ornamental divider */}
            <div className="gold-separator" />

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                                <Camera className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <span className="text-lg font-bold font-heading">
                                    Rig
                                </span>
                                <span className="block text-[10px] text-white/40 -mt-1 tracking-[0.2em] uppercase">
                                    Photography
                                </span>
                            </div>
                        </div>
                        <p className="text-white/40 text-sm leading-relaxed">
                            Award-winning wedding photography studio in Kolkata.
                            Capturing timeless love stories with artistry and emotion since 2010.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-5">
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { label: "Home", href: "/" },
                                { label: "Gallery", href: "/gallery" },
                                { label: "Pricing", href: "/pricing" },
                                { label: "About", href: "/about" },
                                { label: "Contact", href: "/contact" },
                                { label: "Reviews", href: "/reviews" },
                            ].map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="text-white/40 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block duration-200"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-5">
                            Services
                        </h4>
                        <ul className="space-y-3">
                            {[
                                "Wedding Photography",
                                "Pre-Wedding Shoots",
                                "Candid Photography",
                                "Maternity & Baby",
                                "Rice Ceremony",
                                "Corporate & Interior",
                                "Wedding Films",
                            ].map((item) => (
                                <li key={item}>
                                    <Link href="/services" className="text-white/40 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block duration-200">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Explore */}
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-5">
                            Explore
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { label: "Films", href: "/films", icon: Film },
                                { label: "Reviews", href: "/reviews", icon: Star },
                            ].map((item) => (
                                <li key={item.label}>
                                    <Link href={item.href} className="text-white/40 hover:text-white text-sm transition-colors flex items-center gap-2 hover:translate-x-1 duration-200">
                                        <item.icon className="w-3.5 h-3.5 text-amber-400" />
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-5">
                            Get in Touch
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Phone className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                                <span className="text-white/40 text-sm">+91 98765 43210</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                                <span className="text-white/40 text-sm">
                                    hello@rigphotography.com
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                                <span className="text-white/40 text-sm">
                                    Salt Lake, Sector V,<br />
                                    Kolkata 700091,<br />
                                    West Bengal, India
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="gold-separator" />
            <div className="bg-[#030002]">
                <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-white/20 text-sm">
                        © {new Date().getFullYear()} Rig Photography. All rights
                        reserved.
                    </p>
                    <p className="text-white/20 text-sm flex items-center gap-1.5">
                        Made with <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> for beautiful moments
                    </p>
                </div>
            </div>
        </footer>
    );
}
