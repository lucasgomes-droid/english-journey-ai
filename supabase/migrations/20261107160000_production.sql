-- M3 — "Use você mesmo": produção livre no fim da aula (escrever ou falar), corrigida pela IA.
-- Conta como evidência de domínio do objetivo da aula. Só acréscimos.
create table if not exists public.production_attempts (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id text not null references public.lessons(id) on delete cascade,
  mode text not null check (mode in ('write', 'speak')),
  text text not null check (char_length(text) between 3 and 1200),
  score int check (score between 0 and 100),
  feedback jsonb,
  created_at timestamptz not null default now()
);
create index if not exists production_attempts_user_idx on public.production_attempts(user_id, created_at desc);
alter table public.production_attempts enable row level security;
grant select, insert, delete on public.production_attempts to authenticated;
do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'production_attempts' and policyname = 'own rows') then
    create policy "own rows" on public.production_attempts for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
  end if;
end $$;

notify pgrst, 'reload schema';
