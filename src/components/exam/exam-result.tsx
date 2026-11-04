"use client";

import Link from "next/link";
import { CheckCircle2, Trophy, Volume2, XCircle } from "lucide-react";
import { unlockAudio, useVoice } from "@/lib/voice";

export interface ExamFeedbackView {
  summary_pt: string;
  strengths_pt: string[];
  improve_pt: string[];
  corrections: { original: string; corrected: string; explanation_pt: string }[];
}

const CRITERIA: Record<string, string> = {
  range: "Vocabulário e estruturas",
  accuracy: "Gramática",
  fluency: "Fluência",
  coherence: "Organização",
  task: "Cumpriu a tarefa",
  interaction: "Interação",
  comprehension: "Compreensão",
};

export function RubricBars({ rubric }: { rubric: Record<string, number> }) {
  return (
    <dl className="grid gap-2 sm:grid-cols-2">
      {Object.entries(rubric).map(([k, v]) => (
        <div key={k}>
          <dt className="flex justify-between text-sm">
            <span>{CRITERIA[k] ?? k}</span>
            <span className="tabular-nums text-muted">{v}/5</span>
          </dt>
          <dd className="mt-1 h-2 overflow-hidden rounded-full bg-surface-2">
            <span className={`block h-full ${v >= 3 ? "bg-correct" : "bg-wrong"}`} style={{ width: `${(v / 5) * 100}%` }} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Resultado de uma parte da prova: nota, veredito, retorno do examinador e próximos passos. */
export function ExamResult({
  level,
  score,
  passScore,
  passed,
  leveledUpTo,
  levelPassed,
  feedback,
  children,
}: {
  level: string;
  score: number;
  passScore: number;
  passed: boolean;
  leveledUpTo: string | null;
  levelPassed: boolean;
  feedback: ExamFeedbackView;
  children?: React.ReactNode;
}) {
  const { speak } = useVoice();
  return (
    <div className="space-y-4" role="status">
      <section className={`panel border-2 p-5 ${passed ? "border-correct" : "border-wrong"}`}>
        <div className="flex items-center gap-4">
          {levelPassed ? <Trophy size={36} className="text-boarding" aria-hidden /> : passed ? <CheckCircle2 size={36} className="text-correct" aria-hidden /> : <XCircle size={36} className="text-wrong" aria-hidden />}
          <div>
            <p className="font-display text-4xl font-bold tabular-nums">{score}%</p>
            <p className="text-sm text-muted">Mínimo para aprovar: {passScore}%</p>
          </div>
        </div>
        <p className="mt-3 font-bold">
          {leveledUpTo
            ? `Parabéns! Você comprovou o ${level} e subiu para o ${leveledUpTo}.`
            : levelPassed
              ? `Parabéns! Você comprovou o nível ${level}.`
              : passed
                ? "Aprovado nesta parte. Siga para a próxima."
                : "Ainda não foi desta vez. Preparamos um plano de recuperação com base nos seus erros; a nova tentativa abre quando você cumprir o plano."}
        </p>
        <p className="mt-2">{feedback.summary_pt}</p>
      </section>

      {children}

      {(feedback.strengths_pt.length > 0 || feedback.improve_pt.length > 0) && (
        <section className="panel grid gap-4 p-5 sm:grid-cols-2">
          {feedback.strengths_pt.length > 0 && (
            <div>
              <h3 className="font-bold">Pontos fortes</h3>
              <ul className="mt-2 space-y-1 text-sm">
                {feedback.strengths_pt.map((s) => (
                  <li key={s} className="flex gap-2">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-correct" aria-hidden /> {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {feedback.improve_pt.length > 0 && (
            <div>
              <h3 className="font-bold">Para melhorar</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                {feedback.improve_pt.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {feedback.corrections.length > 0 && (
        <section className="panel p-5">
          <h3 className="font-display text-xl font-bold">Correções</h3>
          <ul className="mt-3 space-y-3">
            {feedback.corrections.map((c, i) => (
              <li key={i} className="rounded-xl bg-surface-2 p-3">
                {c.original && (
                  <p className="text-wrong line-through" lang="en">
                    {c.original}
                  </p>
                )}
                <p className="flex items-center gap-2 font-bold text-correct" lang="en">
                  {c.corrected}
                  <button className="text-atlantic" onClick={() => (unlockAudio(), speak(c.corrected))} aria-label={`Ouvir: ${c.corrected}`}>
                    <Volume2 size={16} aria-hidden />
                  </button>
                </p>
                <p className="text-sm text-muted">{c.explanation_pt}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <Link href={`/prova/${level}`} className="btn-go inline-flex">
        {passed ? "Voltar à prova" : "Ver meu plano de recuperação"}
      </Link>
    </div>
  );
}
