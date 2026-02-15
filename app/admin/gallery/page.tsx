"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { uploadImage, deleteImage, toggleFeatured, updateImageCategory } from "@/app/actions/gallery";
import {
    Upload,
    Trash2,
    Star,
    StarOff,
    Image as ImageIcon,
    Loader2,
    CheckCircle,
    AlertCircle,
} from "lucide-react";
import type { MediaAsset } from "@/lib/types";

const categories = ["Portrait", "Bride", "Groom", "Events"] as const;

export default function AdminGalleryPage() {
    const [images, setImages] = useState<MediaAsset[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>("Portrait");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const fetchImages = useCallback(async () => {
        try {
            const supabase = createClient();
            const { data } = await supabase
                .from("media_assets")
                .select("*")
                .order("upload_date", { ascending: false });
            setImages((data as MediaAsset[]) || []);
        } catch {
            // Supabase not connected yet
            setImages([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    const showMessage = (type: "success" | "error", text: string) => {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 4000);
    };

    const handleUpload = async (files: FileList) => {
        setUploading(true);

        for (const file of Array.from(files)) {
            if (!file.type.startsWith("image/")) {
                showMessage("error", `${file.name} is not an image file`);
                continue;
            }

            const formData = new FormData();
            formData.append("file", file);
            formData.append("category", selectedCategory);
            formData.append("is_featured", "false");
            formData.append("alt_text", file.name.replace(/\.[^/.]+$/, ""));

            const result = await uploadImage(formData);
            if (result.error) {
                showMessage("error", result.error);
            } else {
                showMessage("success", `${file.name} uploaded successfully!`);
            }
        }

        setUploading(false);
        fetchImages();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer.files.length > 0) {
            handleUpload(e.dataTransfer.files);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this image?")) return;
        const result = await deleteImage(id);
        if (result.error) {
            showMessage("error", result.error);
        } else {
            showMessage("success", "Image deleted");
            fetchImages();
        }
    };

    const handleToggleFeatured = async (id: string, current: boolean) => {
        const result = await toggleFeatured(id, !current);
        if (result.error) {
            showMessage("error", result.error);
        } else {
            fetchImages();
        }
    };

    const handleCategoryChange = async (id: string, category: string) => {
        const result = await updateImageCategory(id, category);
        if (result.error) {
            showMessage("error", result.error);
        } else {
            fetchImages();
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-heading font-bold text-gray-900">
                        Gallery Manager
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Upload and manage your wedding photos
                    </p>
                </div>
                <div className="text-sm text-gray-500">
                    {images.length} photos
                </div>
            </div>

            {/* Status Message */}
            {message && (
                <div
                    className={`flex items-center gap-2 p-4 rounded-xl mb-6 ${message.type === "success"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                >
                    {message.type === "success" ? (
                        <CheckCircle className="w-5 h-5" />
                    ) : (
                        <AlertCircle className="w-5 h-5" />
                    )}
                    {message.text}
                </div>
            )}

            {/* Upload Section */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
                {/* Category Selector */}
                <div className="flex items-center gap-3 mb-4">
                    <label className="text-sm font-medium text-gray-700">
                        Upload Category:
                    </label>
                    <div className="flex gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${selectedCategory === cat
                                        ? "bg-primary text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Drop Zone */}
                <div
                    className={`drop-zone ${dragOver ? "drag-over" : ""}`}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                >
                    {uploading ? (
                        <div className="flex flex-col items-center gap-3">
                            <Loader2 className="w-10 h-10 text-primary animate-spin" />
                            <p className="text-primary font-medium">Uploading...</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-3">
                            <Upload className="w-10 h-10 text-primary-light" />
                            <div>
                                <p className="text-primary-dark font-medium">
                                    Drag & drop images here
                                </p>
                                <p className="text-sm text-muted mt-1">
                                    or click to browse • JPG, PNG accepted
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                            handleUpload(e.target.files);
                            e.target.value = "";
                        }
                    }}
                />
            </div>

            {/* Image Grid */}
            {loading ? (
                <div className="text-center py-16">
                    <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" />
                    <p className="text-muted mt-3">Loading gallery...</p>
                </div>
            ) : images.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                    <ImageIcon className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-400">
                        No images yet
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                        Upload your first wedding photo above
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((img) => (
                        <div
                            key={img.id}
                            className="group relative bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all"
                        >
                            <div className="aspect-square relative">
                                <img
                                    src={img.storage_path}
                                    alt={img.alt_text || "Gallery image"}
                                    className="w-full h-full object-cover"
                                />
                                {/* Overlay Actions */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => handleToggleFeatured(img.id, img.is_featured)}
                                        className={`p-2.5 rounded-full ${img.is_featured
                                                ? "bg-yellow-400 text-yellow-900"
                                                : "bg-white/90 text-gray-600"
                                            } hover:scale-110 transition-all`}
                                        title={img.is_featured ? "Unfeature" : "Set as Featured"}
                                    >
                                        {img.is_featured ? (
                                            <Star className="w-4 h-4 fill-current" />
                                        ) : (
                                            <StarOff className="w-4 h-4" />
                                        )}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(img.id)}
                                        className="p-2.5 rounded-full bg-red-500 text-white hover:bg-red-600 hover:scale-110 transition-all"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                {/* Featured Badge */}
                                {img.is_featured && (
                                    <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                        <Star className="w-3 h-3 fill-current" />
                                        Featured
                                    </div>
                                )}
                            </div>
                            {/* Info */}
                            <div className="p-3">
                                <select
                                    value={img.category}
                                    onChange={(e) => handleCategoryChange(img.id, e.target.value)}
                                    className="w-full text-xs px-2 py-1.5 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-primary"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
