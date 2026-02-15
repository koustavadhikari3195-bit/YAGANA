# ═══════════════════════════════════════════════════════════
# SETUP GUIDE — Yagna Wedding Photography Platform
# ═══════════════════════════════════════════════════════════

## Prerequisites
- Node.js v18+ (https://nodejs.org)
- A Supabase account (https://app.supabase.com)
- Git (optional)

---

## Step 1: Install Dependencies
```bash
cd f:\Yagna_Website
npm install
```

## Step 2: Configure Supabase

### 2a. Create a Supabase Project
1. Go to https://app.supabase.com
2. Click "New Project"
3. Choose a name and set a database password
4. Wait for the project to provision

### 2b. Get Your API Keys
1. Go to **Settings → API** in your project dashboard
2. Copy these values into `.env.local`:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

### 2c. Apply the Database Schema
1. Go to **SQL Editor** in Supabase Dashboard
2. Open `supabase/schema.sql` from this project
3. Copy the entire contents and paste into the SQL Editor
4. Click **Run** — this creates all tables, RLS policies, and storage buckets

### 2d. Create the Admin User
1. Go to **Auth → Users** in Supabase Dashboard
2. Click **Add User → Create New User**
3. Enter:
   - Email: `owner@smritikana.com` (must match `ADMIN_EMAIL` in `.env.local`)
   - Password: Choose a strong password
4. Click **Create User**

## Step 3: Run the Development Server
```bash
npm run dev
```
Open http://localhost:3000

## Step 4: Verify Admin Access
1. Go to http://localhost:3000/admin
2. You should be redirected to `/admin/login`
3. Login with the email/password from Step 2d
4. You should see the Admin Dashboard

---

## Project Structure

```
f:\Yagna_Website\
├── app/
│   ├── (public)/          # Public pages (Home, Gallery, etc.)
│   ├── admin/             # Admin dashboard (protected)
│   ├── actions/           # Server actions (gallery, packages, files, content)
│   ├── globals.css        # Theme & design system
│   └── layout.tsx         # Root layout
├── components/            # Shared components (Navbar, Footer)
├── lib/
│   ├── supabase/          # Supabase client utilities
│   ├── logger.ts          # Error logging utility
│   ├── error-boundary.tsx # React error boundary
│   ├── types.ts           # TypeScript types
│   └── utils.ts           # Utility functions
├── supabase/
│   ├── schema.sql         # Database schema + RLS + Storage
│   └── seed.sql           # Sample data for development
├── docs/
│   ├── QA_ERROR_LOG.md    # QA error log & test checklist
│   └── SETUP.md           # This file
├── middleware.ts           # Auth middleware for admin routes
├── .env.local             # Environment variables (private)
├── .env.example           # Environment template (safe to commit)
└── package.json           # Dependencies & scripts
```

---

## Useful Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Production build (type checking) |
| `npm run start` | Run production build |
| `npm run lint` | Run ESLint |
