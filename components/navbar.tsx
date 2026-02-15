"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
    Menu,
    X,
    Camera,
    ChevronDown,
    Heart,
    Baby,
    Building2,
    Film,
    Flower2,
    Users,
    Image as ImageIcon,
} from "lucide-react";

type NavLink = { href: string; label: string } | { label: string; dropdown: { href: string; label: string; icon: React.ComponentType<{ className?: string }> }[] };

const navLinks: NavLink[] = [
    { href: "/", label: "Home" },
    {
        label: "Services",
        dropdown: [
            { href: "/services", label: "All Services", icon: Camera },
            { href: "/services#wedding", label: "Wedding Photography", icon: Heart },
            { href: "/services#pre-wedding", label: "Pre-Wedding Shoots", icon: Users },
            { href: "/services#maternity-baby", label: "Maternity & Baby", icon: Baby },
            { href: "/services#rice-ceremony", label: "Rice Ceremony", icon: Flower2 },
            { href: "/services#corporate", label: "Corporate & Interior", icon: Building2 },
            { href: "/films", label: "Wedding Films", icon: Film },
        ],
    },
    {
        label: "Portfolio",
        dropdown: [
            { href: "/gallery", label: "Photo Gallery", icon: ImageIcon },
            { href: "/films", label: "Wedding Films", icon: Film },
        ],
    },
    { href: "/reviews", label: "Reviews" },
    { href: "/about", label: "About" },
    { href: "/pricing", label: "Pricing" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
        setMobileExpanded(null);
    }, [pathname]);

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? "bg-[#0a0005]/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20 py-3"
                : "bg-transparent py-5"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-900/30 group-hover:shadow-amber-800/50 group-hover:scale-105 transition-all duration-300">
                        <Camera className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <span className="text-lg font-bold font-heading text-white group-hover:text-amber-400 transition-colors duration-300">
                            Rig
                        </span>
                        <span className="block text-[10px] text-white/40 -mt-1 tracking-[0.2em] uppercase">
                            Photography
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-7">
                    {navLinks.map((link) =>
                        "dropdown" in link ? (
                            <div key={link.label} className="relative group">
                                <button className={`text-sm font-medium transition-colors flex items-center gap-1 py-2 ${link.dropdown.some((d) => isActive(d.href))
                                        ? "text-amber-400"
                                        : "text-white/60 hover:text-white"
                                    }`}>
                                    {link.label}
                                    <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-300" />
                                </button>
                                {/* Dropdown */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                                    <div className="bg-[#1a1a1a]/95 backdrop-blur-xl border border-white/10 rounded-xl p-2 min-w-[220px] shadow-xl shadow-black/40">
                                        {link.dropdown.map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all ${isActive(item.href)
                                                        ? "text-amber-400 bg-amber-400/5"
                                                        : "text-white/50 hover:text-white hover:bg-white/5"
                                                    }`}
                                            >
                                                <item.icon className="w-4 h-4 text-amber-400" />
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link
                                key={link.href}
                                href={(link as { href: string; label: string }).href}
                                aria-current={isActive((link as { href: string; label: string }).href) ? "page" : undefined}
                                className={`text-sm font-medium transition-colors relative py-2 ${isActive((link as { href: string; label: string }).href)
                                        ? "text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-amber-400"
                                        : "text-white/60 hover:text-white after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-amber-400 after:transition-all after:duration-300 hover:after:w-full"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        )
                    )}
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold px-6 py-2.5 rounded-xl hover:from-amber-500 hover:to-amber-400 hover:scale-105 hover:shadow-xl hover:shadow-amber-900/40 transition-all duration-300 shadow-lg shadow-amber-900/30 text-sm"
                    >
                        Book Now
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={isOpen}
                >
                    {isOpen ? (
                        <X className="w-6 h-6 text-white" />
                    ) : (
                        <Menu className="w-6 h-6 text-white" />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden overflow-hidden transition-all duration-500 ${isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="bg-[#1a1a1a]/95 backdrop-blur-xl border border-white/10 mx-4 mt-3 rounded-2xl p-6 space-y-1">
                    {navLinks.map((link, index) =>
                        "dropdown" in link ? (
                            <div
                                key={link.label}
                                style={{ animationDelay: `${index * 50}ms` }}
                                className={isOpen ? "animate-fade-in-up" : ""}
                            >
                                <button
                                    className="w-full flex items-center justify-between py-3 px-4 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-all font-medium"
                                    onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                                >
                                    {link.label}
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileExpanded === link.label ? "rotate-180" : ""}`} />
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ${mobileExpanded === link.label ? "max-h-96" : "max-h-0"}`}>
                                    <div className="pl-4 space-y-1 pb-2">
                                        {link.dropdown.map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className={`flex items-center gap-3 py-2 px-4 rounded-lg text-sm transition-all ${isActive(item.href)
                                                        ? "text-amber-400 bg-amber-400/5"
                                                        : "text-white/40 hover:bg-white/5 hover:text-white"
                                                    }`}
                                                onClick={() => setIsOpen(false)}
                                            >
                                                <item.icon className="w-4 h-4 text-amber-400" />
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link
                                key={link.href}
                                href={(link as { href: string; label: string }).href}
                                className={`block py-3 px-4 rounded-xl transition-all font-medium ${isOpen ? "animate-fade-in-up" : ""} ${isActive((link as { href: string; label: string }).href)
                                        ? "text-amber-400 bg-amber-400/5"
                                        : "text-white/60 hover:bg-white/5 hover:text-white"
                                    }`}
                                style={{ animationDelay: `${index * 50}ms` }}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </Link>
                        )
                    )}
                    <div className="pt-3">
                        <Link
                            href="/contact"
                            className="block w-full text-center bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold py-3 rounded-xl hover:from-amber-500 hover:to-amber-400 transition-all shadow-lg shadow-amber-900/30"
                            onClick={() => setIsOpen(false)}
                        >
                            Book Now
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
