import { Image, DollarSign, FileText, Settings } from "lucide-react";
import Link from "next/link";

const quickLinks = [
    {
        href: "/admin/gallery",
        label: "Gallery Manager",
        desc: "Upload, categorize, and manage wedding photos",
        icon: Image,
        color: "from-emerald-500 to-teal-500",
    },
    {
        href: "/admin/pricing",
        label: "Pricing Editor",
        desc: "Update package prices and features",
        icon: DollarSign,
        color: "from-amber-500 to-orange-500",
    },
    {
        href: "/admin/files",
        label: "File Manager",
        desc: "Upload PDF brochures for client download",
        icon: FileText,
        color: "from-blue-500 to-indigo-500",
    },
    {
        href: "/admin/content",
        label: "Site Content",
        desc: "Edit about text and service descriptions",
        icon: Settings,
        color: "from-purple-500 to-pink-500",
    },
];

export default function AdminDashboard() {
    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-heading font-bold text-gray-900">
                    Welcome Back 👋
                </h1>
                <p className="text-gray-500 mt-1">
                    Manage your website content from this dashboard
                </p>
            </div>

            {/* Quick Links Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quickLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                    >
                        <div className="flex items-start gap-4">
                            <div
                                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                            >
                                <link.icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                                    {link.label}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">{link.desc}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Info Card */}
            <div className="mt-8 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 border border-primary-200">
                <h3 className="font-semibold text-primary-dark mb-2">
                    💡 How to use this dashboard
                </h3>
                <ul className="text-sm text-primary-dark/70 space-y-2">
                    <li>
                        • <strong>Gallery:</strong> Drag & drop photos, set categories, and mark featured images
                    </li>
                    <li>
                        • <strong>Pricing:</strong> Click any field to edit prices, titles, and features instantly
                    </li>
                    <li>
                        • <strong>Files:</strong> Upload PDF brochures that visitors can download
                    </li>
                    <li>
                        • <strong>Content:</strong> Edit the About page and service descriptions
                    </li>
                    <li className="text-primary font-medium">
                        All changes appear on the live website instantly!
                    </li>
                </ul>
            </div>
        </div>
    );
}
