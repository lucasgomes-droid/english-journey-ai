-- Fase 2: relatório ao fim de cada conversa (o que disse, versão melhor, erros, expressões, nota, sugestão).
-- Idempotente.
alter table public.conversations add column if not exists report jsonb;
alter table public.conversations add column if not exists report_score int;
alter table public.personal_phrases drop constraint if exists personal_phrases_source_check;
alter table public.personal_phrases add constraint personal_phrases_source_check check (source in ('life','speaking','conversation'));
notify pgrst, 'reload schema';
