-- ═══════════════════════════════════════════════════════════
-- SEED DATA — Yagna Wedding Photography Platform
-- ═══════════════════════════════════════════════════════════
-- Run this AFTER schema.sql to populate the database with sample data.
-- Execute in Supabase SQL Editor.

-- ── Sample Packages ──────────────────────────────────────

INSERT INTO public.packages (title, price, description, category, features, is_team_package, sort_order) VALUES
(
  'Silver',
  15000,
  'Perfect for intimate ceremonies and small gatherings',
  'Freelancer',
  '["4 Hours Coverage", "100+ Edited Photos", "Online Gallery", "1 Photographer"]',
  false,
  1
),
(
  'Gold',
  25000,
  'Our most popular package for full-day coverage',
  'Freelancer',
  '["8 Hours Coverage", "300+ Edited Photos", "Online Gallery", "Highlight Reel", "1 Photographer", "Pre-Wedding Shoot"]',
  false,
  2
),
(
  'Platinum',
  45000,
  'Premium coverage with cinematic videography',
  'Team',
  '["Full Day Coverage", "500+ Edited Photos", "Online Gallery", "Cinematic Video", "2 Photographers", "1 Videographer", "Drone Shots", "Pre-Wedding Shoot", "Photo Album"]',
  true,
  3
),
(
  'Royal',
  75000,
  'The ultimate wedding documentation experience',
  'Team',
  '["Multi-Day Coverage", "1000+ Edited Photos", "Cinematic Film", "3 Photographers", "2 Videographers", "Drone", "Same-Day Edit", "Premium Photo Album", "Canvas Prints", "Pre & Post Wedding"]',
  true,
  4
);

-- ── Sample Site Content ──────────────────────────────────

INSERT INTO public.site_content (key, value) VALUES
('hero_title', 'Capturing Your Most Precious Moments'),
('hero_subtitle', 'Award-winning wedding photography that tells your unique love story'),
('about_title', 'Our Story'),
('about_description', 'With over 8 years of experience capturing love stories across India, Smritikana Photography brings an artistic eye and a personal touch to every wedding we document. We believe every couple deserves photos that make them feel the emotions all over again.'),
('services_description', 'From intimate ceremonies to grand celebrations, we offer comprehensive photography and videography services tailored to your vision.'),
('contact_info', 'Studio: Kolkata, West Bengal, India\nPhone: +91 98765 43210\nEmail: hello@smritikana.com\nHours: Mon-Sat 10AM-7PM')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();

-- ── Verification Query ───────────────────────────────────
-- Run this to confirm data was inserted:
-- SELECT 'packages' as table_name, count(*) as row_count FROM packages
-- UNION ALL
-- SELECT 'site_content', count(*) FROM site_content;
