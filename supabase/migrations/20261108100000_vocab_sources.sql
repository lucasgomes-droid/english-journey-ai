-- Vocabulário: palavras salvas no Listening e na tela de Vocabulário entram no banco pessoal (só amplia a lista).
alter table public.personal_phrases drop constraint if exists personal_phrases_source_check;
alter table public.personal_phrases add constraint personal_phrases_source_check check (source in ('life','speaking','conversation','listening','vocab'));
notify pgrst, 'reload schema';
