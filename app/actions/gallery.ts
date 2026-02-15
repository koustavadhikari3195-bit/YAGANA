"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidateTag } from "next/cache";
import { logger } from "@/lib/logger";

export async function uploadImage(formData: FormData) {
    const supabase = createAdminClient();

    const file = formData.get("file") as File;
    const category = formData.get("category") as string;
    const isFeatured = formData.get("is_featured") === "true";
    const altText = formData.get("alt_text") as string;

    if (!file) {
        return { error: "No file provided" };
    }

    // Generate unique filename
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
    const storagePath = `gallery/${fileName}`;

    // Upload to storage
    const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(fileName, file, {
            contentType: file.type,
            upsert: false,
        });

    if (uploadError) {
        logger.error("Gallery", "Image upload failed", { file: file.name, error: uploadError.message });
        return { error: `Upload failed: ${uploadError.message}` };
    }

    // Get public URL
    const { data: urlData } = supabase.storage
        .from("gallery")
        .getPublicUrl(fileName);

    // Insert into media_assets table
    const { error: dbError } = await supabase.from("media_assets").insert({
        storage_path: urlData.publicUrl,
        thumbnail_path: urlData.publicUrl, // Using same image for thumbnail initially
        category,
        is_featured: isFeatured,
        alt_text: altText || file.name,
        file_size: file.size,
    });

    if (dbError) {
        logger.error("Gallery", "DB insert failed after upload", { error: dbError.message });
        return { error: `Database error: ${dbError.message}` };
    }

    logger.info("Gallery", "Image uploaded successfully", { file: file.name, category });
    revalidateTag("gallery");
    revalidateTag("featured");
    return { success: true };
}

export async function deleteImage(id: string) {
    const supabase = createAdminClient();

    // Get the image record first
    const { data: image } = await supabase
        .from("media_assets")
        .select("storage_path")
        .eq("id", id)
        .single();

    if (image) {
        // Extract filename from URL
        const url = new URL(image.storage_path);
        const pathParts = url.pathname.split("/");
        const fileName = pathParts[pathParts.length - 1];

        // Delete from storage
        await supabase.storage.from("gallery").remove([fileName]);
    }

    // Delete from database
    const { error } = await supabase
        .from("media_assets")
        .delete()
        .eq("id", id);

    if (error) {
        logger.error("Gallery", "Image delete failed", { id, error: error.message });
        return { error: error.message };
    }

    logger.info("Gallery", "Image deleted", { id });
    revalidateTag("gallery");
    revalidateTag("featured");
    return { success: true };
}

export async function toggleFeatured(id: string, isFeatured: boolean) {
    const supabase = createAdminClient();

    const { error } = await supabase
        .from("media_assets")
        .update({ is_featured: isFeatured })
        .eq("id", id);

    if (error) {
        return { error: error.message };
    }

    revalidateTag("gallery");
    revalidateTag("featured");
    return { success: true };
}

export async function updateImageCategory(id: string, category: string) {
    const supabase = createAdminClient();

    const { error } = await supabase
        .from("media_assets")
        .update({ category })
        .eq("id", id);

    if (error) {
        return { error: error.message };
    }

    revalidateTag("gallery");
    return { success: true };
}
