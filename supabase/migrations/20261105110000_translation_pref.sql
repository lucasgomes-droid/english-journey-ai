-- Fase 3: preferência de tradução em português (liga/desliga).
alter table public.profiles add column if not exists show_translation boolean not null default true;
notify pgrst, 'reload schema';
