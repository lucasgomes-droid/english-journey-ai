-- Fase 1: prova de nível em três partes (escrita, Speaking, Conversation) e plano de recuperação.
-- Idempotente: pode ser executado mais de uma vez.

-- Cada tentativa de uma parte da prova de nível.
create table if not exists public.exam_attempts (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  level_code text not null references public.levels(code),
  part text not null check (part in ('written','speaking','conversation')),
  score int not null check (score between 0 and 100),
  passed boolean not null,
  details jsonb,
  created_at timestamptz not null default now()
);
create index if not exists exam_attempts_user_idx on public.exam_attempts(user_id, level_code, created_at);
alter table public.exam_attempts enable row level security;
drop policy if exists "own rows" on public.exam_attempts;
create policy "own rows" on public.exam_attempts for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
grant select, insert on public.exam_attempts to authenticated;

-- Plano de recuperação criado quando o aluno reprova uma parte. Só pode refazer depois de cumprir.
create table if not exists public.recovery_plans (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  level_code text not null references public.levels(code),
  part text not null check (part in ('written','speaking','conversation')),
  tasks jsonb not null,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);
create index if not exists recovery_plans_user_idx on public.recovery_plans(user_id, level_code);
alter table public.recovery_plans enable row level security;
drop policy if exists "own rows" on public.recovery_plans;
create policy "own rows" on public.recovery_plans for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
grant select, insert, update on public.recovery_plans to authenticated;

-- Conversa da prova (fica separada das conversas de prática).
create table if not exists public.exam_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  level_code text not null references public.levels(code),
  turns jsonb not null default '[]'::jsonb,
  finished boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.exam_sessions enable row level security;
drop policy if exists "own rows" on public.exam_sessions;
create policy "own rows" on public.exam_sessions for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
grant select, insert, update on public.exam_sessions to authenticated;

-- Aulas passam a exigir 70% (domínio), testes de módulo continuam em 70%.
update public.lessons set pass_score = 70 where pass_score = 60;

notify pgrst, 'reload schema';
