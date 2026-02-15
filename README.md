# Yagna Wedding Photography Platform 📸✨

A high-end, premium wedding photography platform built with **Next.js 15**, **GSAP**, **Three.js**, and **Supabase**.

## 🌟 Key Features

- **Cinematic GSAP Animations**: Fully responsive, scroll-driven scrollytelling experiences across all major pages (Hero, Gallery, Films, Services).
- **Premium UX Polish**: Dark-mode optimized architecture with custom typography (Outfit + Playfair Display), amber-gold accents, and smooth interactive glows.
- **Dynamic Content Layer**: All site content is centralized in `lib/site-data.ts` for easy maintenance.
- **Full-Stack Integration**: Supabase-powered backend for gallery management, bookings, and site content.
- **Performance Optimized**: Built using Next.js 15 App Router with high-performance asset preloading and custom Lenis smooth scrolling.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + Vanilla CSS
- **Animations**: GSAP (ScrollTrigger, Flip), Framer Motion
- **3D Graphics**: Three.js (React Three Fiber)
- **Backend/DB**: Supabase
- **Typography**: Outfit, Playfair Display, Inter

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/koustavadhikari3195-bit/YAGANA.git
cd YAGANA
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local` and fill in your Supabase credentials:
```bash
cp .env.example .env.local
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the results.

## 📁 Architecture

- `/app`: Next.js 15 App Router pages and layouts.
- `/components`: Modular UI components and Three.js scenes.
- `/lib`: Site data, Supabase client, and utility functions.
- `/public`: Static assets and icons.

## 📄 License

This project is private and owned by **Koustav Adhikari**.
