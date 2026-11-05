"use client";

import { CheckCircle2, CircleDashed, Volume2, X } from "lucide-react";
import { unlockAudio, useVoice } from "@/lib/voice";
import { RubricBars } from "@/components/exam/exam-result";
import { Pt } from "@/components/pt";

export interface ReportView {
  summary_pt: string;
  strengths_pt?: string[];
  said: { original: string; better: string }[];
  mistakes: { original: string; corrected: string; explanation_pt: string }[];
  expressions: { en: string; pt: string }[];
  goals: { goal: string; done: boolean }[];
  rubric: Record<string, number>;
  score: number;
  suggestion_pt: string;
  pronunciation?: { en: string; best: number; first: number; attempts: number; missed: string[] }[];
  exercises?: { label: string; href: string }[];
  responseSeconds?: number | null;
}

function Say({ text }: { text: string }) {
  const { speak } = useVoice();
  return (
    <button type="button" onClick={() => (unlockAudio(), speak(text))} className="ml-1 inline-grid size-7 place-items-center rounded-full align-middle text-atlantic hover:bg-surface-2" aria-label={`Ouvir: ${text}`}>
      <Volume2 size={15} aria-hidden />
    </button>
  );
}

/** Relatório do fim da conversa, em uma folha sobre a tela. */
export function ConversationReportSheet({ report, savedPhrases, onClose }: { report: ReportView; savedPhrases: number; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-end bg-black/50 sm:place-items-center" role="dialog" aria-modal="true" aria-labelledby="relatorio-titulo">
      <div className="animate-pop max-h-[90dvh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-surface p-5 sm:rounded-3xl sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 id="relatorio-titulo" className="font-display text-2xl font-bold">
              Relatório da conversa
            </h2>
            <p className="text-sm text-muted">Baseado no que você realmente disse nesta conversa.</p>
          </div>
          <button type="button" onClick={onClose} className="grid size-9 shrink-0 place-items-center rounded-full hover:bg-surface-2" aria-label="Fechar relatório">
            <X size={20} aria-hidden />
          </button>
        </div>

        <section className="mt-4 flex items-center gap-4 rounded-2xl bg-surface-2 p-4">
          <p className="font-display text-4xl font-bold tabular-nums">{report.score}</p>
          <div>
            <p className="text-sm font-bold text-muted">Nota de desempenho (0–100)</p>
            <p>{report.summary_pt}</p>
          </div>
        </section>

        <section className="mt-4">
          <RubricBars rubric={report.rubric} />
        </section>

        {report.strengths_pt && report.strengths_pt.length > 0 && (
          <section className="mt-5">
            <h3 className="font-bold">Pontos positivos</h3>
            <ul className="mt-2 space-y-1 text-sm">
              {report.strengths_pt.map((s) => (
                <li key={s} className="flex gap-2">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-correct" aria-hidden /> {s}
                </li>
              ))}
            </ul>
          </section>
        )}

        {report.goals.length > 0 && (
          <section className="mt-5">
            <h3 className="font-bold">Objetivos</h3>
            <ul className="mt-2 space-y-1">
              {report.goals.map((g) => (
                <li key={g.goal} className="flex items-center gap-2 text-sm">
                  {g.done ? <CheckCircle2 size={18} className="text-correct" aria-hidden /> : <CircleDashed size={18} className="text-muted" aria-hidden />}
                  <span className={g.done ? "" : "text-muted"}>{g.goal}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {report.said.length > 0 && (
          <section className="mt-5">
            <h3 className="font-bold">O que você falou → como poderia falar melhor</h3>
            <ul className="mt-2 space-y-2">
              {report.said.map((s, i) => (
                <li key={i} className="rounded-xl bg-surface-2 p-3 text-sm">
                  <p className="text-muted" lang="en">
                    “{s.original}”
                  </p>
                  <p className="font-bold" lang="en">
                    → {s.better}
                    <Say text={s.better} />
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {report.mistakes.length > 0 && (
          <section className="mt-5">
            <h3 className="font-bold">Erros cometidos</h3>
            <ul className="mt-2 space-y-2">
              {report.mistakes.map((m, i) => (
                <li key={i} className="rounded-xl border border-boarding/60 bg-boarding/10 p-3 text-sm">
                  <span className="text-wrong line-through" lang="en">
                    {m.original}
                  </span>{" "}
                  → <strong lang="en">{m.corrected}</strong>
                  <span className="mt-1 block text-muted">{m.explanation_pt}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {report.expressions.length > 0 && (
          <section className="mt-5">
            <h3 className="font-bold">Novas expressões para esta situação</h3>
            <ul className="mt-2 grid gap-2 sm:grid-cols-2">
              {report.expressions.map((e) => (
                <li key={e.en} className="rounded-xl bg-surface-2 p-3 text-sm">
                  <span className="font-bold" lang="en">
                    {e.en}
                  </span>
                  <Say text={e.en} />
                  <span className="block"><Pt>{e.pt}</Pt></span>
                </li>
              ))}
            </ul>
            {savedPhrases > 0 && <p className="mt-2 text-sm text-muted">Elas foram salvas no seu banco de frases e entram na revisão.</p>}
          </section>
        )}

        {report.pronunciation && report.pronunciation.length > 0 && (
          <section className="mt-5">
            <h3 className="font-bold">Pronúncia nesta conversa</h3>
            <ul className="mt-2 space-y-2">
              {report.pronunciation.map((p) => (
                <li key={p.en} className="rounded-xl bg-surface-2 p-3 text-sm">
                  <span className="font-bold" lang="en">
                    {p.en}
                  </span>
                  <Say text={p.en} />
                  <span className="block text-muted">
                    {p.attempts} {p.attempts === 1 ? "tentativa" : "tentativas"} · {p.first}% → {p.best}% das palavras
                    {p.missed.length > 0 && <> · treinar: <span lang="en">{p.missed.join(", ")}</span></>}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {typeof report.responseSeconds === "number" && (
          <p className="mt-4 text-sm text-muted">Tempo médio para começar a responder: {report.responseSeconds} s.</p>
        )}

        {report.suggestion_pt && (
          <section className="mt-5 rounded-2xl bg-atlantic/10 p-4">
            <h3 className="font-bold">Sugestão de prática</h3>
            <p className="mt-1">{report.suggestion_pt}</p>
          </section>
        )}

        {report.exercises && report.exercises.length > 0 && (
          <section className="mt-5">
            <h3 className="font-bold">Exercícios recomendados</h3>
            <ul className="mt-2 space-y-1">
              {report.exercises.map((e) => (
                <li key={e.href}>
                  <a href={e.href} className="font-bold text-atlantic underline">
                    {e.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <button type="button" onClick={onClose} className="btn-primary mt-6 w-full">
          Fechar
        </button>
      </div>
    </div>
  );
}
