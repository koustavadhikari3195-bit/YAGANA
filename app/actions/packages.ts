"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidateTag } from "next/cache";

export async function createPackage(data: {
    title: string;
    price: number;
    description: string;
    category: string;
    features: string[];
    is_team_package: boolean;
}) {
    const supabase = createAdminClient();

    const { error } = await supabase.from("packages").insert({
        title: data.title,
        price: data.price,
        description: data.description,
        category: data.category,
        features: data.features,
        is_team_package: data.category === "Team",
    });

    if (error) {
        return { error: error.message };
    }

    revalidateTag("packages");
    return { success: true };
}

export async function updatePackage(
    id: string,
    data: {
        title?: string;
        price?: number;
        description?: string;
        category?: string;
        features?: string[];
        is_team_package?: boolean;
        sort_order?: number;
    }
) {
    const supabase = createAdminClient();

    const { error } = await supabase
        .from("packages")
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq("id", id);

    if (error) {
        return { error: error.message };
    }

    revalidateTag("packages");
    return { success: true };
}

export async function deletePackage(id: string) {
    const supabase = createAdminClient();

    const { error } = await supabase
        .from("packages")
        .delete()
        .eq("id", id);

    if (error) {
        return { error: error.message };
    }

    revalidateTag("packages");
    return { success: true };
}
