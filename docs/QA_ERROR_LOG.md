# ═══════════════════════════════════════════════════════════
# QA ERROR LOG & DEBUGGING GUIDE
# Yagna Wedding Photography Platform
# ═══════════════════════════════════════════════════════════

## Quick Start for QA

### 1. Start the Dev Server
```bash
cd f:\Yagna_Website
npm run dev
```
Open http://localhost:3000 in your browser.

### 2. Access Error Logs

| Where | How |
|-------|-----|
| **Client errors** | Open Browser DevTools → Console tab. All logs are prefixed with `[timestamp] [LEVEL] [Module]` |
| **Full log buffer** | In DevTools Console, type: `window.__APP_LOGS__` |
| **Error-only logs** | In DevTools Console, type: `window.__APP_LOGS__.filter(l => l.level === "ERROR")` |
| **Server errors** | Check the terminal where `npm run dev` is running |
| **Build errors** | Run `npm run build` and read the output |

### 3. Environment Check
Run this in the browser console to check if env vars are loaded:
```js
console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Set" : "❌ Missing")
console.log("Site Name:", process.env.NEXT_PUBLIC_SITE_NAME || "❌ Missing")
```

---

## Known Issues & Resolutions

| # | Issue | Severity | Module | Status | Resolution |
|---|-------|----------|--------|--------|------------|
| 1 | Supabase keys not configured | BLOCKER | Auth/DB | Open | Add keys to `.env.local` — see `.env.example` for instructions |
| 2 | Admin user not created | BLOCKER | Auth | Open | Create user in Supabase Dashboard → Auth → Users |
| 3 | SQL schema not applied | BLOCKER | DB | Open | Run `supabase/schema.sql` in Supabase SQL Editor |
| 4 | Images show placeholder | LOW | Gallery | Expected | Upload real images via Admin → Gallery Manager |
| 5 | Pricing shows no packages | LOW | Pricing | Expected | Add packages via Admin → Pricing Editor |

---

## Error Codes Reference

| Code Pattern | Module | Meaning | Fix |
|-------------|--------|---------|-----|
| `AuthSessionMissingError` | Auth | No active session | Clear cookies, re-login at `/admin/login` |
| `PGRST301` | Supabase | RLS policy blocked | Check that `ADMIN_EMAIL` matches the logged-in user |
| `StorageApiError: Bucket not found` | Storage | Storage bucket missing | Run the storage bucket section of `schema.sql` |
| `NEXT_NOT_FOUND` | Routing | Page not found | Check file exists in `app/` directory |
| `TypeError: fetch failed` | Network | Supabase unreachable | Verify `NEXT_PUBLIC_SUPABASE_URL` is correct |
| `23505 unique violation` | DB | Duplicate key | Check for existing records with same unique field |

---

## Page Route Map

| Route | Type | Auth Required | File |
|-------|------|---------------|------|
| `/` | Public | No | `app/(public)/page.tsx` |
| `/gallery` | Public | No | `app/(public)/gallery/page.tsx` |
| `/pricing` | Public | No | `app/(public)/pricing/page.tsx` |
| `/about` | Public | No | `app/(public)/about/page.tsx` |
| `/contact` | Public | No | `app/(public)/contact/page.tsx` |
| `/admin/login` | Auth | No | `app/admin/login/page.tsx` |
| `/admin` | Protected | Yes (admin) | `app/admin/page.tsx` |
| `/admin/gallery` | Protected | Yes (admin) | `app/admin/gallery/page.tsx` |
| `/admin/pricing` | Protected | Yes (admin) | `app/admin/pricing/page.tsx` |
| `/admin/files` | Protected | Yes (admin) | `app/admin/files/page.tsx` |
| `/admin/content` | Protected | Yes (admin) | `app/admin/content/page.tsx` |

---

## Test Cases Checklist

### Public Site
- [ ] Home page loads with hero, gallery preview, stats
- [ ] Gallery page filters by category (Portrait, Bride, Groom, Events)
- [ ] Gallery lightbox opens on image click
- [ ] Pricing page displays packages in two categories
- [ ] About page loads with story and values
- [ ] Contact form validates required fields
- [ ] WhatsApp button opens `wa.me` link
- [ ] Navbar is responsive and mobile menu toggles
- [ ] Footer links navigate correctly

### Admin Dashboard
- [ ] `/admin` redirects to `/admin/login` when not authenticated
- [ ] Login with wrong credentials shows error
- [ ] Login with correct admin email succeeds
- [ ] Dashboard shows 4 quick-link cards
- [ ] Gallery: upload via drag-and-drop works
- [ ] Gallery: upload via file picker works
- [ ] Gallery: delete image works
- [ ] Gallery: toggle featured works
- [ ] Gallery: change category works
- [ ] Pricing: create new package works
- [ ] Pricing: edit existing package inline works
- [ ] Pricing: delete package works
- [ ] Files: upload PDF works
- [ ] Files: download link works
- [ ] Files: delete file works
- [ ] Content: edit text and save works
- [ ] Content: unsaved changes indicator appears
- [ ] Logout clears session and redirects to login

### Error Handling
- [ ] Network error shows user-friendly message
- [ ] Invalid file type shows rejection message
- [ ] Error boundary catches component crashes
- [ ] `window.__APP_LOGS__` contains error entries

---

## How to Report a Bug

1. **Reproduce** the issue
2. **Copy the log** from `window.__APP_LOGS__` or terminal
3. Note the **route**, **action taken**, and **expected vs actual** result
4. Add entry to the table above with severity and module

---

_Last updated: 2026-02-14_
