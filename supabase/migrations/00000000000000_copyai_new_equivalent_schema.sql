-- Schema novo e isolado para conteúdo da área de membros.
-- Não armazena credenciais da origem, cookies, tokens ou dados privados.
create extension if not exists pgcrypto;

create table if not exists public.conteudos (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  categoria text,
  descricao text,
  asset_path text,
  ordem integer not null default 0,
  publicado boolean not null default false,
  owner_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists conteudos_publicados_ordem_idx
  on public.conteudos (publicado, ordem);

alter table public.conteudos enable row level security;

drop policy if exists "Conteúdo publicado é legível" on public.conteudos;
create policy "Conteúdo publicado é legível"
  on public.conteudos for select
  using (publicado = true or owner_id = auth.uid());

drop policy if exists "Dono gerencia seus conteúdos" on public.conteudos;
create policy "Dono gerencia seus conteúdos"
  on public.conteudos for all
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

-- Antes de publicar: revisar políticas no Supabase novo e testar com sessão
-- anônima, proprietário e usuário não proprietário. Não reutilize credenciais
-- ou registros da aplicação original.