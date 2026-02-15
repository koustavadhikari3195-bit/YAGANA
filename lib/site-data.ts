/* ═══════════════════════════════════════════════════
   SITE DATA — CMS-Lite Content Layer
   ═══════════════════════════════════════════════════
   Edit this single file to update gallery images,
   weddings, films, testimonials, and services across
   the entire site — no page edits needed.
   ═══════════════════════════════════════════════════ */

import {
    Camera, Heart, Users, Baby, Building2, Film, Flower2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ─── Types ─── */

export interface GalleryImage {
    id: number;
    src: string;
    alt: string;
    category: "Portrait" | "Bride" | "Groom" | "Events" | "Pre-Wedding" | "Candid";
    featured?: boolean;
}

export interface Wedding {
    couple: string;
    style: string;
    image: string;
    desc: string;
}

export interface FilmEntry {
    id: number;
    couple: string;
    venue: string;
    thumbnail: string;
    duration: string;
    style: string;
}

export interface Testimonial {
    name: string;
    text: string;
    rating: number;
    highlight: string;
    event?: string;
}

export interface ServiceItem {
    icon: LucideIcon;
    title: string;
    desc: string;
    image: string;
    highlights?: string[];
}

/* ═══════════════════════════════════════════
   GALLERY IMAGES
   ═══════════════════════════════════════════ */

export const galleryImages: GalleryImage[] = [
    { id: 1, src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop", alt: "Wedding couple at sunset", category: "Portrait", featured: true },
    { id: 2, src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=400&fit=crop", alt: "Bridal portrait", category: "Bride", featured: true },
    { id: 3, src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop", alt: "Wedding ceremony", category: "Events", featured: true },
    { id: 4, src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=400&fit=crop", alt: "Couple dancing", category: "Events" },
    { id: 5, src: "https://images.unsplash.com/photo-1595407753234-0882f1e77954?w=600&h=400&fit=crop", alt: "Wedding rings", category: "Portrait" },
    { id: 6, src: "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=600&h=400&fit=crop", alt: "Bride getting ready", category: "Bride", featured: true },
    { id: 7, src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=400&fit=crop", alt: "Pre-wedding in mountains", category: "Pre-Wedding" },
    { id: 8, src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&h=400&fit=crop", alt: "Groom getting ready", category: "Groom" },
    { id: 9, src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=400&fit=crop", alt: "Candid ceremony moment", category: "Candid" },
    { id: 10, src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&h=400&fit=crop", alt: "Wedding reception", category: "Events" },
    { id: 11, src: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&h=400&fit=crop", alt: "Bridal mehndi", category: "Bride" },
    { id: 12, src: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=600&h=400&fit=crop", alt: "Ring ceremony", category: "Events" },
];

/* ═══════════════════════════════════════════
   FEATURED WEDDINGS
   ═══════════════════════════════════════════ */

export const featuredWeddings: Wedding[] = [
    {
        couple: "Harshit × Priyanka",
        style: "Kolkata Marwari Wedding",
        image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=500&fit=crop",
        desc: "A grand Marwari celebration with traditional rituals and royal décor.",
    },
    {
        couple: "Ayari × Akash",
        style: "Bengali Wedding",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=500&fit=crop",
        desc: "An intimate wedding full of Sindoor Khela and emotional Ashirbaad.",
    },
    {
        couple: "Rig × Sneha",
        style: "Destination · Sikkim",
        image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=500&fit=crop",
        desc: "Breathtaking pre-wedding amidst misty Sikkim mountains.",
    },
];

/* ═══════════════════════════════════════════
   FEATURED FILMS
   ═══════════════════════════════════════════ */

export const featuredFilms: FilmEntry[] = [
    { id: 1, couple: "Priya & Rahul", venue: "The Oberoi Grand, Kolkata", thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=450&fit=crop", duration: "8:24", style: "Cinematic" },
    { id: 2, couple: "Ananya & Arjun", venue: "ITC Sonar, Kolkata", thumbnail: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=450&fit=crop", duration: "12:30", style: "Documentary" },
    { id: 3, couple: "Sneha & Vikram", venue: "Taj Bengal, Kolkata", thumbnail: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=450&fit=crop", duration: "6:45", style: "Short Film" },
    { id: 4, couple: "Meera & Aditya", venue: "Ffort Raichak", thumbnail: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=450&fit=crop", duration: "15:12", style: "Feature" },
    { id: 5, couple: "Ritu & Sanjay", venue: "Vedic Village, Kolkata", thumbnail: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=450&fit=crop", duration: "9:50", style: "Highlight" },
    { id: 6, couple: "Kavita & Rohan", venue: "Hotel Hindusthan, Kolkata", thumbnail: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&h=450&fit=crop", duration: "7:18", style: "Teaser" },
];

/* ═══════════════════════════════════════════
   TESTIMONIALS
   ═══════════════════════════════════════════ */

export const testimonials: Testimonial[] = [
    { name: "Priya & Rahul", text: "Every photo tells our love story with such artistic vision! Rig captured moments we didn't even know happened.", rating: 5, highlight: "Rig Biswas", event: "Wedding" },
    { name: "Ananya & Arjun", text: "Every moment was captured perfectly. Outstanding professionalism from start to finish.", rating: 5, highlight: "Professionalism", event: "Wedding" },
    { name: "Sneha & Vikram", text: "The candid shots are our favorites — pure magic in every frame. Can't recommend enough!", rating: 5, highlight: "Candid Magic", event: "Pre-Wedding" },
    { name: "Moumita & Sourav", text: "Premium quality at a budget-friendly price. True value for money and incredible dedication.", rating: 5, highlight: "Value for Money", event: "Wedding" },
    { name: "Tanya & Rajesh", text: "The wedding film made us cry. It captured the essence of our day perfectly.", rating: 5, highlight: "Wedding Film", event: "Wedding" },
    { name: "Deepika & Sameer", text: "His eye for detail is remarkable. Every emotion, every glance — nothing was missed.", rating: 5, highlight: "Eye for Detail", event: "Bengali Wedding" },
];

/* ═══════════════════════════════════════════
   SERVICES
   ═══════════════════════════════════════════ */

export const services: ServiceItem[] = [
    {
        icon: Camera,
        title: "Wedding Photography",
        desc: "Complete ceremony & reception coverage with cinematic storytelling. From Haldi to Vidaai, every ritual documented with artistry.",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop",
        highlights: ["Full-day coverage", "200+ edited photos", "Online gallery", "Album design"],
    },
    {
        icon: Users,
        title: "Pre-Wedding Shoots",
        desc: "Romantic sessions at stunning indoor and outdoor locations across Kolkata and beyond.",
        image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=400&fit=crop",
        highlights: ["Location scouting", "Outfit changes", "Creative concepts", "Same-day preview"],
    },
    {
        icon: Heart,
        title: "Candid Photography",
        desc: "Natural, spontaneous shots capturing genuine emotions and unscripted moments.",
        image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=400&fit=crop",
        highlights: ["Quiet storytelling", "No posed shots", "Real emotions", "Detailed moments"],
    },
    {
        icon: Baby,
        title: "Maternity & Baby",
        desc: "Tender portraits celebrating new beginnings — from baby bumps to first smiles.",
        image: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=600&h=400&fit=crop",
        highlights: ["Home or studio", "Parent guidance", "Props included", "Soft editing"],
    },
    {
        icon: Flower2,
        title: "Rice Ceremony",
        desc: "Beautiful Annaprashana coverage preserving traditions and family joy.",
        image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=400&fit=crop",
        highlights: ["Ritual coverage", "Family portraits", "Decoration shots", "Quick turnaround"],
    },
    {
        icon: Building2,
        title: "Corporate & Interior",
        desc: "Professional event coverage, headshots, and architectural photography for businesses.",
        image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&h=400&fit=crop",
        highlights: ["Event coverage", "Product photography", "Team headshots", "Architecture shots"],
    },
    {
        icon: Film,
        title: "Wedding Films",
        desc: "Cinematic videos with creative cuts, drone shots, and emotional storytelling.",
        image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&h=400&fit=crop",
        highlights: ["4K cinematic", "Highlight reels", "Full ceremony", "Drone footage"],
    },
];

/* ═══════════════════════════════════════════
   STATS
   ═══════════════════════════════════════════ */

export const stats = [
    { icon: Camera, value: "500+", label: "Weddings Shot" },
    { icon: Heart, value: "1200+", label: "Happy Couples" },
    { icon: Building2, value: "15+", label: "Years Experience" },
    { icon: Film, value: "50K+", label: "Photos Delivered" },
];

/* ═══════════════════════════════════════════
   FAQs
   ═══════════════════════════════════════════ */

export const faqs = [
    { q: "How do I book a session?", a: "Fill out our booking form, message on WhatsApp, or call directly. Book 3-6 months in advance for wedding dates." },
    { q: "Do you travel for destination shoots?", a: "Yes! We've shot in Sikkim, Darjeeling, Manali, Goa, Rajasthan, and more." },
    { q: "Can I customize my package?", a: "All packages are fully customizable — coverage hours, photographers, albums, and add-ons." },
    { q: "How long to receive photos?", a: "Preview gallery in 1-2 weeks. Complete collection in 4-6 weeks." },
    { q: "Do you offer videography?", a: "Yes — highlight reels, ceremony coverage, and cinematic cuts." },
];
