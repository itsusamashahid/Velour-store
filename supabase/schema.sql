-- =========================================================
-- Velour store schema
-- Run this in Supabase: Dashboard -> SQL Editor -> New query -> paste -> Run
-- =========================================================

create table categories (
  id text primary key,
  name text not null,
  color text not null,
  icon text not null
);

create table products (
  id bigint generated always as identity primary key,
  category_id text references categories(id),
  name text not null,
  sku text unique not null,
  price integer not null,
  old_price integer,
  rating numeric(2,1) default 4.5,
  reviews integer default 0,
  badge text,
  in_stock boolean default true,
  variants text[],
  description text,
  image_url text,
  created_at timestamptz default now()
);

create table orders (
  id bigint generated always as identity primary key,
  customer_name text not null,
  phone text not null,
  address text not null,
  city text not null,
  payment_method text not null,
  payment_status text default 'pending',
  subtotal integer not null,
  status text default 'received',
  created_at timestamptz default now()
);

create table order_items (
  id bigint generated always as identity primary key,
  order_id bigint references orders(id) on delete cascade,
  product_id bigint references products(id),
  product_name text not null,
  variant text,
  qty integer not null,
  price integer not null
);

alter table categories enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

create policy "Public can read categories" on categories for select using (true);
create policy "Public can read products" on products for select using (true);
create policy "Public can create orders" on orders for insert with check (true);
create policy "Public can create order items" on order_items for insert with check (true);

-- Categories
insert into categories (id, name, color, icon) values
  ('car', 'Car Perfumes', '#B8892B', 'Wind'),
  ('inspired', 'Inspired Perfumes', '#6B2141', 'Sparkles'),
  ('bodywash', 'Body Wash & Shower Gel', '#2F6B4F', 'Droplet'),
  ('gifts', 'Gift Sets', '#8A5A3B', 'Gift');

-- Starter products — replace/expand these with your real catalog
insert into products (category_id, name, sku, price, old_price, rating, reviews, badge, in_stock, variants) values
  ('car', 'Amber Oud Hanging Car Diffuser', 'CAR-AO-01', 1450, null, 4.8, 132, 'Bestseller', true, null),
  ('car', 'Vent Clip — Fresh Musk', 'CAR-VM-02', 850, null, 4.5, 74, null, true, null),
  ('inspired', 'No. 12 — Oud & Amber (Inspired)', 'INS-12-01', 3200, null, 4.9, 210, 'Bestseller', true, '{"50ml","100ml"}'),
  ('inspired', 'No. 07 — Rose & Musk (Inspired)', 'INS-07-02', 3200, null, 4.7, 96, 'New', true, '{"50ml","100ml"}'),
  ('bodywash', 'Oud & Sandalwood Shower Gel', 'BW-OS-01', 1600, null, 4.6, 58, null, true, null),
  ('bodywash', 'Citrus Neroli Body Wash', 'BW-CN-02', 1600, 1900, 4.5, 41, 'Sale', true, null),
  ('gifts', 'Signature Duo Gift Box', 'GFT-SD-01', 6500, null, 4.9, 37, 'Bestseller', true, null);
