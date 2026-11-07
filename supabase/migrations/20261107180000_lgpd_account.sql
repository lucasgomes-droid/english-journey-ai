-- M7 — LGPD: o próprio aluno pode excluir a conta (e, em cascata, todos os seus dados).
-- A função só apaga o usuário que está chamando (auth.uid()); ninguém apaga a conta de outra pessoa.
create or replace function public.delete_my_account()
returns void
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  if auth.uid() is null then
    raise exception 'not authenticated';
  end if;
  delete from auth.users where id = auth.uid();
end;
$$;
revoke all on function public.delete_my_account() from public;
revoke all on function public.delete_my_account() from anon;
grant execute on function public.delete_my_account() to authenticated;

notify pgrst, 'reload schema';
