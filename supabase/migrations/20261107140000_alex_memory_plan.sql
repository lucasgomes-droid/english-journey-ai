-- M2 + M4 — Memória do professor, intensidade da correção e preferências de estudo (só acréscimos).

-- Preferências no perfil (não duplica daily_minutes, learning_goal, current_level, que já existem).
alter table public.profiles add column if not exists correction_intensity text not null default 'normal';
alter table public.profiles add column if not exists study_days smallint[] not null default '{1,2,3,4,5,6,0}'; -- 0 = domingo
alter table public.profiles add column if not exists target_level text;
alter table public.profiles add column if not exists target_date date;
alter table public.profiles add column if not exists daily_review_limit int not null default 20;
alter table public.profiles add column if not exists focus_skills text[] not null default '{}';
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'profiles_correction_intensity_check') then
    alter table public.profiles add constraint profiles_correction_intensity_check check (correction_intensity in ('leve', 'normal', 'intensa'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'profiles_daily_review_limit_check') then
    alter table public.profiles add constraint profiles_daily_review_limit_check check (daily_review_limit between 5 and 100);
  end if;
end $$;

-- O que o professor sabe sobre o aluno (trabalho, interesses, metas...). O aluno vê e apaga no Perfil.
create table if not exists public.learner_facts (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null check (kind in ('work', 'interest', 'goal', 'family', 'place', 'routine', 'preference')),
  value text not null check (char_length(value) between 2 and 120),
  evidence_count int not null default 1,
  created_at timestamptz not null default now(),
  last_seen timestamptz not null default now(),
  unique (user_id, kind, value)
);
create index if not exists learner_facts_user_idx on public.learner_facts(user_id, last_seen desc);
alter table public.learner_facts enable row level security;
grant select, insert, update, delete on public.learner_facts to authenticated;
do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'learner_facts' and policyname = 'own rows') then
    create policy "own rows" on public.learner_facts for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
  end if;
end $$;

notify pgrst, 'reload schema';
