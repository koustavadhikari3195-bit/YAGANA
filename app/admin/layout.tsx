"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
    Camera,
    Image,
    DollarSign,
    FileText,
    Settings,
    LogOut,
    LayoutDashboard,
    CalendarDays,
} from "lucide-react";

const sidebarLinks = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/bookings", label: "Bookings", icon: CalendarDays },
    { href: "/admin/gallery", label: "Gallery", icon: Image },
    { href: "/admin/pricing", label: "Pricing", icon: DollarSign },
    { href: "/admin/files", label: "Files", icon: FileText },
    { href: "/admin/content", label: "Site Content", icon: Settings },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();

    // Don't render admin layout for login page
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/admin/login");
        router.refresh();
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="admin-sidebar flex flex-col">
                {/* Logo */}
                <div className="p-6 border-b border-white/10">
                    <Link href="/admin" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-lighter to-accent flex items-center justify-center">
                            <Camera className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <span className="text-white font-bold text-sm">Rig Photography</span>
                            <span className="block text-white/40 text-xs">Admin Panel</span>
                        </div>
                    </Link>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 py-4">
                    {sidebarLinks.map((link) => {
                        const isActive =
                            pathname === link.href ||
                            (link.href !== "/admin" && pathname.startsWith(link.href));

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`${isActive ? "active" : ""}`}
                            >
                                <link.icon className="w-5 h-5" />
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 text-white/50 hover:text-white text-sm w-full px-4 py-3 rounded-xl hover:bg-white/5 transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </button>
                    <Link
                        href="/"
                        className="flex items-center gap-3 text-white/50 hover:text-white text-sm w-full px-4 py-2 rounded-xl hover:bg-white/5 transition-all mt-1"
                    >
                        ← Back to Website
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="p-8">{children}</div>
            </main>
        </div>
    );
}
