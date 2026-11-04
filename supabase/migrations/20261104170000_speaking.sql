-- Fala livre: desafio de 1 minuto, gravação semanal e frases pessoais ("fale sobre sua vida").
-- Idempotente: pode ser executado mais de uma vez.

create table if not exists public.speaking_sessions (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null check (kind in ('fluency','weekly')),
  topic text not null,
  level_code text references public.levels(code),
  transcript text not null default '',
  seconds numeric(6,1) not null default 0,
  speech_seconds numeric(6,1) not null default 0,
  words int not null default 0,
  unique_words int not null default 0,
  wpm int not null default 0,
  pauses int not null default 0,
  fillers int not null default 0,
  feedback jsonb,
  audio_path text,
  created_at timestamptz not null default now()
);
create index if not exists speaking_sessions_user_idx on public.speaking_sessions(user_id, kind, created_at desc);
alter table public.speaking_sessions enable row level security;
drop policy if exists "own rows" on public.speaking_sessions;
create policy "own rows" on public.speaking_sessions for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
grant select, insert, update, delete on public.speaking_sessions to authenticated;

-- Frases do próprio aluno (sobre a vida dele ou tiradas das correções).
create table if not exists public.personal_phrases (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  topic text not null,
  en text not null,
  pt text not null,
  source text not null default 'life' check (source in ('life','speaking')),
  created_at timestamptz not null default now()
);
create index if not exists personal_phrases_user_idx on public.personal_phrases(user_id, created_at desc);
alter table public.personal_phrases enable row level security;
drop policy if exists "own rows" on public.personal_phrases;
create policy "own rows" on public.personal_phrases for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
grant select, insert, update, delete on public.personal_phrases to authenticated;

-- Revisão das frases pessoais
alter table public.review_items drop constraint if exists review_items_item_type_check;
alter table public.review_items add constraint review_items_item_type_check
  check (item_type in ('vocab','exercise','pronunciation','grammar','phrase'));

-- Novo tipo de atividade
alter table public.activity_log drop constraint if exists activity_log_kind_check;
alter table public.activity_log add constraint activity_log_kind_check
  check (kind in ('lesson','test','review','chat','pronunciation','scenario','listening','mini','speaking'));

-- Áudios das gravações semanais (privados: cada aluno só acessa a própria pasta).
do $$
begin
  if exists (select 1 from information_schema.tables where table_schema = 'storage' and table_name = 'buckets') then
    insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    values ('recordings', 'recordings', false, 5242880, array['audio/wav'])
    on conflict (id) do nothing;
    execute 'drop policy if exists "own recordings read" on storage.objects';
    execute 'drop policy if exists "own recordings insert" on storage.objects';
    execute 'drop policy if exists "own recordings delete" on storage.objects';
    execute $p$create policy "own recordings read" on storage.objects for select to authenticated
      using (bucket_id = 'recordings' and (storage.foldername(name))[1] = auth.uid()::text)$p$;
    execute $p$create policy "own recordings insert" on storage.objects for insert to authenticated
      with check (bucket_id = 'recordings' and (storage.foldername(name))[1] = auth.uid()::text)$p$;
    execute $p$create policy "own recordings delete" on storage.objects for delete to authenticated
      using (bucket_id = 'recordings' and (storage.foldername(name))[1] = auth.uid()::text)$p$;
  end if;
end $$;

notify pgrst, 'reload schema';
