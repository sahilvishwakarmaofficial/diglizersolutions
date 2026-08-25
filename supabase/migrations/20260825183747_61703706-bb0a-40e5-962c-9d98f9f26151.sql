create table if not exists public.insight_guidance (
  category text primary key,
  image_seo text not null,
  recommended_content text not null,
  h2_structure text not null,
  visual_assets text not null,
  internal_links text not null,
  external_links text not null,
  schema_guidance text not null,
  cta text not null,
  refresh_cadence text not null,
  eeat_evidence text not null
);
grant select on public.insight_guidance to anon, authenticated;
grant all on public.insight_guidance to service_role;
alter table public.insight_guidance enable row level security;
create policy "Guidance is public" on public.insight_guidance for select to anon, authenticated using (true);

create table if not exists public.insight_clusters (
  id integer primary key,
  category text not null,
  primary_keyword text not null unique,
  slug text not null unique,
  pillar_title text not null,
  pillar_slug text not null,
  meta_description text not null,
  topic_count integer not null default 0,
  pillar_topic_id integer,
  created_at timestamptz not null default now()
);
grant select on public.insight_clusters to anon, authenticated;
grant all on public.insight_clusters to service_role;
alter table public.insight_clusters enable row level security;
create policy "Clusters are public" on public.insight_clusters for select to anon, authenticated using (true);

create table if not exists public.insight_topics (
  workbook_id integer primary key,
  category text not null,
  h1 text not null,
  primary_keyword text not null,
  search_intent text not null,
  suggested_slug text not null,
  suggested_title text not null,
  suggested_meta_description text not null,
  hero_image_direction text not null,
  variation text not null default 'core',
  cluster_id integer not null references public.insight_clusters(id) on delete cascade,
  pillar_topic_id integer,
  is_pillar boolean not null default false,
  similarity_status text not null default 'Overlapping variation',
  cannibalisation_status text not null default 'Merge into pillar',
  editorial_decision text not null default 'Merge into pillar section',
  content_status text not null default 'Imported Idea',
  publication_status text not null default 'Unpublished',
  notes text not null default '',
  created_at timestamptz not null default now()
);
create index if not exists insight_topics_cluster_idx on public.insight_topics (cluster_id);
create index if not exists insight_topics_category_idx on public.insight_topics (category);
create index if not exists insight_topics_slug_idx on public.insight_topics (suggested_slug);
create index if not exists insight_topics_status_idx on public.insight_topics (content_status, publication_status);
create index if not exists insight_topics_keyword_idx on public.insight_topics (primary_keyword);
grant select on public.insight_topics to anon, authenticated;
grant all on public.insight_topics to service_role;
alter table public.insight_topics enable row level security;
create policy "Topic library is public read" on public.insight_topics for select to anon, authenticated using (true);