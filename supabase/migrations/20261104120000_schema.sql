-- =====================================================================
-- English Journey AI — esquema do banco (Supabase / PostgreSQL)
-- Execute no Supabase: SQL Editor → cole este arquivo → Run.
-- Depois execute 20261104120100_seed_content.sql (conteúdo das aulas).
-- =====================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- CONTEÚDO (espelho do conteúdo versionado em src/content)
-- ---------------------------------------------------------------------
create table if not exists public.levels (
  code text primary key check (code in ('A1','A2','B1','B2','C1','C2')),
  name text not null,
  description text not null,
  sort int not null
);

create table if not exists public.modules (
  id text primary key,
  level_code text not null references public.levels(code),
  sort int not null,
  title text not null,
  description text not null
);

create table if not exists public.lessons (
  id text primary key,
  module_id text not null references public.modules(id) on delete cascade,
  sort int not null,
  kind text not null check (kind in ('lesson','test')),
  title text not null,
  objective text not null,
  xp int not null,
  pass_score int not null
);

create table if not exists public.vocabulary (
  id text primary key,
  lesson_id text not null references public.lessons(id) on delete cascade,
  en text not null,
  pt text not null,
  pronunciation text not null
);

create table if not exists public.exercises (
  id text primary key,
  lesson_id text not null references public.lessons(id) on delete cascade,
  sort int not null,
  type text not null,
  skill text not null,
  payload jsonb not null
);

-- ---------------------------------------------------------------------
-- ALUNO
-- ---------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  current_level text not null default 'A1' references public.levels(code),
  daily_minutes int not null default 15 check (daily_minutes between 5 and 180),
  daily_goal_xp int not null default 30 check (daily_goal_xp between 10 and 500),
  weekly_goal_lessons int not null default 5 check (weekly_goal_lessons between 1 and 50),
  learning_goal text,
  timezone text not null default 'America/Sao_Paulo',
  xp_total int not null default 0,
  streak_current int not null default 0,
  streak_best int not null default 0,
  last_study_date date,
  onboarded boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.lesson_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id text not null references public.lessons(id) on delete cascade,
  status text not null default 'started' check (status in ('started','completed')),
  best_score int not null default 0,
  last_score int not null default 0,
  attempts int not null default 0,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

-- Cada resposta dada pelo aluno (base para identificar dificuldades recorrentes).
create table if not exists public.exercise_answers (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id text not null references public.lessons(id) on delete cascade,
  exercise_id text not null references public.exercises(id) on delete cascade,
  skill text not null,
  answer jsonb not null,
  correct boolean not null,
  created_at timestamptz not null default now()
);
create index if not exists exercise_answers_user_idx on public.exercise_answers(user_id, created_at desc);

-- Avaliações (testes de módulo e de nível).
create table if not exists public.assessments (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id text not null references public.lessons(id) on delete cascade,
  level_code text not null references public.levels(code),
  score int not null,
  passed boolean not null,
  created_at timestamptz not null default now()
);

-- Repetição espaçada (SM-2). item_type: vocab | exercise | pronunciation | grammar
create table if not exists public.review_items (
  user_id uuid not null references auth.users(id) on delete cascade,
  item_type text not null check (item_type in ('vocab','exercise','pronunciation','grammar')),
  item_id text not null,
  ease numeric(4,2) not null default 2.5,
  interval_days int not null default 0,
  repetitions int not null default 0,
  lapses int not null default 0,
  due_at timestamptz not null default now(),
  last_reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  primary key (user_id, item_type, item_id)
);
create index if not exists review_items_due_idx on public.review_items(user_id, due_at);

-- Linha do tempo de estudo (XP, tempo, histórico).
create table if not exists public.activity_log (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null check (kind in ('lesson','test','review','chat','pronunciation','scenario')),
  ref text,
  title text not null,
  xp int not null default 0,
  duration_seconds int not null default 0,
  score int,
  local_date date not null,
  created_at timestamptz not null default now()
);
create index if not exists activity_log_user_idx on public.activity_log(user_id, created_at desc);

create table if not exists public.achievements (
  user_id uuid not null references auth.users(id) on delete cascade,
  code text not null,
  earned_at timestamptz not null default now(),
  primary key (user_id, code)
);

-- Conversas com o professor de IA e personagens dos cenários.
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  mode text not null default 'tutor' check (mode in ('tutor','scenario')),
  scenario_id text,
  lesson_id text references public.lessons(id) on delete set null,
  level_code text not null references public.levels(code),
  title text not null default 'Nova conversa',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists conversations_user_idx on public.conversations(user_id, updated_at desc);

create table if not exists public.messages (
  id bigint generated always as identity primary key,
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('user','assistant')),
  content text not null,
  -- Correção estruturada da mensagem do aluno: {original, corrected, explanation_pt}
  correction jsonb,
  -- Dica de expressão natural dada pelo professor.
  tip text,
  via_voice boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.messages add column if not exists tip text;
create index if not exists messages_conv_idx on public.messages(conversation_id, id);

-- Avaliações de pronúncia (preparado para a Etapa 4).
create table if not exists public.pronunciation_attempts (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  reference_text text not null,
  provider text not null,
  overall numeric(5,2),
  accuracy numeric(5,2),
  fluency numeric(5,2),
  completeness numeric(5,2),
  prosody numeric(5,2),
  details jsonb,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- PERFIL AUTOMÁTICO NO CADASTRO
-- ---------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------
-- SEGURANÇA (Row Level Security): cada aluno só vê os próprios dados
-- ---------------------------------------------------------------------
alter table public.levels enable row level security;
alter table public.modules enable row level security;
alter table public.lessons enable row level security;
alter table public.vocabulary enable row level security;
alter table public.exercises enable row level security;
alter table public.profiles enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.exercise_answers enable row level security;
alter table public.assessments enable row level security;
alter table public.review_items enable row level security;
alter table public.activity_log enable row level security;
alter table public.achievements enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.pronunciation_attempts enable row level security;

-- Conteúdo: leitura para usuários autenticados.
do $$
declare t text;
begin
  foreach t in array array['levels','modules','lessons','vocabulary','exercises'] loop
    execute format('drop policy if exists "read content" on public.%I', t);
    execute format('create policy "read content" on public.%I for select to authenticated using (true)', t);
  end loop;
end $$;

drop policy if exists "own profile select" on public.profiles;
create policy "own profile select" on public.profiles for select to authenticated using (id = auth.uid());
drop policy if exists "own profile update" on public.profiles;
create policy "own profile update" on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

-- Tabelas do aluno: CRUD apenas nas próprias linhas.
do $$
declare t text;
begin
  foreach t in array array['lesson_progress','exercise_answers','assessments','review_items','activity_log','achievements','conversations','messages','pronunciation_attempts'] loop
    execute format('drop policy if exists "own rows" on public.%I', t);
    execute format('create policy "own rows" on public.%I for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid())', t);
  end loop;
end $$;
