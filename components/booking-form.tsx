"use client";

import { useState } from "react";
import { CalendarDays, MapPin, IndianRupee, User, Mail, Phone, MessageSquare, Send, CheckCircle, XCircle } from "lucide-react";

const LOCATIONS = ["Kolkata", "Sikkim", "Darjeeling", "Manali", "Goa", "Rajasthan", "Destination (Other)"];
const EVENT_TYPES = ["Wedding", "Pre-Wedding", "Commercial", "Other"];
const BUDGETS = ["₹25,000 – ₹50,000", "₹50,000 – ₹1,00,000", "₹1,00,000 – ₹2,50,000", "₹2,50,000 – ₹5,00,000", "₹5,00,000+"];

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

export default function BookingForm() {
    const [form, setForm] = useState<FormData>({
        name: "", email: "", phone: "", event_date: "", event_type: "", location: "", budget: "", message: "",
    });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [responseMsg, setResponseMsg] = useState("");
    const [errors, setErrors] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
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
                setResponseMsg(data.message);
                setForm({ name: "", email: "", phone: "", event_date: "", event_type: "", location: "", budget: "", message: "" });
            } else {
                setStatus("error");
                setErrors(data.errors || ["Something went wrong"]);
            }
        } catch {
            setStatus("error");
            setErrors(["Network error. Please check your connection."]);
        }
    };

    if (status === "success") {
        return (
            <div className="bg-white rounded-3xl p-10 shadow-xl border border-green-100 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-heading font-bold text-primary-dark mb-2">Booking Received!</h3>
                <p className="text-muted">{responseMsg}</p>
                <button onClick={() => setStatus("idle")} className="mt-6 btn-primary text-sm">
                    Submit Another Inquiry
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-border space-y-6">
            <div className="text-center mb-2">
                <h3 className="text-2xl font-heading font-bold text-primary-dark">Book Your Session</h3>
                <p className="text-muted text-sm">Fill in the details and we&apos;ll get back within 24 hours</p>
            </div>

            {/* Error display */}
            {errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-start gap-2">
                        <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                        <ul className="text-sm text-red-700 space-y-1">
                            {errors.map((err, i) => <li key={i}>{err}</li>)}
                        </ul>
                    </div>
                </div>
            )}

            {/* Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-primary-dark flex items-center gap-1.5">
                        <User className="w-4 h-4" /> Full Name *
                    </label>
                    <input
                        type="text" name="name" value={form.name} onChange={handleChange} required
                        className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                        placeholder="Your name"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-primary-dark flex items-center gap-1.5">
                        <Mail className="w-4 h-4" /> Email *
                    </label>
                    <input
                        type="email" name="email" value={form.email} onChange={handleChange} required
                        className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                        placeholder="you@email.com"
                    />
                </div>
            </div>

            {/* Phone + Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-primary-dark flex items-center gap-1.5">
                        <Phone className="w-4 h-4" /> Phone *
                    </label>
                    <input
                        type="tel" name="phone" value={form.phone} onChange={handleChange} required
                        className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                        placeholder="+91 9876543210"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-primary-dark flex items-center gap-1.5">
                        <CalendarDays className="w-4 h-4" /> Event Date *
                    </label>
                    <input
                        type="date" name="event_date" value={form.event_date} onChange={handleChange} required
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                    />
                </div>
            </div>

            {/* Event Type + Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-primary-dark">Event Type *</label>
                    <select
                        name="event_type" value={form.event_type} onChange={handleChange} required
                        className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-white"
                    >
                        <option value="">Select event type</option>
                        {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-primary-dark flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" /> Location *
                    </label>
                    <select
                        name="location" value={form.location} onChange={handleChange} required
                        className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-white"
                    >
                        <option value="">Select location</option>
                        {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                </div>
            </div>

            {/* Budget */}
            <div className="space-y-1.5">
                <label className="text-sm font-medium text-primary-dark flex items-center gap-1.5">
                    <IndianRupee className="w-4 h-4" /> Budget Range *
                </label>
                <select
                    name="budget" value={form.budget} onChange={handleChange} required
                    className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-white"
                >
                    <option value="">Select budget range</option>
                    {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
                <label className="text-sm font-medium text-primary-dark flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4" /> Additional Details
                </label>
                <textarea
                    name="message" value={form.message} onChange={handleChange} rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm resize-none"
                    placeholder="Tell us about your event, special requests, etc."
                />
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full btn-primary text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {status === "submitting" ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Submitting...
                    </span>
                ) : (
                    <span className="flex items-center justify-center gap-2">
                        Send Booking Request <Send className="w-5 h-5" />
                    </span>
                )}
            </button>
        </form>
    );
}
