import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { EXAM_PASS, type ExamPart } from "@/content/level-exams";
import { LEVEL_ORDER, lessonsOfLevel, nextLevel } from "@/content/curriculum";
import type { CefrLevel } from "@/content/types";
import {
  buildRecoveryTasks,
  examState,
  taskProgress,
  type ExamAttempt,
  type ExamState,
  type PlanTask,
  type RecoveryPlan,
  type WrittenContext,
} from "@/lib/exam-rules";

export interface TaskWithProgress extends PlanTask {
  done: number;
  total: number;
  complete: boolean;
}

/** Conta o que o aluno fez desde a criação do plano (dados reais de cada tabela). */
async function countSince(supabase: SupabaseClient, uid: string, task: PlanTask, since: string): Promise<number> {
  switch (task.kind) {
    case "lesson": {
      const { data } = await supabase.from("lesson_progress").select("last_score, updated_at").eq("user_id", uid).eq("lesson_id", task.ref!).maybeSingle();
      return data && data.updated_at >= since && data.last_score >= task.target ? 1 : 0;
    }
    case "review": {
      const { count } = await supabase.from("activity_log").select("id", { count: "exact", head: true }).eq("user_id", uid).eq("kind", "review").gte("created_at", since);
      return count ?? 0;
    }
    case "listening": {
      const { count } = await supabase.from("listening_results").select("id", { count: "exact", head: true }).eq("user_id", uid).gte("created_at", since);
      return count ?? 0;
    }
    case "speaking": {
      const { count } = await supabase.from("speaking_sessions").select("id", { count: "exact", head: true }).eq("user_id", uid).gte("created_at", since);
      return count ?? 0;
    }
    case "pronunciation": {
      const { count } = await supabase.from("pronunciation_attempts").select("id", { count: "exact", head: true }).eq("user_id", uid).gte("created_at", since);
      return count ?? 0;
    }
    case "conversation": {
      const { count } = await supabase.from("messages").select("id", { count: "exact", head: true }).eq("user_id", uid).eq("role", "user").gte("created_at", since);
      return count ?? 0;
    }
  }
}

/** Progresso do plano; marca como cumprido quando todas as tarefas estão feitas. */
export async function planProgress(supabase: SupabaseClient, uid: string, plan: RecoveryPlan): Promise<{ tasks: TaskWithProgress[]; complete: boolean }> {
  const tasks = await Promise.all(
    plan.tasks.map(async (t) => {
      const p = taskProgress(t, await countSince(supabase, uid, t, plan.created_at));
      return { ...t, done: p.done, total: p.target, complete: p.complete };
    }),
  );
  const complete = tasks.every((t) => t.complete);
  if (complete && !plan.completed_at) {
    const at = new Date().toISOString();
    await supabase.from("recovery_plans").update({ completed_at: at }).eq("id", plan.id).eq("user_id", uid);
    plan.completed_at = at;
  }
  return { tasks, complete };
}

export interface LevelExamView {
  state: ExamState;
  attempts: (ExamAttempt & { details: Record<string, unknown> | null })[];
  /** Tarefas do plano aberto de cada parte (se houver). */
  plans: Partial<Record<ExamPart, TaskWithProgress[]>>;
}

/** Estado completo da prova de um nível, já atualizando planos cumpridos. */
export async function loadLevelExam(supabase: SupabaseClient, uid: string, level: CefrLevel): Promise<LevelExamView> {
  const [aRes, pRes] = await Promise.all([
    supabase.from("exam_attempts").select("part, score, passed, created_at, details").eq("user_id", uid).eq("level_code", level).order("created_at"),
    supabase.from("recovery_plans").select("id, level_code, part, tasks, created_at, completed_at").eq("user_id", uid).eq("level_code", level).order("created_at"),
  ]);
  const attempts = (aRes.data ?? []) as LevelExamView["attempts"];
  const plans = (pRes.data ?? []) as RecoveryPlan[];
  const plansOut: LevelExamView["plans"] = {};
  for (const plan of plans.filter((p) => !p.completed_at)) {
    const { tasks } = await planProgress(supabase, uid, plan);
    plansOut[plan.part] = tasks;
  }
  return { state: examState(attempts, plans), attempts, plans: plansOut };
}

/** Contexto para o plano da parte escrita: habilidades e aulas mais fracas do nível. */
export async function writtenContext(supabase: SupabaseClient, uid: string, level: CefrLevel, weakSkills: string[]): Promise<WrittenContext> {
  const lessons = lessonsOfLevel(level).filter((l) => l.kind === "lesson");
  const { data } = await supabase.from("lesson_progress").select("lesson_id, best_score").eq("user_id", uid).in("lesson_id", lessons.map((l) => l.id));
  const best = new Map((data ?? []).map((r) => [r.lesson_id as string, r.best_score as number]));
  const skillHits = (id: string) => {
    const l = lessons.find((x) => x.id === id)!;
    return l.exercises.filter((e) => weakSkills.slice(0, 2).includes(e.skill)).length;
  };
  const ranked = [...lessons].sort((a, b) => (best.get(a.id) ?? 0) - (best.get(b.id) ?? 0) || skillHits(b.id) - skillHits(a.id));
  return { weakSkills, weakLessons: ranked.slice(0, 3).map((l) => ({ id: l.id, title: l.title })) };
}

/**
 * Registra uma tentativa. Reprovou → cria o plano de recuperação.
 * Aprovou e as três partes estão aprovadas → sobe de nível (nunca rebaixa).
 */
export async function recordExamAttempt(
  supabase: SupabaseClient,
  uid: string,
  currentLevel: CefrLevel,
  input: { level: CefrLevel; part: ExamPart; score: number; details?: Record<string, unknown>; written?: WrittenContext },
): Promise<{ passed: boolean; planCreated: boolean; levelPassed: boolean; leveledUpTo: CefrLevel | null }> {
  const passed = input.score >= EXAM_PASS[input.part];
  const { error } = await supabase
    .from("exam_attempts")
    .insert({ user_id: uid, level_code: input.level, part: input.part, score: input.score, passed, details: input.details ?? null });
  if (error) throw new Error(`Não foi possível salvar a prova: ${error.message}`);

  if (!passed) {
    const tasks = buildRecoveryTasks(input.part, input.written);
    await supabase.from("recovery_plans").insert({ user_id: uid, level_code: input.level, part: input.part, tasks });
    return { passed, planCreated: true, levelPassed: false, leveledUpTo: null };
  }

  const view = await loadLevelExam(supabase, uid, input.level);
  if (!view.state.passed) return { passed, planCreated: false, levelPassed: false, leveledUpTo: null };
  const nl = nextLevel(input.level);
  if (nl && LEVEL_ORDER.indexOf(nl) > LEVEL_ORDER.indexOf(currentLevel)) {
    await supabase.from("profiles").update({ current_level: nl }).eq("id", uid);
    return { passed, planCreated: false, levelPassed: true, leveledUpTo: nl };
  }
  return { passed, planCreated: false, levelPassed: true, leveledUpTo: null };
}
