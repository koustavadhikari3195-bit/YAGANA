"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidateTag } from "next/cache";

export async function updateSiteContent(key: string, value: string) {
    const supabase = createAdminClient();

    const { error } = await supabase
        .from("site_content")
        .upsert(
            { key, value, updated_at: new Date().toISOString() },
            { onConflict: "key" }
        );

    if (error) {
        return { error: error.message };
    }

    revalidateTag("content");
    return { success: true };
}

export async function getSiteContent() {
    const supabase = createAdminClient();

    const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .order("key");

    if (error) {
        return { error: error.message, data: [] };
    }

    return { data: data || [] };
}
