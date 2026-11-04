-- Prática livre: listening A1–C2, mini-aulas e conversas com personagens.
-- Idempotente: pode ser executado mais de uma vez.

-- Resultados dos exercícios de listening
create table if not exists public.listening_results (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  item_id text not null,
  level_code text not null references public.levels(code),
  score int not null,
  total int not null,
  dictation_correct boolean,
  created_at timestamptz not null default now()
);
create index if not exists listening_results_user_idx on public.listening_results(user_id, created_at desc);
alter table public.listening_results enable row level security;
drop policy if exists "own rows" on public.listening_results;
create policy "own rows" on public.listening_results for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
grant select, insert, update, delete on public.listening_results to authenticated;

-- Novos tipos de atividade
alter table public.activity_log drop constraint if exists activity_log_kind_check;
alter table public.activity_log add constraint activity_log_kind_check
  check (kind in ('lesson','test','review','chat','pronunciation','scenario','listening','mini'));

-- Conversas com personagem: situação personalizada ("Crie o seu")
alter table public.conversations add column if not exists custom_prompt text;

-- Atualiza o cache de esquema da API (PostgREST) imediatamente.
notify pgrst, 'reload schema';
