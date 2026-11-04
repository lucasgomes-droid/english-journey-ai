-- Fase 4: Meu Professor IA e Minhas Dificuldades.
-- Tempo de resposta por exercício (para medir quanto o aluno demora para formular a resposta).
alter table public.exercise_answers add column if not exists response_ms int;

-- Plano de recuperação inteligente por dificuldade (histórico de cada tentativa e o resultado).
create table if not exists public.practice_plans (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null,
  status text not null default 'active' check (status in ('active','improved','not_yet')),
  baseline_rate int,
  steps jsonb not null default '{"studied":false,"drillScore":null,"conversationTurns":0}'::jsonb,
  conversation_id uuid references public.conversations(id) on delete set null,
  result jsonb,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);
create index if not exists practice_plans_user_idx on public.practice_plans(user_id, created_at desc);
alter table public.practice_plans enable row level security;
drop policy if exists "own rows" on public.practice_plans;
create policy "own rows" on public.practice_plans for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
grant select, insert, update on public.practice_plans to authenticated;
notify pgrst, 'reload schema';
