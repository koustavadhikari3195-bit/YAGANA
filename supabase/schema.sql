-- ============================================
-- Yagna Wedding Photography Platform
-- Supabase Database Schema
-- ============================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================
-- 1. PACKAGES TABLE (Editable Pricing)
-- ============================================
create table packages (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  price numeric not null,
  description text,
  category text check (category in ('Freelancer', 'Team')),
  features jsonb default '[]'::jsonb,
  is_team_package boolean default false,
  sort_order integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- ============================================
-- 2. MEDIA_ASSETS TABLE (Gallery)
-- ============================================
create table media_assets (
  id uuid default uuid_generate_v4() primary key,
  storage_path text not null,
  thumbnail_path text,
  category text check (category in ('Portrait', 'Bride', 'Groom', 'Events')),
  is_featured boolean default false,
  alt_text text,
  file_size bigint,
  upload_date timestamp with time zone default now()
);

-- ============================================
-- 3. SITE_CONTENT TABLE (CMS Key-Value)
-- ============================================
create table site_content (
  key text primary key,
  value text not null,
  updated_at timestamp with time zone default now()
);

-- Seed initial content keys
insert into site_content (key, value) values
  ('about_title', 'About Yagna Photography'),
  ('about_description', 'We capture your most precious moments with artistry and emotion. Every frame tells a story of love, joy, and celebration.'),
  ('services_description', 'From intimate ceremonies to grand celebrations, we offer comprehensive photography packages tailored to your unique vision.'),
  ('hero_title', 'Capturing Timeless Moments'),
  ('hero_subtitle', 'Wedding Photography That Tells Your Love Story'),
  ('contact_info', 'Get in touch with us for your special day');

-- ============================================
-- 4. FILES TABLE (Downloadable PDFs)
-- ============================================
create table files (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  storage_path text not null,
  file_size bigint,
  mime_type text default 'application/pdf',
  upload_date timestamp with time zone default now()
);

-- ============================================
-- 5. ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
alter table packages enable row level security;
alter table media_assets enable row level security;
alter table site_content enable row level security;
alter table files enable row level security;

-- PACKAGES: Public read, Admin write
create policy "Public can read packages" on packages
  for select using (true);

create policy "Admin can insert packages" on packages
  for insert with check (auth.email() = 'hello@yagna.com');

create policy "Admin can update packages" on packages
  for update using (auth.email() = 'hello@yagna.com');

create policy "Admin can delete packages" on packages
  for delete using (auth.email() = 'hello@yagna.com');

-- MEDIA_ASSETS: Public read, Admin write
create policy "Public can read media" on media_assets
  for select using (true);

create policy "Admin can insert media" on media_assets
  for insert with check (auth.email() = 'hello@yagna.com');

create policy "Admin can update media" on media_assets
  for update using (auth.email() = 'hello@yagna.com');

create policy "Admin can delete media" on media_assets
  for delete using (auth.email() = 'hello@yagna.com');

-- SITE_CONTENT: Public read, Admin write
create policy "Public can read content" on site_content
  for select using (true);

create policy "Admin can insert content" on site_content
  for insert with check (auth.email() = 'hello@yagna.com');

create policy "Admin can update content" on site_content
  for update using (auth.email() = 'hello@yagna.com');

create policy "Admin can delete content" on site_content
  for delete using (auth.email() = 'hello@yagna.com');

-- FILES: Public read, Admin write
create policy "Public can read files" on files
  for select using (true);

create policy "Admin can insert files" on files
  for insert with check (auth.email() = 'hello@yagna.com');

create policy "Admin can update files" on files
  for update using (auth.email() = 'hello@yagna.com');

create policy "Admin can delete files" on files
  for delete using (auth.email() = 'hello@yagna.com');

-- ============================================
-- 6. STORAGE BUCKETS (run in Supabase dashboard)
-- ============================================
-- Create these buckets via Supabase Dashboard > Storage:
-- 1. 'gallery' - for wedding photos (public)
-- 2. 'thumbnails' - for auto-generated thumbnails (public)
-- 3. 'files' - for PDF brochures (public)

-- Storage policies (run in SQL Editor):
insert into storage.buckets (id, name, public) values ('gallery', 'gallery', true);
insert into storage.buckets (id, name, public) values ('thumbnails', 'thumbnails', true);
insert into storage.buckets (id, name, public) values ('files', 'files', true);

-- Gallery bucket policies
create policy "Public can view gallery" on storage.objects
  for select using (bucket_id = 'gallery');

create policy "Admin can upload to gallery" on storage.objects
  for insert with check (bucket_id = 'gallery' and auth.email() = 'hello@yagna.com');

create policy "Admin can delete from gallery" on storage.objects
  for delete using (bucket_id = 'gallery' and auth.email() = 'hello@yagna.com');

-- Thumbnails bucket policies
create policy "Public can view thumbnails" on storage.objects
  for select using (bucket_id = 'thumbnails');

create policy "Admin can upload thumbnails" on storage.objects
  for insert with check (bucket_id = 'thumbnails' and auth.email() = 'hello@yagna.com');

create policy "Admin can delete thumbnails" on storage.objects
  for delete using (bucket_id = 'thumbnails' and auth.email() = 'hello@yagna.com');

-- Files bucket policies
create policy "Public can view files" on storage.objects
  for select using (bucket_id = 'files');

create policy "Admin can upload files" on storage.objects
  for insert with check (bucket_id = 'files' and auth.email() = 'hello@yagna.com');

create policy "Admin can delete files" on storage.objects
  for delete using (bucket_id = 'files' and auth.email() = 'hello@yagna.com');

-- ============================================
-- 7. BOOKINGS TABLE (Client Inquiries)
-- ============================================
create table bookings (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  phone text not null,
  event_date date not null,
  event_type text check (event_type in ('Wedding', 'Pre-Wedding', 'Commercial', 'Other')),
  location text not null,
  budget text not null,
  message text default '',
  status text check (status in ('pending', 'confirmed', 'completed')) default 'pending',
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table bookings enable row level security;

-- Public can submit bookings
create policy "Public can insert bookings" on bookings
  for insert with check (true);

-- Admin can read all bookings
create policy "Admin can read bookings" on bookings
  for select using (auth.email() = 'hello@yagna.com');

-- Admin can update bookings
create policy "Admin can update bookings" on bookings
  for update using (auth.email() = 'hello@yagna.com');

-- Admin can delete bookings
create policy "Admin can delete bookings" on bookings
  for delete using (auth.email() = 'hello@yagna.com');

-- Index on event_date for conflict checking
create index idx_bookings_event_date on bookings (event_date);
