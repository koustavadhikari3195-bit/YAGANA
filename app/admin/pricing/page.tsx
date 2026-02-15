"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { createPackage, updatePackage, deletePackage } from "@/app/actions/packages";
import {
    Plus,
    Trash2,
    Save,
    X,
    Edit3,
    DollarSign,
    Loader2,
    CheckCircle,
    AlertCircle,
} from "lucide-react";
import type { Package } from "@/lib/types";

const emptyPackage: {
    title: string;
    price: number;
    description: string;
    category: string;
    features: string[];
    is_team_package: boolean;
} = {
    title: "",
    price: 0,
    description: "",
    category: "Freelancer",
    features: [""],
    is_team_package: false,
};

export default function AdminPricingPage() {
    const [packages, setPackages] = useState<Package[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newPackage, setNewPackage] = useState(emptyPackage);
    const [editData, setEditData] = useState<Partial<Package>>({});
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const fetchPackages = useCallback(async () => {
        try {
            const supabase = createClient();
            const { data } = await supabase
                .from("packages")
                .select("*")
                .order("sort_order", { ascending: true });
            setPackages((data as Package[]) || []);
        } catch {
            setPackages([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPackages();
    }, [fetchPackages]);

    const showMsg = (type: "success" | "error", text: string) => {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 4000);
    };

    const handleCreate = async () => {
        if (!newPackage.title || !newPackage.price) {
            showMsg("error", "Title and price are required");
            return;
        }
        setSaving(true);
        const result = await createPackage({
            ...newPackage,
            features: newPackage.features.filter((f) => f.trim() !== ""),
        });
        if (result.error) {
            showMsg("error", result.error);
        } else {
            showMsg("success", "Package created!");
            setShowAddForm(false);
            setNewPackage(emptyPackage);
            fetchPackages();
        }
        setSaving(false);
    };

    const handleUpdate = async (id: string) => {
        setSaving(true);
        const cleanData = {
            ...editData,
            description: editData.description ?? undefined,
        };
        const result = await updatePackage(id, cleanData);
        if (result.error) {
            showMsg("error", result.error);
        } else {
            showMsg("success", "Package updated!");
            setEditingId(null);
            setEditData({});
            fetchPackages();
        }
        setSaving(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this package?")) return;
        const result = await deletePackage(id);
        if (result.error) {
            showMsg("error", result.error);
        } else {
            showMsg("success", "Package deleted");
            fetchPackages();
        }
    };

    const startEdit = (pkg: Package) => {
        setEditingId(pkg.id);
        setEditData({
            title: pkg.title,
            price: pkg.price,
            description: pkg.description || "",
            category: pkg.category,
            features: pkg.features || [],
        });
    };

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-heading font-bold text-gray-900">
                        Pricing Editor
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Manage your photography packages and pricing
                    </p>
                </div>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-medium hover:bg-primary-dark transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Package
                </button>
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

            {/* Add New Form */}
            {showAddForm && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">New Package</h3>
                        <button
                            onClick={() => setShowAddForm(false)}
                            className="p-1 hover:bg-gray-100 rounded-lg"
                        >
                            <X className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Package Title"
                            value={newPackage.title}
                            onChange={(e) => setNewPackage({ ...newPackage, title: e.target.value })}
                            className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                        <input
                            type="number"
                            placeholder="Price (₹)"
                            value={newPackage.price || ""}
                            onChange={(e) => setNewPackage({ ...newPackage, price: Number(e.target.value) })}
                            className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                    </div>

                    <textarea
                        placeholder="Description"
                        value={newPackage.description}
                        onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-primary/30"
                        rows={2}
                    />

                    <div className="flex gap-4 mb-4">
                        <select
                            value={newPackage.category}
                            onChange={(e) => setNewPackage({ ...newPackage, category: e.target.value as "Freelancer" | "Team" })}
                            className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30"
                        >
                            <option value="Freelancer">Freelancer</option>
                            <option value="Team">Team</option>
                        </select>
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                            Features (one per line)
                        </label>
                        {newPackage.features.map((f, i) => (
                            <div key={i} className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={f}
                                    placeholder={`Feature ${i + 1}`}
                                    onChange={(e) => {
                                        const updated = [...newPackage.features];
                                        updated[i] = e.target.value;
                                        setNewPackage({ ...newPackage, features: updated });
                                    }}
                                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                                />
                                {newPackage.features.length > 1 && (
                                    <button
                                        onClick={() => {
                                            const updated = newPackage.features.filter((_, j) => j !== i);
                                            setNewPackage({ ...newPackage, features: updated });
                                        }}
                                        className="p-2 text-red-400 hover:text-red-600"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            onClick={() => setNewPackage({ ...newPackage, features: [...newPackage.features, ""] })}
                            className="text-sm text-primary font-medium hover:underline"
                        >
                            + Add Feature
                        </button>
                    </div>

                    <button
                        onClick={handleCreate}
                        disabled={saving}
                        className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Create Package
                    </button>
                </div>
            )}

            {/* Packages List */}
            {loading ? (
                <div className="text-center py-16">
                    <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" />
                </div>
            ) : packages.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                    <DollarSign className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-400">No packages yet</h3>
                    <p className="text-sm text-gray-400 mt-1">Click &ldquo;Add Package&rdquo; to create your first pricing tier</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {packages.map((pkg) => (
                        <div
                            key={pkg.id}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all"
                        >
                            {editingId === pkg.id ? (
                                /* Edit Mode */
                                <div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                        <input
                                            type="text"
                                            value={editData.title || ""}
                                            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                                        />
                                        <input
                                            type="number"
                                            value={editData.price || ""}
                                            onChange={(e) => setEditData({ ...editData, price: Number(e.target.value) })}
                                            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                                        />
                                        <select
                                            value={editData.category || ""}
                                            onChange={(e) => setEditData({ ...editData, category: e.target.value as "Freelancer" | "Team" })}
                                            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                                        >
                                            <option value="Freelancer">Freelancer</option>
                                            <option value="Team">Team</option>
                                        </select>
                                    </div>
                                    <textarea
                                        value={editData.description || ""}
                                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                                        rows={2}
                                    />
                                    {/* Edit features */}
                                    <div className="mb-4">
                                        <label className="text-xs font-medium text-gray-500 mb-2 block">Features</label>
                                        {(editData.features || []).map((f, i) => (
                                            <div key={i} className="flex gap-2 mb-1">
                                                <input
                                                    type="text"
                                                    value={f}
                                                    onChange={(e) => {
                                                        const updated = [...(editData.features || [])];
                                                        updated[i] = e.target.value;
                                                        setEditData({ ...editData, features: updated });
                                                    }}
                                                    className="flex-1 px-2 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                                />
                                                <button
                                                    onClick={() => setEditData({ ...editData, features: (editData.features || []).filter((_, j) => j !== i) })}
                                                    className="p-1 text-red-400"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            onClick={() => setEditData({ ...editData, features: [...(editData.features || []), ""] })}
                                            className="text-xs text-primary font-medium mt-1"
                                        >
                                            + Add Feature
                                        </button>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleUpdate(pkg.id)}
                                            disabled={saving}
                                            className="flex items-center gap-1.5 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
                                        >
                                            {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                                            Save
                                        </button>
                                        <button
                                            onClick={() => { setEditingId(null); setEditData({}); }}
                                            className="px-4 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-100"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                /* Display Mode */
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-lg font-bold text-gray-900">
                                                {pkg.title}
                                            </h3>
                                            <span
                                                className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${pkg.category === "Team"
                                                    ? "bg-blue-50 text-blue-600"
                                                    : "bg-green-50 text-green-600"
                                                    }`}
                                            >
                                                {pkg.category}
                                            </span>
                                        </div>
                                        <p className="text-2xl font-bold text-primary mb-1">
                                            ₹{pkg.price.toLocaleString("en-IN")}
                                        </p>
                                        <p className="text-sm text-gray-500">{pkg.description}</p>
                                        {pkg.features && pkg.features.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mt-3">
                                                {pkg.features.map((f, i) => (
                                                    <span
                                                        key={i}
                                                        className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full"
                                                    >
                                                        {f}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex gap-2 shrink-0">
                                        <button
                                            onClick={() => startEdit(pkg)}
                                            className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-primary transition-colors"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(pkg.id)}
                                            className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
