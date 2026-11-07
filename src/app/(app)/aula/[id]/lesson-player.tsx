"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { UseItCard } from "@/components/use-it-card";
import { MODULE_MISSION } from "@/content/module-missions";
import { getScenario } from "@/content/scenarios";
import { X, CheckCircle2, XCircle, MessagesSquare, Trophy, RotateCcw, Mic, Keyboard, Flag, Phone } from "lucide-react";
import { PronounceCard } from "@/components/pronounce-card";
import { useVoiceCaps } from "@/lib/voice";
import type { Lesson } from "@/content/types";
import { gradeExercise, type ExerciseAnswer, type GradeResult } from "@/lib/grading";
import { submitLesson, type LessonResult } from "@/app/actions/learning";
import { ExerciseView } from "@/components/exercise-view";
import { SpeakButton } from "@/components/speak-button";
import { RichText } from "@/components/rich-text";
import { ACHIEVEMENTS } from "@/lib/achievements";
import { Pt } from "@/components/pt";
import { NotUnderstood } from "@/components/help";

type Phase = "explain" | "vocab" | "examples" | "speak" | "practice" | "result";

export function LessonPlayer({ lesson, moduleTitle, nextLessonId, lockedHref }: { lesson: Lesson; moduleTitle: string; nextLessonId: string | null; lockedHref?: string | null }) {
  const isTest = lesson.kind === "test";
  const caps = useVoiceCaps();
  const phases: Phase[] = isTest
    ? ["explain", "practice", "result"]
    : caps.stt
      ? ["explain", "vocab", "examples", "speak", "practice", "result"]
      : ["explain", "vocab", "examples", "practice", "result"];
  // Modo fala: responder exercícios com a voz (lembrado neste aparelho).
  const [speakMode, setSpeakMode] = useState(false);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ej-speak-mode");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- preferência salva no aparelho
      setSpeakMode(caps.stt && saved !== "0");
    } catch {
      setSpeakMode(caps.stt);
    }
  }, [caps.stt]);
  const toggleSpeak = () => {
    setSpeakMode((v) => {
      try {
        localStorage.setItem("ej-speak-mode", v ? "0" : "1");
      } catch {}
      return !v;
    });
  };
  const [phase, setPhase] = useState<Phase>("explain");
  // Fila de exercícios: os errados voltam no fim da aula (uma vez). A nota usa só a 1ª tentativa.
  const [queue, setQueue] = useState<number[]>(() => lesson.exercises.map((_, i) => i));
  const [pos, setPos] = useState(0);
  const [answer, setAnswer] = useState<ExerciseAnswer | null>(null);
  const [grade, setGrade] = useState<GradeResult | null>(null);
  const [answers, setAnswers] = useState<{ exerciseId: string; answer: ExerciseAnswer; ms?: number }[]>([]);
  // Tempo para formular a resposta (do exercício aparecer até "Verificar").
  const shownAt = useRef<number>(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [server, setServer] = useState<LessonResult | null>(null);
  const [showTheory, setShowTheory] = useState(false);
  const [pending, startTransition] = useTransition();
  const startedAt = useRef<number>(0);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);
  useEffect(() => {
    topRef.current?.scrollIntoView({ block: "start" });
    shownAt.current = Date.now();
  }, [phase, pos]);

  const exercise = lesson.exercises[queue[pos]];
  const total = lesson.exercises.length;
  const isRetry = pos >= total;
  const phaseIdx = phases.indexOf(phase);
  const progress =
    phase === "practice"
      ? ((phaseIdx + pos / queue.length) / (phases.length - 1)) * 100
      : (phaseIdx / (phases.length - 1)) * 100;

  function check() {
    if (!answer || !exercise) return;
    const g = gradeExercise(exercise, answer);
    setGrade(g);
    if (isRetry) return;
    setAnswers((a) => [...a, { exerciseId: exercise.id, answer, ms: Math.min(600_000, Date.now() - shownAt.current) }]);
    setResults((r) => [...r, g.correct]);
    // Em aulas (não em avaliações), o exercício errado volta no fim para fixar.
    if (!g.correct && !isTest) setQueue((q) => [...q, queue[pos]]);
  }

  function finish(all: { exerciseId: string; answer: ExerciseAnswer; ms?: number }[]) {
    setPhase("result");
    startTransition(async () => {
      const durationSeconds = Math.round((Date.now() - startedAt.current) / 1000);
      try {
        const r = await submitLesson({ lessonId: lesson.id, answers: all, durationSeconds });
        setServer(r);
      } catch {
        setServer({ ok: false, error: "Sem conexão com o servidor. Seu resultado não foi salvo.", score: 0, passed: false, passScore: lesson.passScore, xpEarned: 0, firstCompletion: false, leveledUpTo: null, newAchievements: [] });
      }
    });
  }

  function next() {
    if (pos + 1 < queue.length) {
      setPos(pos + 1);
      setAnswer(null);
      setGrade(null);
    } else {
      finish(answers);
    }
  }

  function restart() {
    setPhase("practice");
    setQueue(lesson.exercises.map((_, i) => i));
    setPos(0);
    setAnswer(null);
    setGrade(null);
    setAnswers([]);
    setResults([]);
    setServer(null);
    startedAt.current = Date.now();
  }

  // Prova escrita com plano de recuperação aberto: a nova tentativa espera o plano.
  // (Só ao abrir a página; quem acabou de enviar continua vendo o próprio resultado.)
  if (lockedHref && !server && !pending)
    return (
      <main className="mx-auto max-w-xl py-10 text-center">
        <h1 className="font-display text-3xl font-bold">{lesson.title}</h1>
        <p className="mt-3 text-muted">Cumpra o plano de recuperação para liberar uma nova tentativa.</p>
        <Link href={lockedHref} className="btn-go mt-6 inline-flex">
          Ver meu plano
        </Link>
      </main>
    );

  return (
    <main className="mx-auto flex min-h-[calc(100dvh-10rem)] max-w-2xl scroll-mt-4 flex-col lg:min-h-[calc(100dvh-7rem)]" ref={topRef}>
      {/* Barra de progresso da aula */}
      <div className="flex items-center gap-4">
        <Link href="/trilha" className="grid size-10 place-items-center rounded-full hover:bg-surface-2" aria-label="Sair da aula">
          <X size={22} aria-hidden />
        </Link>
        {caps.stt && (
          <button
            type="button"
            onClick={toggleSpeak}
            aria-pressed={speakMode}
            className={`order-last flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold ${speakMode ? "bg-boarding text-boarding-ink" : "bg-surface-2 text-muted"}`}
            title={speakMode ? "Respondendo com a voz. Toque para digitar." : "Respondendo digitando. Toque para falar."}
          >
            {speakMode ? <Mic size={16} aria-hidden /> : <Keyboard size={16} aria-hidden />}
            <span className="hidden sm:inline">{speakMode ? "Modo fala" : "Digitar"}</span>
          </button>
        )}
        <div className="h-3 flex-1 overflow-hidden rounded-full bg-surface-2" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label="Progresso da aula">
          <div className="h-full rounded-full bg-boarding transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="flex-1 pb-8 pt-6">
        {phase === "explain" && (
          <section>
            <p className="font-bold text-muted">
              {moduleTitle} · {isTest ? "Avaliação" : lesson.scenarioId ? "Mini-aula" : `Aula ${lesson.order}`}
            </p>
            <h1 className="mt-1 font-display text-4xl font-bold">{lesson.title}</h1>
            <div className="mt-5 rounded-2xl bg-boarding/25 p-4">
              <p className="font-bold">{isTest ? "Objetivo" : "Sua missão nesta aula"}</p>
              <p>{lesson.objective}</p>
              {!isTest && lesson.examples[0] && (
                <NotUnderstood className="mt-3" text={lesson.examples.slice(0, 2).map((e) => e.en).join(" / ")} context={`Lesson "${lesson.title}": ${lesson.objective}`} />
              )}
            </div>
            {isTest ? (
              <div className="mt-8">
                <Theory blocks={lesson.explanation} />
              </div>
            ) : (
              <>
                {lesson.examples.length > 0 && (
                  <div className="mt-6">
                    <p className="text-sm font-bold text-muted">Na prática, você vai ouvir e dizer coisas como:</p>
                    <ul className="mt-2 space-y-2">
                      {lesson.examples.slice(0, 2).map((e) => (
                        <li key={e.en} className="flex items-center gap-3 rounded-2xl bg-surface-2 p-3">
                          <SpeakButton text={e.en} size="sm" />
                          <span>
                            <span className="block font-bold" lang="en">
                              {e.en}
                            </span>
                            <span className="block text-sm"><Pt>{e.pt}</Pt></span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <details className="mt-6 rounded-2xl border border-line p-4">
                  <summary className="cursor-pointer font-bold">Explicação rápida (opcional)</summary>
                  <p className="mt-1 text-sm text-muted">Você pode começar praticando. A explicação também aparece quando você errar.</p>
                  <div className="mt-4">
                    <Theory blocks={lesson.explanation} />
                  </div>
                </details>
              </>
            )}
          </section>
        )}

        {phase === "vocab" && (
          <section>
            <h1 className="font-display text-3xl font-bold">Vocabulário</h1>
            <p className="mt-1 text-muted">Ouça cada palavra e repita em voz alta. A pronúncia escrita é uma aproximação para falantes de português; a sílaba em maiúsculas é a mais forte.</p>
            <ul className="mt-6 divide-y divide-line rounded-2xl border border-line bg-surface">
              {lesson.vocabulary.map((v) => (
                <li key={v.id} className="flex items-center gap-4 p-4">
                  <SpeakButton text={v.en} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xl font-bold" lang="en">
                      {v.en}
                    </p>
                    <p><Pt>{v.pt}</Pt></p>
                  </div>
                  <p className="max-w-[40%] text-right text-sm text-atlantic">/{v.say}/</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {phase === "examples" && (
          <section>
            <h1 className="font-display text-3xl font-bold">Exemplos em contexto</h1>
            <ul className="mt-6 space-y-3">
              {lesson.examples.map((e) => (
                <li key={e.en} className="panel flex items-center gap-4 p-4">
                  <SpeakButton text={e.en} withSlow />
                  <div>
                    <p className="text-lg font-bold" lang="en">
                      {e.en}
                    </p>
                    <p><Pt>{e.pt}</Pt></p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {phase === "speak" && (
          <section>
            <h1 className="font-display text-3xl font-bold">Fale em voz alta</h1>
            <p className="mt-1 text-muted">
              Ouça, repita e veja sua nota. Falar desde o primeiro dia é o que faz você sair falando. Você pode repetir quantas vezes quiser.
            </p>
            <div className="mt-6 space-y-4">
              {lesson.examples.slice(0, 3).map((e, i) => (
                <PronounceCard key={e.en} text={e.en} translation={e.pt} context={`${lesson.id}#ex${i}`} />
              ))}
            </div>
          </section>
        )}

        {phase === "practice" && exercise && (
          <section aria-live="polite">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-sm text-muted">{isRetry ? "Vamos fixar: tente de novo o que você errou" : `Exercício ${pos + 1} de ${total}`}</p>
              <div className="flex flex-wrap justify-end gap-2">
                {!isTest && lesson.explanation.length > 0 && (
                  <button type="button" onClick={() => setShowTheory(true)} className="rounded-full bg-surface-2 px-3 py-1 text-sm font-bold">
                    Ver explicação
                  </button>
                )}
                {!isTest && (
                  <NotUnderstood
                    key={exercise.id}
                    text={"prompt" in exercise && exercise.prompt ? exercise.prompt : "sentence" in exercise ? exercise.sentence : lesson.objective}
                    context={`Lesson "${lesson.title}" (${lesson.objective}). This is an exercise the student must answer: explain what is being asked and the idea behind it, but DO NOT give the answer.`}
                  />
                )}
              </div>
            </div>
            <ExerciseView key={`${exercise.id}-${pos}-${speakMode ? "v" : "t"}`} exercise={exercise} locked={!!grade} result={grade} onChange={setAnswer} speakMode={speakMode} />
          </section>
        )}

        {phase === "result" && (
          <ResultView lesson={lesson} results={results} server={server} pending={pending} nextLessonId={nextLessonId} onRetry={restart} />
        )}
      </div>

      {/* Barra inferior de ação */}
      {phase !== "result" && (
        <div
          className={`sticky bottom-[calc(4.25rem+env(safe-area-inset-bottom))] z-20 -mx-4 rounded-t-2xl border-t-2 lg:bottom-0 lg:mx-0 ${
            grade ? (grade.correct ? "border-correct bg-correct-bg" : "border-wrong bg-wrong-bg") : "border-line bg-surface"
          }`}
        >
          <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            {grade ? (
              <div role="status" className="flex items-start gap-3">
                {grade.correct ? <CheckCircle2 className="mt-0.5 shrink-0 text-correct" aria-hidden /> : <XCircle className="mt-0.5 shrink-0 text-wrong" aria-hidden />}
                <div>
                  <p className={`font-display text-xl font-bold ${grade.correct ? "text-correct" : "text-wrong"}`}>
                    {grade.correct ? (grade.typo ? "Correto, com um errinho de digitação" : "Correto!") : "Não foi dessa vez"}
                  </p>
                  {(!grade.correct || grade.typo) && (
                    <p>
                      Resposta: <strong lang="en">{grade.expected}</strong>
                    </p>
                  )}
                  {!grade.correct && exercise?.explain && <p className="text-sm">{exercise.explain}</p>}
                  {!grade.correct && !isTest && lesson.explanation.length > 0 && (
                    <button type="button" onClick={() => setShowTheory(true)} className="mt-1 text-sm font-bold underline">
                      Entender o erro
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <span className="hidden sm:block" />
            )}
            {phase === "practice" ? (
              grade ? (
                <button type="button" onClick={next} className={grade.correct ? "btn-primary sm:min-w-40" : "btn bg-wrong text-white sm:min-w-40"} autoFocus>
                  Continuar
                </button>
              ) : (
                <button type="button" onClick={check} disabled={!answer} className="btn-primary sm:min-w-40">
                  Verificar
                </button>
              )
            ) : (
              <button type="button" onClick={() => setPhase(phases[phaseIdx + 1])} className="btn-primary sm:min-w-40">
                {phases[phaseIdx + 1] === "practice" ? (isTest ? "Começar avaliação" : "Praticar") : phases[phaseIdx + 1] === "speak" ? "Falar em voz alta" : "Continuar"}
              </button>
            )}
          </div>
        </div>
      )}
      {showTheory && (
        <div className="fixed inset-0 z-50 grid place-items-end bg-black/50 sm:place-items-center" role="dialog" aria-modal="true" aria-label="Explicação da aula" onClick={() => setShowTheory(false)}>
          <div className="animate-pop max-h-[85dvh] w-full max-w-xl overflow-y-auto rounded-t-3xl bg-surface p-6 sm:rounded-3xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="font-display text-2xl font-bold">Explicação</h2>
              <button type="button" onClick={() => setShowTheory(false)} className="grid size-9 place-items-center rounded-full hover:bg-surface-2" aria-label="Fechar">
                <X size={20} aria-hidden />
              </button>
            </div>
            <Theory blocks={lesson.explanation} />
          </div>
        </div>
      )}
    </main>
  );
}

function ResultView({ lesson, results, server, pending, nextLessonId, onRetry }: { lesson: Lesson; results: boolean[]; server: LessonResult | null; pending: boolean; nextLessonId: string | null; onRetry: () => void }) {
  const correct = results.filter(Boolean).length;
  const score = server?.ok ? server.score : Math.round((correct / Math.max(1, results.length)) * 100);
  const passed = score >= lesson.passScore;
  return (
    <section className="text-center">
      <div className={`mx-auto grid size-24 place-items-center rounded-full ${passed ? "bg-boarding text-boarding-ink" : "bg-surface-2 text-muted"}`}>
        {passed ? <Trophy size={44} aria-hidden /> : <RotateCcw size={40} aria-hidden />}
      </div>
      <h1 className="mt-5 font-display text-4xl font-bold">{passed ? (lesson.kind === "test" ? "Aprovado!" : "Aula concluída!") : "Quase lá"}</h1>
      <p className="mt-2 text-lg">
        Você acertou <strong>{correct}</strong> de {results.length} ({score}%). {passed ? "" : `Para concluir, são necessários ${lesson.passScore}%.`}
      </p>

      <div className="mt-6 min-h-12" aria-live="polite">
        {pending && <p className="text-muted">Salvando seu progresso…</p>}
        {server && !server.ok && <p className="rounded-xl bg-wrong-bg px-4 py-3 text-wrong">{server.error}</p>}
        {server?.ok && (
          <div className="flex flex-wrap justify-center gap-2">
            <span className="chip bg-boarding text-boarding-ink">+{server.xpEarned} XP</span>
            {server.leveledUpTo && <span className="chip bg-atlantic text-surface">Novo nível: {server.leveledUpTo}</span>}
            {server.newAchievements.map((c) => (
              <span key={c} className="chip">
                Medalha: {ACHIEVEMENTS.find((a) => a.code === c)?.title}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="panel mt-8 p-6 text-left">
        <h2 className="font-display text-xl font-bold">Revisão rápida</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          {lesson.review.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
        {!passed && <p className="mt-3 text-sm text-muted">Os exercícios que você errou foram para a sua fila de revisão.</p>}
        {results.some((r) => !r) && lesson.kind !== "test" && lesson.explanation.length > 0 && (
          <details className="mt-4 rounded-2xl border border-line p-4" open={!passed}>
            <summary className="cursor-pointer font-bold">O que revisar: a explicação em português</summary>
            <div className="mt-4">
              <Theory blocks={lesson.explanation} />
            </div>
          </details>
        )}
      </div>

      {server?.ok && server.exam && (
        <div className={`panel mt-4 flex flex-col items-start gap-3 border-2 p-6 text-left sm:flex-row sm:items-center ${server.exam.passed ? "border-boarding" : "border-wrong"}`}>
          <Flag className="shrink-0 text-atlantic" aria-hidden />
          <div className="flex-1">
            <p className="font-bold">{server.exam.passed ? `Parte escrita da prova ${server.exam.level} aprovada` : `Parte escrita da prova ${server.exam.level}: plano de recuperação criado`}</p>
            <p className="text-muted">
              {server.exam.passed
                ? "Para subir de nível, faltam o Speaking e a Conversation."
                : "Montamos tarefas com base nos seus erros. A nova tentativa abre quando você cumprir o plano."}
            </p>
          </div>
          <Link href={`/prova/${server.exam.level}`} className="btn-go">
            {server.exam.passed ? "Continuar a prova" : "Ver meu plano"}
          </Link>
        </div>
      )}

      {lesson.kind === "lesson" && server?.ok && (
        <UseItCard lessonId={lesson.id} objective={lesson.objective} hint={lesson.examples[0]?.en ?? lesson.vocabulary[0]?.en ?? ""} />
      )}

      {lesson.kind === "test" && passed && MODULE_MISSION[lesson.moduleId] && getScenario(MODULE_MISSION[lesson.moduleId]) && (
        <div className="panel mt-4 flex flex-col items-start gap-3 border-2 border-boarding p-6 text-left sm:flex-row sm:items-center">
          <Phone className="shrink-0 text-atlantic" aria-hidden />
          <div className="flex-1">
            <p className="font-bold">Missão do módulo: {getScenario(MODULE_MISSION[lesson.moduleId])!.title}</p>
            <p className="text-muted">Use tudo o que estudou neste módulo numa conversa de verdade{["a1", "a2"].includes(lesson.moduleId.slice(0, 2)) ? "." : ", com imprevistos."}</p>
          </div>
          <Link href={`/professor?cenario=${MODULE_MISSION[lesson.moduleId]}&nivel=${lesson.moduleId.slice(0, 2).toUpperCase()}&ligar=1`} className="btn-go">
            Ligar agora
          </Link>
        </div>
      )}

      {lesson.scenarioId && (
        <div className="panel mt-4 flex flex-col items-start gap-3 p-6 text-left sm:flex-row sm:items-center">
          <MessagesSquare className="shrink-0 text-atlantic" aria-hidden />
          <div className="flex-1">
            <p className="font-bold">Agora use na prática</p>
            <p className="text-muted">Converse com um personagem nessa mesma situação, por texto ou voz.</p>
          </div>
          <Link href={`/professor?cenario=${lesson.scenarioId}`} className="btn-go">
            Praticar a conversa
          </Link>
        </div>
      )}

      {lesson.conversation && passed && (
        <div className="panel mt-4 flex flex-col items-start gap-3 p-6 text-left sm:flex-row sm:items-center">
          <MessagesSquare className="shrink-0 text-atlantic" aria-hidden />
          <div className="flex-1">
            <p className="font-bold">Pratique conversando</p>
            <p className="text-muted">{lesson.conversation.goal}</p>
          </div>
          <Link href={`/professor?aula=${lesson.id}`} className="btn-ghost">
            Conversar com o professor
          </Link>
        </div>
      )}

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        {!(server?.exam && !server.exam.passed) && (
          <button type="button" onClick={onRetry} className="btn-ghost" disabled={pending}>
            Refazer exercícios
          </button>
        )}
        {passed && nextLessonId && server?.ok && !lesson.moduleId.endsWith("-final") ? (
          <Link href={`/aula/${nextLessonId}`} className="btn-go">
            Próxima aula
          </Link>
        ) : (
          <Link href="/" className="btn-primary">
            Voltar ao início
          </Link>
        )}
      </div>
    </section>
  );
}

function Theory({ blocks }: { blocks: Lesson["explanation"] }) {
  return (
    <div className="space-y-8">
      {blocks.map((b) => (
        <article key={b.title}>
          <h2 className="font-display text-2xl font-bold">{b.title}</h2>
          <p className="mt-2 max-w-prose">
            <RichText text={b.body} />
          </p>
          {b.table && (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[20rem] border-collapse overflow-hidden rounded-xl text-left">
                <thead>
                  <tr className="bg-atlantic text-surface">
                    {b.table.head.map((h) => (
                      <th key={h} className="px-4 py-2.5 font-bold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {b.table.rows.map((r, i) => (
                    <tr key={i} className="border-b border-line bg-surface">
                      {r.map((c, j) => (
                        <td key={j} className="px-4 py-2.5" lang={j === 0 ? "en" : undefined}>
                          {c}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
