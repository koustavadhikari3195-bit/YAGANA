"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { updateSiteContent } from "@/app/actions/content";
import {
    Save,
    Settings,
    Loader2,
    CheckCircle,
    AlertCircle,
    FileText,
} from "lucide-react";
import type { SiteContent } from "@/lib/types";

const contentLabels: Record<string, { label: string; type: "text" | "textarea" }> = {
    hero_title: { label: "Hero Title", type: "text" },
    hero_subtitle: { label: "Hero Subtitle", type: "text" },
    about_title: { label: "About Page Title", type: "text" },
    about_description: { label: "About Page Description", type: "textarea" },
    services_description: { label: "Services Description", type: "textarea" },
    contact_info: { label: "Contact Information", type: "textarea" },
};

export default function AdminContentPage() {
    const [content, setContent] = useState<SiteContent[]>([]);
    const [loading, setLoading] = useState(true);
    const [editedValues, setEditedValues] = useState<Record<string, string>>({});
    const [savingKey, setSavingKey] = useState<string | null>(null);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const fetchContent = useCallback(async () => {
        try {
            const supabase = createClient();
            const { data } = await supabase
                .from("site_content")
                .select("*")
                .order("key");
            const items = (data as SiteContent[]) || [];
            setContent(items);
            // Initialize edited values
            const values: Record<string, string> = {};
            items.forEach((item) => {
                values[item.key] = item.value;
            });
            setEditedValues(values);
        } catch {
            setContent([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchContent();
    }, [fetchContent]);

    const showMsg = (type: "success" | "error", text: string) => {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 4000);
    };

    const handleSave = async (key: string) => {
        const value = editedValues[key];
        if (value === undefined) return;

        setSavingKey(key);
        const result = await updateSiteContent(key, value);
        if (result.error) {
            showMsg("error", result.error);
        } else {
            showMsg("success", `"${contentLabels[key]?.label || key}" saved!`);
        }
        setSavingKey(null);
    };

    const hasChanged = (key: string) => {
        const original = content.find((c) => c.key === key);
        return original ? original.value !== editedValues[key] : false;
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-heading font-bold text-gray-900">
                    Site Content Editor
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                    Edit your website&apos;s text content — changes appear instantly on the live site
                </p>
            </div>

            {/* Message */}
            {message && (
                <div
                    className={`flex items-center gap-2 p-4 rounded-xl mb-6 ${message.type === "success"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                >
                    {message.type === "success" ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    {message.text}
                </div>
            )}

            {/* Content */}
            {loading ? (
                <div className="text-center py-16">
                    <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" />
                </div>
            ) : content.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                    <FileText className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-400">
                        No content items
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                        Run the SQL schema to seed initial content keys
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {content.map((item) => {
                        const config = contentLabels[item.key] || {
                            label: item.key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
                            type: "textarea" as const,
                        };
                        const changed = hasChanged(item.key);

                        return (
                            <div
                                key={item.key}
                                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <Settings className="w-4 h-4 text-primary" />
                                        <label className="font-semibold text-gray-900">
                                            {config.label}
                                        </label>
                                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                            {item.key}
                                        </span>
                                    </div>
                                    {changed && (
                                        <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full font-medium">
                                            Unsaved changes
                                        </span>
                                    )}
                                </div>

                                {config.type === "textarea" ? (
                                    <textarea
                                        value={editedValues[item.key] || ""}
                                        onChange={(e) =>
                                            setEditedValues({ ...editedValues, [item.key]: e.target.value })
                                        }
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all resize-none"
                                        rows={4}
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        value={editedValues[item.key] || ""}
                                        onChange={(e) =>
                                            setEditedValues({ ...editedValues, [item.key]: e.target.value })
                                        }
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all"
                                    />
                                )}

                                <div className="flex items-center justify-between mt-3">
                                    <span className="text-xs text-gray-400">
                                        Last updated:{" "}
                                        {new Date(item.updated_at).toLocaleString()}
                                    </span>
                                    <button
                                        onClick={() => handleSave(item.key)}
                                        disabled={!changed || savingKey === item.key}
                                        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${changed
                                                ? "bg-primary text-white hover:bg-primary-dark"
                                                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                            }`}
                                    >
                                        {savingKey === item.key ? (
                                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                        ) : (
                                            <Save className="w-3.5 h-3.5" />
                                        )}
                                        Save
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
