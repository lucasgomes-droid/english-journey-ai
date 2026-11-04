import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/lib/env";

export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Chamado a partir de um Server Component: o proxy renova a sessão.
        }
      },
    },
  });
}

export interface AuthUser {
  id: string;
  email: string | null;
}

/**
 * Retorna cliente + usuário autenticado ou redireciona para o login.
 * Usa getClaims(): valida o token localmente (chaves assimétricas do Supabase),
 * sem ida e volta ao servidor de autenticação a cada página — bem mais rápido.
 */
export async function requireUser(): Promise<{ supabase: Awaited<ReturnType<typeof createClient>>; user: AuthUser }> {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (!claims?.sub) redirect("/login");
  return { supabase, user: { id: claims.sub, email: (claims.email as string | undefined) ?? null } };
}

/** Usuário atual (ou null) sem redirecionar — para rotas de API. */
export async function currentUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const sub = data?.claims?.sub;
  return { supabase, user: sub ? ({ id: sub, email: (data?.claims?.email as string | undefined) ?? null } as AuthUser) : null };
}
