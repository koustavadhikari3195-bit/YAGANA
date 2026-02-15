"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidateTag } from "next/cache";

export async function uploadFile(formData: FormData) {
    const supabase = createAdminClient();

    const file = formData.get("file") as File;
    const name = (formData.get("name") as string) || file.name;

    if (!file) {
        return { error: "No file provided" };
    }

    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;

    // Upload to storage
    const { error: uploadError } = await supabase.storage
        .from("files")
        .upload(fileName, file, {
            contentType: file.type,
            upsert: false,
        });

    if (uploadError) {
        return { error: `Upload failed: ${uploadError.message}` };
    }

    // Get public URL
    const { data: urlData } = supabase.storage
        .from("files")
        .getPublicUrl(fileName);

    // Insert into files table
    const { error: dbError } = await supabase.from("files").insert({
        name,
        storage_path: urlData.publicUrl,
        file_size: file.size,
        mime_type: file.type,
    });

    if (dbError) {
        return { error: `Database error: ${dbError.message}` };
    }

    revalidateTag("files");
    return { success: true };
}

export async function deleteFile(id: string) {
    const supabase = createAdminClient();

    // Get file record
    const { data: fileRecord } = await supabase
        .from("files")
        .select("storage_path")
        .eq("id", id)
        .single();

    if (fileRecord) {
        const url = new URL(fileRecord.storage_path);
        const pathParts = url.pathname.split("/");
        const fileName = pathParts[pathParts.length - 1];
        await supabase.storage.from("files").remove([fileName]);
    }

    const { error } = await supabase
        .from("files")
        .delete()
        .eq("id", id);

    if (error) {
        return { error: error.message };
    }

    revalidateTag("files");
    return { success: true };
}
