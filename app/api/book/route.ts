import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/* ─── Booking API: POST /api/book ─── */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, phone, event_date, event_type, location, budget, message } = body;

        /* ── Validation ── */
        const errors: string[] = [];
        if (!name || name.trim().length < 2) errors.push("Name is required (min 2 chars)");
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Valid email is required");
        if (!phone || phone.trim().length < 10) errors.push("Valid phone number is required");
        if (!event_date) errors.push("Event date is required");
        if (!event_type || !["Wedding", "Commercial", "Pre-Wedding", "Other"].includes(event_type)) {
            errors.push("Event type must be Wedding, Commercial, Pre-Wedding, or Other");
        }
        if (!location) errors.push("Location is required");
        if (!budget) errors.push("Budget range is required");

        if (errors.length > 0) {
            return NextResponse.json({ success: false, errors }, { status: 400 });
        }

        /* ── Date validation: must be in the future ── */
        const eventDate = new Date(event_date);
        if (eventDate <= new Date()) {
            return NextResponse.json(
                { success: false, errors: ["Event date must be in the future"] },
                { status: 400 }
            );
        }

        /* ── Supabase client ── */
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !supabaseKey) {
            // Graceful fallback: log the booking and return success
            console.log("📋 New Booking (No DB):", { name, email, phone, event_date, event_type, location, budget, message });
            return NextResponse.json({
                success: true,
                message: "Booking request received! We'll be in touch within 24 hours.",
                booking_id: `RIG-${Date.now()}`,
            }, { status: 201 });
        }

        const supabase = createClient(supabaseUrl, supabaseKey);

        /* ── Date conflict check ── */
        const { data: existing } = await supabase
            .from("bookings")
            .select("id, status")
            .eq("event_date", event_date)
            .neq("status", "completed")
            .limit(1);

        if (existing && existing.length > 0) {
            return NextResponse.json(
                {
                    success: false,
                    errors: [`Date ${event_date} is unavailable — we already have a confirmed booking. Please choose another date.`],
                },
                { status: 409 }
            );
        }

        /* ── Insert booking ── */
        const { data, error } = await supabase
            .from("bookings")
            .insert({
                name: name.trim(),
                email: email.trim().toLowerCase(),
                phone: phone.trim(),
                event_date,
                event_type,
                location,
                budget,
                message: message?.trim() || "",
                status: "pending",
            })
            .select("id")
            .single();

        if (error) {
            console.error("Booking insert error:", error);
            return NextResponse.json(
                { success: false, errors: ["Failed to save booking. Please try again."] },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Booking request received! We'll confirm your date within 24 hours.",
            booking_id: data.id,
        }, { status: 201 });
    } catch (err) {
        console.error("Booking API error:", err);
        return NextResponse.json(
            { success: false, errors: ["Server error. Please try again later."] },
            { status: 500 }
        );
    }
}
