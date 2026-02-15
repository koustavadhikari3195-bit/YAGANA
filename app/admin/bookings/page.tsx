"use client";

import { useEffect, useState } from "react";
import { getBookings, updateBookingStatus, deleteBooking } from "@/app/actions/bookings";
import { Calendar, MapPin, IndianRupee, User, Mail, Phone, Trash2, Clock, CheckCircle, XCircle } from "lucide-react";

interface Booking {
    id: string;
    name: string;
    email: string;
    phone: string;
    event_date: string;
    event_type: string;
    location: string;
    budget: string;
    message: string;
    status: "pending" | "confirmed" | "completed";
    created_at: string;
}

const STATUS_COLORS = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    confirmed: "bg-green-100 text-green-800 border-green-200",
    completed: "bg-blue-100 text-blue-800 border-blue-200",
};

const STATUS_ICONS = {
    pending: Clock,
    confirmed: CheckCircle,
    completed: XCircle,
};

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBookings();
    }, []);

    async function loadBookings() {
        try {
            const data = await getBookings();
            setBookings(data as Booking[]);
        } catch (err) {
            console.error("Failed to load bookings:", err);
        } finally {
            setLoading(false);
        }
    }

    async function handleStatusChange(id: string, status: "pending" | "confirmed" | "completed") {
        await updateBookingStatus(id, status);
        await loadBookings();
    }

    async function handleDelete(id: string) {
        if (confirm("Delete this booking permanently?")) {
            await deleteBooking(id);
            await loadBookings();
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-primary-dark">Bookings</h1>
                    <p className="text-muted text-sm">{bookings.length} total inquiries</p>
                </div>
                <div className="flex gap-2 text-xs">
                    <span className={`px-3 py-1 rounded-full border ${STATUS_COLORS.pending}`}>
                        {bookings.filter(b => b.status === "pending").length} Pending
                    </span>
                    <span className={`px-3 py-1 rounded-full border ${STATUS_COLORS.confirmed}`}>
                        {bookings.filter(b => b.status === "confirmed").length} Confirmed
                    </span>
                    <span className={`px-3 py-1 rounded-full border ${STATUS_COLORS.completed}`}>
                        {bookings.filter(b => b.status === "completed").length} Completed
                    </span>
                </div>
            </div>

            {bookings.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-border">
                    <Calendar className="w-12 h-12 text-muted mx-auto mb-4" />
                    <p className="text-muted">No bookings yet</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {bookings.map((booking) => {
                        const StatusIcon = STATUS_ICONS[booking.status];
                        return (
                            <div key={booking.id} className="bg-white rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                    {/* Info */}
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <h3 className="text-lg font-heading font-bold text-primary-dark">{booking.name}</h3>
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${STATUS_COLORS[booking.status]}`}>
                                                <StatusIcon className="w-3 h-3" />
                                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                            </span>
                                            <span className="text-xs text-muted bg-gray-50 px-2 py-0.5 rounded">
                                                {booking.event_type}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                            <div className="flex items-center gap-1.5 text-muted">
                                                <Mail className="w-3.5 h-3.5" /> {booking.email}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-muted">
                                                <Phone className="w-3.5 h-3.5" /> {booking.phone}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-muted">
                                                <Calendar className="w-3.5 h-3.5" /> {new Date(booking.event_date).toLocaleDateString("en-IN")}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-muted">
                                                <MapPin className="w-3.5 h-3.5" /> {booking.location}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-sm text-muted">
                                            <IndianRupee className="w-3.5 h-3.5" /> {booking.budget}
                                        </div>
                                        {booking.message && (
                                            <p className="text-sm text-muted bg-gray-50 rounded-xl p-3 italic">&ldquo;{booking.message}&rdquo;</p>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2 shrink-0">
                                        <select
                                            value={booking.status}
                                            onChange={(e) => handleStatusChange(booking.id, e.target.value as "pending" | "confirmed" | "completed")}
                                            className="text-sm border border-border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-primary/20 outline-none"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="confirmed">Confirmed</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                        <button
                                            onClick={() => handleDelete(booking.id)}
                                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete booking"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-xs text-muted/60 mt-3">
                                    Received: {new Date(booking.created_at).toLocaleString("en-IN")}
                                </p>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
