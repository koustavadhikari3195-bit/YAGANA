"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { uploadFile, deleteFile } from "@/app/actions/files";
import {
    Upload,
    Trash2,
    Download,
    FileText,
    Loader2,
    CheckCircle,
    AlertCircle,
} from "lucide-react";
import type { FileRecord } from "@/lib/types";

export default function AdminFilesPage() {
    const [files, setFiles] = useState<FileRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const fetchFiles = useCallback(async () => {
        try {
            const supabase = createClient();
            const { data } = await supabase
                .from("files")
                .select("*")
                .order("upload_date", { ascending: false });
            setFiles((data as FileRecord[]) || []);
        } catch {
            setFiles([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFiles();
    }, [fetchFiles]);

    const showMsg = (type: "success" | "error", text: string) => {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 4000);
    };

    const handleUpload = async (fileList: FileList) => {
        setUploading(true);

        for (const file of Array.from(fileList)) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("name", file.name);

            const result = await uploadFile(formData);
            if (result.error) {
                showMsg("error", result.error);
            } else {
                showMsg("success", `${file.name} uploaded!`);
            }
        }

        setUploading(false);
        fetchFiles();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer.files.length > 0) {
            handleUpload(e.dataTransfer.files);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this file?")) return;
        const result = await deleteFile(id);
        if (result.error) {
            showMsg("error", result.error);
        } else {
            showMsg("success", "File deleted");
            fetchFiles();
        }
    };

    const formatSize = (bytes: number | null) => {
        if (!bytes) return "—";
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-heading font-bold text-gray-900">
                    File Manager
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                    Upload PDF brochures and documents for clients to download
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

            {/* Upload Zone */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
                <div
                    className={`drop-zone ${dragOver ? "drag-over" : ""}`}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
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
                            <p className="text-primary-dark font-medium">
                                Drag & drop files here
                            </p>
                            <p className="text-sm text-muted">
                                or click to browse • PDF, DOCX, etc.
                            </p>
                        </div>
                    )}
                </div>

                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                    className="hidden"
                    onChange={(e) => {
                        if (e.target.files) {
                            handleUpload(e.target.files);
                            e.target.value = "";
                        }
                    }}
                />
            </div>

            {/* Files List */}
            {loading ? (
                <div className="text-center py-16">
                    <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" />
                </div>
            ) : files.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                    <FileText className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-400">No files yet</h3>
                    <p className="text-sm text-gray-400 mt-1">Upload your first brochure above</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                                    File Name
                                </th>
                                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                                    Size
                                </th>
                                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                                    Uploaded
                                </th>
                                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {files.map((file) => (
                                <tr key={file.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                                                <FileText className="w-5 h-5 text-red-500" />
                                            </div>
                                            <span className="font-medium text-sm text-gray-900">
                                                {file.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {formatSize(file.file_size)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(file.upload_date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <a
                                                href={file.storage_path}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-500 transition-colors"
                                                title="Download"
                                            >
                                                <Download className="w-4 h-4" />
                                            </a>
                                            <button
                                                onClick={() => handleDelete(file.id)}
                                                className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
