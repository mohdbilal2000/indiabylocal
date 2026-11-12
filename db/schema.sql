-- Run with: npm run db:migrate
create table if not exists operators (
  id            uuid primary key default gen_random_uuid(),
  email         text not null unique,
  password_hash text not null,
  business_name text not null,
  contact_name  text not null,
  phone         text not null,
  base_city     text not null,
  licence_no    text,
  status        text not null default 'pending'
                check (status in ('pending', 'verified', 'suspended')),
  created_at    timestamptz not null default now()
);

create table if not exists sessions (
  token_hash  text primary key,
  operator_id uuid not null references operators (id),
  expires_at  timestamptz not null
);
create index if not exists sessions_operator_idx on sessions (operator_id);

create table if not exists listings (
  id             uuid primary key default gen_random_uuid(),
  operator_id    uuid not null references operators (id),
  destination    text not null,
  title          text not null check (char_length(title) between 10 and 60),
  summary        text not null,
  duration_hours numeric(4, 1) not null check (duration_hours > 0 and duration_hours <= 16),
  start_time     text not null check (start_time ~ '^[0-2][0-9]:[0-5][0-9]$'),
  price_inr      integer not null check (price_inr > 0),
  max_group      integer not null default 8 check (max_group between 1 and 30),
  meeting_point  text not null,
  highlights     text not null default '',
  included       text not null default '',
  status         text not null default 'draft'
                 check (status in ('draft', 'submitted', 'published', 'withdrawn')),
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
create index if not exists listings_destination_idx on listings (destination) where status = 'published';
create index if not exists listings_operator_idx on listings (operator_id);

-- Admin review
alter table operators add column if not exists is_admin boolean not null default false;
alter table listings add column if not exists review_note text;

create table if not exists admin_actions (
  id         bigint generated always as identity primary key,
  admin_id   uuid not null references operators (id),
  action     text not null,
  target     text not null,
  note       text,
  created_at timestamptz not null default now()
);

-- Traveller requests. No payment is taken; a person replies by email.
-- Kept identical to CREATE_TABLE in app/booking/actions.ts, which creates it on first use.
create table if not exists booking_requests (
  id          uuid primary key default gen_random_uuid(),
  code        text not null unique,
  tour_ref    text not null,
  title       text not null,
  destination text not null,
  option_name text not null,
  tour_date   date not null,
  people      integer not null check (people between 1 and 30),
  total       integer not null check (total > 0),
  currency    text not null check (currency in ('USD', 'INR')),
  name        text not null,
  email       text not null,
  phone       text,
  note        text,
  status      text not null default 'new' check (status in ('new', 'answered', 'closed')),
  created_at  timestamptz not null default now()
);
create index if not exists booking_requests_created_idx on booking_requests (created_at desc);
