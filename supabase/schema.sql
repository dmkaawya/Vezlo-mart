-- STARTER ONLY: review and test in a development Supabase project before production.
create extension if not exists pgcrypto;
create table if not exists public.products(
 id uuid primary key default gen_random_uuid(), sku text unique not null, slug text unique not null,
 name text not null, brand text, category text not null, description text not null default '',
 features jsonb not null default '[]'::jsonb, price numeric(12,2) not null check(price>=0),
 compare_at_price numeric(12,2), stock integer not null default 0 check(stock>=0),
 status text not null default 'draft' check(status in('draft','active','archived')),
 images jsonb not null default '[]'::jsonb, videos jsonb not null default '[]'::jsonb,
 reseller_enabled boolean not null default false, reseller_price numeric(12,2),
 delivery_fee numeric(12,2) not null default 0 check(delivery_fee>=0),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.profiles(
 user_id uuid primary key references auth.users(id) on delete cascade,
 display_name text, phone text, account_type text not null default 'customer' check(account_type in('customer','reseller')),
 created_at timestamptz not null default now()
);
create table if not exists public.orders(
 id uuid primary key default gen_random_uuid(),
 order_number text unique not null default ('VZ-'||upper(substr(replace(gen_random_uuid()::text,'-',''),1,10))),
 user_id uuid references auth.users(id) on delete set null,
 status text not null default 'pending' check(status in('pending','confirmed','processing','shipped','delivered','cancelled','refunded')),
 customer_name text not null, phone text not null, email text, delivery_address text not null, district text not null,
 payment_method text not null check(payment_method in('COD','Bank deposit','Online')),
 subtotal numeric(12,2) not null check(subtotal>=0), delivery_fee numeric(12,2) not null default 0 check(delivery_fee>=0),
 total numeric(12,2) not null check(total>=0), created_at timestamptz not null default now()
);
create table if not exists public.order_items(
 id uuid primary key default gen_random_uuid(), order_id uuid not null references public.orders(id) on delete cascade,
 product_id uuid references public.products(id) on delete set null, sku_snapshot text not null, name_snapshot text not null,
 unit_price numeric(12,2) not null check(unit_price>=0), quantity integer not null check(quantity>0),
 line_total numeric(12,2) not null check(line_total>=0)
);
create table if not exists public.staff_roles(
 user_id uuid primary key references auth.users(id) on delete cascade, role text not null check(role in('staff','admin')),
 created_at timestamptz not null default now()
);
alter table public.products enable row level security;
alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.staff_roles enable row level security;
drop policy if exists "Public read active products" on public.products;
create policy "Public read active products" on public.products for select to anon,authenticated using(status='active');
drop policy if exists "Read own profile" on public.profiles;
create policy "Read own profile" on public.profiles for select to authenticated using(auth.uid()=user_id);
drop policy if exists "Insert own customer profile" on public.profiles;
create policy "Insert own customer profile" on public.profiles for insert to authenticated with check(auth.uid()=user_id and account_type='customer');
drop policy if exists "Read own orders" on public.orders;
create policy "Read own orders" on public.orders for select to authenticated using(auth.uid()=user_id);
drop policy if exists "Read own order items" on public.order_items;
create policy "Read own order items" on public.order_items for select to authenticated using(exists(select 1 from public.orders o where o.id=order_id and o.user_id=auth.uid()));
-- Intentionally no browser insert/update/delete policies for products/orders/staff_roles.
-- Build reviewed server-side functions for staff management and order creation; reprice and check stock server-side.
