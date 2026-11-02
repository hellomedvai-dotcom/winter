-- ==============================================================================
-- MEDVIDHI: Waitlist Aggregate Counter & Automatic +6 Progress Metric Migration
-- Description:
--   1. Creates an internal `waitlist_progress_metric` singleton table (RLS enabled,
--      no direct public access).
--   2. Adds an atomic trigger on `waitlist_signups` that increments the progress
--      counter by exactly +6 units within the same transaction as an accepted registration.
--   3. Enforces case-insensitive email uniqueness on `waitlist_signups`.
--   4. Exposes safe, read-only RPC functions:
--      - `get_waitlist_count()`: returns total confirmed unique members (1 person = 1 count).
--      - `get_waitlist_progress_counter()`: returns confirmed development progress units (+6 per person).
-- ==============================================================================

-- 1. Progress Metric Singleton Table (Hidden from public read/write)
create table if not exists public.waitlist_progress_metric (
  id integer primary key default 1 check (id = 1),
  progress_count integer not null default 0,
  updated_at timestamptz not null default now()
);

-- Secure table with RLS - revoke direct public table access
alter table public.waitlist_progress_metric enable row level security;
revoke all on table public.waitlist_progress_metric from public, anon, authenticated;

-- 2. Case-insensitive Unique Index on waitlist_signups email
create unique index if not exists waitlist_signups_lower_email_idx
on public.waitlist_signups (lower(trim(email)));

-- 3. Atomic +6 Trigger Function
create or replace function public.handle_waitlist_signup_increment()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Atomically increment singleton counter by 6 in the same transaction as the insert
  insert into public.waitlist_progress_metric (id, progress_count, updated_at)
  values (1, 6, now())
  on conflict (id)
  do update set
    progress_count = public.waitlist_progress_metric.progress_count + 6,
    updated_at = now();

  return new;
end;
$$;

-- 4. Attach Trigger to waitlist_signups
drop trigger if exists trg_waitlist_signup_increment on public.waitlist_signups;
create trigger trg_waitlist_signup_increment
after insert on public.waitlist_signups
for each row
execute function public.handle_waitlist_signup_increment();

-- 5. Safe Read-Only RPC to query confirmed unique waitlist members count
-- (Returns ONLY aggregate count; no individual emails, names or rows exposed)
create or replace function public.get_waitlist_count()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count integer;
begin
  select count(distinct lower(trim(email))) into v_count
  from public.waitlist_signups;

  return coalesce(v_count, 0);
end;
$$;

revoke all on function public.get_waitlist_count() from public;
grant execute on function public.get_waitlist_count() to anon, authenticated;

-- 6. Safe Read-Only RPC function to query the confirmed progress counter (+6 units/person)
create or replace function public.get_waitlist_progress_counter()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_counter integer;
begin
  select progress_count into v_counter
  from public.waitlist_progress_metric
  where id = 1;

  return coalesce(v_counter, 0);
end;
$$;

revoke all on function public.get_waitlist_progress_counter() from public;
grant execute on function public.get_waitlist_progress_counter() to anon, authenticated;

-- 7. Initialize baseline progress value from any existing unique registrations * 6 (or 0)
insert into public.waitlist_progress_metric (id, progress_count, updated_at)
select 1, coalesce(count(distinct lower(trim(email))) * 6, 0), now()
from public.waitlist_signups
on conflict (id) do nothing;
