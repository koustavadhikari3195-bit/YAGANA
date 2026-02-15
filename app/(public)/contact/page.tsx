"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Phone, Mail, MapPin, Clock, Send, CheckCircle, XCircle,
    MessageSquare, Camera, Heart,
} from "lucide-react";

const LOCATIONS = ["Kolkata", "Sikkim", "Darjeeling", "Manali", "Goa", "Rajasthan", "Destination (Other)"];
const EVENT_TYPES = ["Wedding", "Pre-Wedding", "Commercial", "Other"];
const BUDGETS = ["₹25,000 – ₹50,000", "₹50,000 – ₹1,00,000", "₹1,00,000 – ₹2,50,000", "₹2,50,000 – ₹5,00,000", "₹5,00,000+"];

const contactInfo = [
    { icon: Phone, label: "Phone", value: "+91 98765 43210", href: "tel:+919876543210" },
    { icon: Mail, label: "Email", value: "hello@rigphotography.com", href: "mailto:hello@rigphotography.com" },
    { icon: MapPin, label: "Studio", value: "Salt Lake, Sector V, Kolkata 700091", href: "https://maps.google.com?q=Salt+Lake+Sector+V+Kolkata" },
    { icon: Clock, label: "Hours", value: "Mon – Sat, 10 AM – 7 PM", href: undefined },
];

interface FormData {
    name: string;
    email: string;
    phone: string;
    event_date: string;
    event_type: string;
    location: string;
    budget: string;
    message: string;
}

export default function ContactPage() {
    const [form, setForm] = useState<FormData>({
        name: "", email: "", phone: "", event_date: "", event_type: "", location: "", budget: "", message: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errors, setErrors] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    /* ─── Submit to API ─── */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrors([]);

        try {
            const res = await fetch("/api/book", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();

            if (data.success) {
                setStatus("success");
                setForm({ name: "", email: "", phone: "", event_date: "", event_type: "", location: "", budget: "", message: "" });
            } else {
                setStatus("error");
                setErrors(data.errors || ["Something went wrong"]);
            }
        } catch {
            setStatus("error");
            setErrors(["Network error. Please try again."]);
        }
    };

    /* ─── WhatsApp fallback ─── */
    const openWhatsApp = () => {
        const msg = encodeURIComponent(
            `Hi! I'd like to book a session.\n\nName: ${form.name}\nDate: ${form.event_date}\nType: ${form.event_type}\nLocation: ${form.location}\nBudget: ${form.budget}\n\n${form.message}`
        );
        window.open(`https://wa.me/919876543210?text=${msg}`, "_blank");
    };

    const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 focus:outline-none transition-all duration-300";
    const selectClass = `${inputClass} appearance-none cursor-pointer`;

    return (
        <main className="min-h-screen bg-[#0a0005]">
            {/* Hero */}
            <section className="pt-32 pb-16 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <span className="text-amber-400 font-mono text-xs tracking-[0.3em] uppercase mb-4 block">
                            Get in Touch
                        </span>
                        <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">
                            Let&apos;s Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">Magic</span>
                        </h1>
                        <p className="text-white/40 max-w-xl mx-auto text-lg">
                            Ready to have your love story captured on film? Fill out the form and we&apos;ll confirm within 24 hours.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="pb-24 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
                    {/* Contact Info */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="space-y-5">
                            {contactInfo.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    target={item.href?.startsWith("http") ? "_blank" : undefined}
                                    rel={item.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                                    className="flex items-start gap-4 group hover:translate-x-1 transition-transform duration-300"
                                >
                                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-amber-400/30 transition-colors shrink-0">
                                        <item.icon className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <div>
                                        <span className="text-xs text-white/30 uppercase tracking-wider font-mono">{item.label}</span>
                                        <p className="text-white/70 text-sm">{item.value}</p>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Quick stats */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
                            <h3 className="text-white font-heading font-bold text-sm mb-4">Why Choose Us</h3>
                            <p className="text-white/40 text-sm flex items-center gap-3"><MapPin className="w-4 h-4 text-amber-400 shrink-0" /> Based in Kolkata — Available across India</p>
                            <p className="text-white/40 text-sm flex items-center gap-3"><Camera className="w-4 h-4 text-amber-400 shrink-0" /> 500+ weddings documented</p>
                            <p className="text-white/40 text-sm flex items-center gap-3"><Heart className="w-4 h-4 text-amber-400 shrink-0" /> Packages from ₹25,000</p>
                        </div>

                        {/* WhatsApp CTA */}
                        <button
                            onClick={openWhatsApp}
                            className="w-full flex items-center justify-center gap-3 bg-green-600/20 border border-green-500/30 text-green-400 font-semibold py-3.5 rounded-xl hover:bg-green-600/30 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300"
                        >
                            <MessageSquare className="w-5 h-5" />
                            Message on WhatsApp
                        </button>
                    </div>

                    {/* Booking Form */}
                    <div className="lg:col-span-3">
                        {status === "success" ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-green-500/10 border border-green-500/20 rounded-2xl p-10 text-center"
                            >
                                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                                <h3 className="text-xl font-heading font-bold text-white mb-2">Booking Received!</h3>
                                <p className="text-white/50 text-sm">We&apos;ll confirm your date within 24 hours.</p>
                                <button
                                    onClick={() => setStatus("idle")}
                                    className="mt-6 text-amber-400 hover:text-amber-300 text-sm font-mono"
                                >
                                    Submit Another Request →
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 space-y-5">
                                <h3 className="text-lg font-heading font-bold text-white mb-2">Book a Session</h3>

                                {/* Error display */}
                                {status === "error" && errors.length > 0 && (
                                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <XCircle className="w-4 h-4 text-red-400" />
                                            <span className="text-red-400 text-sm font-medium">Please fix the following:</span>
                                        </div>
                                        <ul className="space-y-1">
                                            {errors.map((e, i) => (
                                                <li key={i} className="text-red-300/70 text-xs pl-6">• {e}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Row: Name + Email */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input name="name" value={form.name} onChange={handleChange} required placeholder="Your Name *" className={inputClass} />
                                    <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Email *" className={inputClass} />
                                </div>

                                {/* Row: Phone + Date */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input name="phone" type="tel" value={form.phone} onChange={handleChange} required placeholder="Phone Number *" className={inputClass} />
                                    <input name="event_date" type="date" value={form.event_date} onChange={handleChange} required className={inputClass} />
                                </div>

                                {/* Row: Event Type + Location */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <select name="event_type" value={form.event_type} onChange={handleChange} required className={selectClass}>
                                        <option value="" disabled>Event Type *</option>
                                        {EVENT_TYPES.map((t) => <option key={t} value={t} className="bg-[#1a1a1a]">{t}</option>)}
                                    </select>
                                    <select name="location" value={form.location} onChange={handleChange} required className={selectClass}>
                                        <option value="" disabled>Location *</option>
                                        {LOCATIONS.map((l) => <option key={l} value={l} className="bg-[#1a1a1a]">{l}</option>)}
                                    </select>
                                </div>

                                {/* Budget */}
                                <select name="budget" value={form.budget} onChange={handleChange} required className={selectClass}>
                                    <option value="" disabled>Budget Range *</option>
                                    {BUDGETS.map((b) => <option key={b} value={b} className="bg-[#1a1a1a]">{b}</option>)}
                                </select>

                                {/* Message */}
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Tell us about your event (optional)"
                                    className={`${inputClass} resize-none`}
                                />

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold py-3.5 rounded-xl hover:from-amber-500 hover:to-amber-400 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-amber-900/30 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    {status === "loading" ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            Submit Booking Request
                                        </>
                                    )}
                                </button>

                                <p className="text-white/20 text-xs text-center">
                                    Or message us directly on <button type="button" onClick={openWhatsApp} className="text-green-400 hover:underline">WhatsApp</button>
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
