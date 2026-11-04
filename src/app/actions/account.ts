"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";
import { createClient, requireUser } from "@/lib/supabase/server";

export interface FormState {
  error?: string;
  message?: string;
}

const credentials = z.object({
  email: z.string().trim().email("Informe um e-mail válido."),
  password: z.string().min(8, "A senha precisa ter pelo menos 8 caracteres."),
});

function translateAuthError(msg: string): string {
  if (/invalid login credentials/i.test(msg)) return "E-mail ou senha incorretos.";
  if (/email not confirmed/i.test(msg)) return "Confirme seu e-mail antes de entrar. Verifique sua caixa de entrada.";
  if (/already registered|already been registered/i.test(msg)) return "Este e-mail já tem cadastro. Faça login.";
  if (/rate limit/i.test(msg)) return "Muitas tentativas. Aguarde alguns minutos e tente de novo.";
  return msg;
}

export async function signIn(_: FormState, formData: FormData): Promise<FormState> {
  const parsed = credentials.safeParse({ email: formData.get("email"), password: formData.get("password") });
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) return { error: translateAuthError(error.message) };
  redirect("/");
}

export async function signUp(_: FormState, formData: FormData): Promise<FormState> {
  const name = String(formData.get("name") ?? "").trim();
  if (name.length < 2) return { error: "Informe seu nome." };
  const parsed = credentials.safeParse({ email: formData.get("email"), password: formData.get("password") });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const h = await headers();
  const origin = h.get("origin") ?? `https://${h.get("host")}`;
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    ...parsed.data,
    options: { data: { display_name: name }, emailRedirectTo: `${origin}/auth/callback?next=/boas-vindas` },
  });
  if (error) return { error: translateAuthError(error.message) };
  if (data.session) redirect("/boas-vindas");
  return { message: "Conta criada! Enviamos um link de confirmação para o seu e-mail. Abra o link para entrar." };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

const profileSchema = z.object({
  display_name: z.string().trim().min(2).max(60),
  daily_minutes: z.coerce.number().int().min(5).max(180),
  daily_goal_xp: z.coerce.number().int().min(10).max(500),
  weekly_goal_lessons: z.coerce.number().int().min(1).max(50),
  learning_goal: z.string().trim().max(200).optional(),
});

export async function saveProfile(_: FormState, formData: FormData): Promise<FormState> {
  const parsed = profileSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Confira os campos: nome com 2+ letras e metas dentro dos limites." };
  const { supabase, user } = await requireUser();
  const finishOnboarding = formData.get("onboarding") === "1";
  const { error } = await supabase
    .from("profiles")
    .update({ ...parsed.data, ...(finishOnboarding ? { onboarded: true } : {}), updated_at: new Date().toISOString() })
    .eq("id", user.id);
  if (error) return { error: `Não foi possível salvar: ${error.message}` };
  revalidatePath("/", "layout");
  if (finishOnboarding) redirect("/");
  return { message: "Preferências salvas." };
}
