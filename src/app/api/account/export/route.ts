import { NextResponse } from "next/server";
import { currentUser } from "@/lib/supabase/server";

/** Tabelas com dados do aluno (todas protegidas por RLS: cada um só lê os próprios). */
const USER_TABLES = [
  "lesson_progress",
  "exercise_answers",
  "assessments",
  "review_items",
  "activity_log",
  "achievements",
  "conversations",
  "messages",
  "pronunciation_attempts",
  "listening_results",
  "speaking_sessions",
  "personal_phrases",
  "exam_attempts",
  "exam_sessions",
  "recovery_plans",
  "practice_plans",
  "learner_facts",
  "production_attempts",
  "ai_usage",
] as const;

/** LGPD — portabilidade: baixa todos os seus dados em JSON. */
export async function GET() {
  const { supabase, user } = await currentUser();
  if (!user) return NextResponse.json({ error: "Faça login novamente." }, { status: 401 });
  const [profile, files, ...rows] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
    supabase.storage.from("recordings").list(user.id, { limit: 1000 }),
    ...USER_TABLES.map((t) => supabase.from(t).select("*").eq("user_id", user.id).limit(20000)),
  ]);
  const data: Record<string, unknown> = {
    exported_at: new Date().toISOString(),
    account: { id: user.id, email: user.email },
    profile: profile.data,
    recordings: (files.data ?? []).map((f) => `${user.id}/${f.name}`),
  };
  USER_TABLES.forEach((t, i) => (data[t] = rows[i].data ?? []));
  return new NextResponse(JSON.stringify(data, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="english-journey-meus-dados-${new Date().toISOString().slice(0, 10)}.json"`,
      "Cache-Control": "no-store",
    },
  });
}
