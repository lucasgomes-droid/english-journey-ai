import { NextResponse } from "next/server";
import { currentUser } from "@/lib/supabase/server";
import { AiError, transcribe } from "@/lib/ai";
import { analyzeAudio, readWav, textStats, wordsPerMinute } from "@/lib/fluency";
import { getLevelExam } from "@/content/level-exams";
import { evaluateSpeaking } from "@/lib/exam-ai";
import { loadLevelExam, recordExamAttempt } from "@/lib/exams";
import { speakingAnswerScore } from "@/lib/exam-rules";
import { recordActivity } from "@/lib/progress";
import type { Profile } from "@/lib/data";

export const maxDuration = 60;
const MAX_BYTES = 4_300_000;

/** Parte Speaking da prova de nível: duas respostas gravadas, enviadas juntas. */
export async function POST(req: Request) {
  const { supabase, user } = await currentUser();
  if (!user) return NextResponse.json({ error: "Faça login novamente." }, { status: 401 });

  const form = await req.formData().catch(() => null);
  const exam = getLevelExam(String(form?.get("level") ?? ""));
  if (!exam) return NextResponse.json({ error: "Nível inválido." }, { status: 400 });
  const raw = exam.speaking.map((_, i) => form?.get(`audio${i}`));
  const audios = raw.filter((a): a is File => a instanceof Blob && a.size > 0);
  if (audios.length !== exam.speaking.length) return NextResponse.json({ error: "Grave as duas respostas." }, { status: 400 });
  if (audios.reduce((s, a) => s + a.size, 0) > MAX_BYTES) return NextResponse.json({ error: "Gravações longas demais." }, { status: 413 });

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single<Profile>();
  if (!profile) return NextResponse.json({ error: "Perfil não encontrado." }, { status: 404 });
  const view = await loadLevelExam(supabase, user.id, exam.level);
  const st = view.state.parts.speaking;
  if (st.passed) return NextResponse.json({ error: "Você já foi aprovado nesta parte." }, { status: 409 });
  if (st.lock === "prereq") return NextResponse.json({ error: "Aprove primeiro a parte escrita (teste final do nível)." }, { status: 403 });
  if (st.lock === "plan") return NextResponse.json({ error: "Cumpra o plano de recuperação antes de tentar de novo." }, { status: 403 });

  let answers;
  try {
    answers = await Promise.all(
      audios.map(async (a, i) => {
        const buf = await a.arrayBuffer();
        const wav = readWav(buf);
        const stats = wav ? analyzeAudio(wav.samples, wav.rate) : { seconds: 0, speechSeconds: 0, pauses: 0 };
        const transcript = await transcribe(new Blob([buf], { type: "audio/wav" }), `answer${i}.wav`, "Um, so, uh, I think... well, you know...");
        const t = textStats(transcript);
        return { prompt: exam.speaking[i].en, transcript, words: t.words, pauses: stats.pauses, seconds: stats.seconds, wpm: wordsPerMinute(t.words, stats.speechSeconds || stats.seconds) };
      }),
    );
  } catch (e) {
    const err = e instanceof AiError ? e : new AiError("Falha ao reconhecer a fala.", 502);
    return NextResponse.json({ error: err.message }, { status: err.status });
  }
  if (answers.every((a) => a.words < 3)) return NextResponse.json({ error: "Quase não entendi as gravações. Fale mais perto do microfone e tente de novo (esta tentativa não contou)." }, { status: 422 });

  let ev;
  try {
    ev = await evaluateSpeaking(exam, answers);
  } catch (e) {
    return NextResponse.json({ error: e instanceof AiError ? e.message : "O examinador não respondeu. Tente de novo (não contou como tentativa)." }, { status: 502 });
  }
  if (!ev) return NextResponse.json({ error: "O examinador não conseguiu avaliar desta vez. Tente de novo (não contou como tentativa)." }, { status: 502 });

  const scores = answers.map((a, i) => speakingAnswerScore(ev.rubrics[i], a.words, exam.minWords));
  const score = Math.round(scores.reduce((s, x) => s + x, 0) / scores.length);
  let r;
  try {
    r = await recordExamAttempt(supabase, user.id, profile.current_level, {
      level: exam.level,
      part: "speaking",
      score,
      details: { answers: answers.map((a, i) => ({ ...a, rubric: ev.rubrics[i], score: scores[i] })), feedback: ev.feedback },
    });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
  await recordActivity(supabase, profile, {
    kind: "test",
    ref: `exam:${exam.level}:speaking`,
    title: `Prova ${exam.level} · Speaking`,
    xp: r.passed ? 40 : 10,
    durationSeconds: Math.round(answers.reduce((s, a) => s + a.seconds, 0)),
    score,
  }).catch(() => null);

  return NextResponse.json({ score, scores, answers: answers.map((a, i) => ({ transcript: a.transcript, words: a.words, wpm: a.wpm, rubric: ev.rubrics[i] })), feedback: ev.feedback, ...r });
}
