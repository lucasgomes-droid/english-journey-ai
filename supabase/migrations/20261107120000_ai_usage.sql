-- M0 — Estabilidade e custo de IA (só acréscimos; nada é apagado).
-- 1) Controle de uso de IA por aluno e por dia.
-- 2) Cache compartilhado de voz natural: cada frase é gerada uma única vez para todos os alunos.

create table if not exists public.ai_usage (
  user_id uuid not null references auth.users(id) on delete cascade,
  day date not null default current_date,
  kind text not null check (kind in ('chat', 'heavy', 'stt', 'tts')),
  requests int not null default 0,
  tokens int not null default 0,
  audio_seconds int not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, day, kind)
);

alter table public.ai_usage enable row level security;
grant select, insert, update on public.ai_usage to authenticated;
do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'ai_usage' and policyname = 'own rows') then
    create policy "own rows" on public.ai_usage for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
  end if;
end $$;

-- Soma o uso de forma atômica (vários pedidos ao mesmo tempo não se perdem).
create or replace function public.bump_ai_usage(p_kind text, p_requests int default 1, p_tokens int default 0, p_audio_seconds int default 0)
returns void
language sql
security invoker
set search_path = public
as $$
  insert into public.ai_usage (user_id, day, kind, requests, tokens, audio_seconds)
  values (auth.uid(), current_date, p_kind, p_requests, p_tokens, p_audio_seconds)
  on conflict (user_id, day, kind) do update
    set requests = ai_usage.requests + excluded.requests,
        tokens = ai_usage.tokens + excluded.tokens,
        audio_seconds = ai_usage.audio_seconds + excluded.audio_seconds,
        updated_at = now();
$$;
grant execute on function public.bump_ai_usage(text, int, int, int) to authenticated;

-- Cache de voz: arquivos de áudio de frases (nenhum dado pessoal). Alunos logados leem e gravam,
-- ninguém altera nem apaga pelo app. O caminho é derivado do texto (hash), então não há conflito.
do $$
begin
  if exists (select 1 from information_schema.tables where table_schema = 'storage' and table_name = 'buckets') then
    insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    values ('tts-cache', 'tts-cache', false, 1048576, array['audio/wav', 'audio/mpeg'])
    on conflict (id) do nothing;
    if not exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'tts cache read') then
      execute $p$create policy "tts cache read" on storage.objects for select to authenticated using (bucket_id = 'tts-cache')$p$;
    end if;
    if not exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'tts cache insert') then
      execute $p$create policy "tts cache insert" on storage.objects for insert to authenticated with check (bucket_id = 'tts-cache')$p$;
    end if;
  end if;
end $$;

notify pgrst, 'reload schema';
