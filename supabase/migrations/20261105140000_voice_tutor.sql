-- Professor particular por voz: modo da conversa, memória do aluno, frases para repetir e tempo de resposta.
alter table public.conversations add column if not exists tutor_mode text check (tutor_mode in ('livre','professor','imersao'));
alter table public.conversations add column if not exists memory text;
alter table public.messages add column if not exists practice jsonb;
alter table public.messages add column if not exists response_ms int;
notify pgrst, 'reload schema';
