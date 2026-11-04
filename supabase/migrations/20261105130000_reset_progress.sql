-- Opção "Recomeçar do zero" no perfil: o aluno pode apagar o próprio progresso.
-- As regras de acesso (RLS "own rows") já limitam cada aluno às próprias linhas.
grant delete on public.exam_attempts, public.recovery_plans, public.exam_sessions, public.practice_plans to authenticated;
notify pgrst, 'reload schema';
