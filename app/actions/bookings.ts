"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

function getAdmin() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    return createClient(url, key);
}

export async function getBookings() {
    const supabase = getAdmin();
    const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
}

export async function updateBookingStatus(id: string, status: "pending" | "confirmed" | "completed") {
    const supabase = getAdmin();
    const { error } = await supabase
        .from("bookings")
        .update({ status })
        .eq("id", id);

    if (error) throw error;
    revalidatePath("/admin/bookings");
}

export async function deleteBooking(id: string) {
    const supabase = getAdmin();
    const { error } = await supabase
        .from("bookings")
        .delete()
        .eq("id", id);

    if (error) throw error;
    revalidatePath("/admin/bookings");
}
