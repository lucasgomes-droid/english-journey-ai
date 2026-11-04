"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import type { Exercise } from "@/content/types";
import type { ExerciseAnswer } from "@/lib/grading";
import { finishReviewSession, submitReview } from "@/app/actions/learning";
import { ExerciseView } from "@/components/exercise-view";
import { SpeakButton } from "@/components/speak-button";
import { useVoice } from "@/lib/voice";
import { MicInput } from "@/components/mic-input";

export type ReviewCard =
  | { kind: "vocab"; id: string; pt: string; en: string; say: string; struggling: boolean }
  | { kind: "exercise"; id: string; exercise: Exercise; struggling: boolean }
  | { kind: "grammar"; id: string; original: string; corrected: string; explanation: string; struggling: boolean }
  | { kind: "phrase"; id: string; pt: string; en: string; struggling: boolean };

interface Feedback {
  correct: boolean;
  typo: boolean;
  expected: string;
  nextInDays: number;
}

export function ReviewSession({ cards: initialCards, empty }: { cards: ReviewCard[]; empty: React.ReactNode }) {
  // Cópia própria: se a página recarregar no meio (ex.: ao salvar), a sessão continua.
  const [cards] = useState(initialCards);
  const [i, setI] = useState(0);
  const [answer, setAnswer] = useState<ExerciseAnswer | null>(null);
  const [text, setText] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({ reviewed: 0, correct: 0 });
  const [done, setDone] = useState<{ xp: number } | null>(null);
  const [pending, start] = useTransition();
  const startedAt = useRef(0);
  const { speak } = useVoice();

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const card = cards[i];
  if (cards.length === 0) return <>{empty}</>;

  function check() {
    const a: ExerciseAnswer | null = card.kind === "exercise" ? answer : text.trim() ? { kind: "text", text } : null;
    if (!a) return;
    setError(null);
    start(async () => {
      const r = await submitReview({ itemType: card.kind, itemId: card.id, answer: a });
      if (!r.ok) {
        setError(r.error);
        return;
      }
      setFeedback(r);
      setStats((s) => ({ reviewed: s.reviewed + 1, correct: s.correct + (r.correct ? 1 : 0) }));
      if (card.kind === "vocab") speak(card.en);
      if (card.kind === "grammar") speak(card.corrected);
      if (card.kind === "phrase") speak(card.en);
    });
  }

  function next() {
    if (i + 1 < cards.length) {
      setI(i + 1);
      setAnswer(null);
      setText("");
      setFeedback(null);
    } else {
      start(async () => {
        const r = await finishReviewSession({ ...stats, durationSeconds: Math.round((Date.now() - startedAt.current) / 1000) });
        setDone({ xp: r.xp });
      });
    }
  }

  if (done) {
    return (
      <div className="panel mt-8 p-8 text-center">
        <p className="font-display text-3xl font-bold">Revisão concluída</p>
        <p className="mt-2 text-lg">
          {stats.correct} de {stats.reviewed} corretos · +{done.xp} XP
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/" className="btn-primary">
            Voltar ao início
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex items-center gap-3 text-sm text-muted">
        <span>
          {i + 1} de {cards.length}
        </span>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2">
          <div className="h-full bg-boarding" style={{ width: `${(i / cards.length) * 100}%` }} />
        </div>
      </div>

      <div className="panel mt-4 p-6">
        {card.struggling && <p className="mb-3 inline-block rounded-full bg-wrong-bg px-3 py-1 text-sm font-bold text-wrong">Ponto de dificuldade</p>}
        {card.kind === "vocab" ? (
          <div key={card.id}>
            <p className="text-sm font-bold text-muted">Como se diz em inglês?</p>
            <p className="mt-2 font-display text-3xl font-bold">{card.pt}</p>
            <div className="mt-6 flex items-start gap-3">
            <MicInput onText={setText} disabled={!!feedback} label="Falar a palavra" />
            <input
              autoFocus
              value={text}
              disabled={!!feedback}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !feedback && check()}
              className="field text-lg"
              placeholder="Fale ou escreva em inglês"
              lang="en"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
            />
            </div>
            {feedback && (
              <div className="mt-4 flex items-center gap-3">
                <SpeakButton text={card.en} withSlow />
                <span>
                  <strong lang="en">{card.en}</strong> <span className="text-sm text-atlantic">/{card.say}/</span>
                </span>
              </div>
            )}
          </div>
        ) : card.kind === "phrase" ? (
          <div key={card.id}>
            <p className="text-sm font-bold text-muted">Sua frase: diga em inglês</p>
            <p className="mt-2 font-display text-2xl font-bold">{card.pt}</p>
            <div className="mt-6 flex items-start gap-3">
              <MicInput onText={setText} disabled={!!feedback} label="Falar a frase" />
              <input
                value={text}
                disabled={!!feedback}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !feedback && check()}
                className="field text-lg"
                placeholder="Fale ou escreva em inglês"
                lang="en"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
              />
            </div>
            {feedback && (
              <div className="mt-4 flex items-center gap-3">
                <SpeakButton text={card.en} withSlow />
                <strong lang="en">{card.en}</strong>
              </div>
            )}
          </div>
        ) : card.kind === "grammar" ? (
          <div key={card.id}>
            <p className="text-sm font-bold text-muted">Erro de uma conversa: diga a forma correta</p>
            <p className="mt-2 font-display text-2xl font-bold text-wrong line-through" lang="en">
              {card.original}
            </p>
            {feedback && <p className="mt-2 text-muted">{card.explanation}</p>}
            <div className="mt-6 flex items-start gap-3">
              <MicInput onText={setText} disabled={!!feedback} label="Falar a frase correta" />
              <input
                value={text}
                disabled={!!feedback}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !feedback && check()}
                className="field text-lg"
                placeholder="Fale ou escreva a frase certa"
                lang="en"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
              />
            </div>
          </div>
        ) : (
          <ExerciseView key={card.id} exercise={card.exercise} locked={!!feedback} result={feedback} onChange={setAnswer} speakMode />
        )}
      </div>

      {error && <p className="mt-4 rounded-xl bg-wrong-bg px-4 py-3 text-wrong">{error}</p>}

      <div className={`mt-4 flex flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between ${feedback ? (feedback.correct ? "bg-correct-bg" : "bg-wrong-bg") : ""}`}>
        {feedback ? (
          <div role="status" className="flex items-start gap-3">
            {feedback.correct ? <CheckCircle2 className="shrink-0 text-correct" aria-hidden /> : <XCircle className="shrink-0 text-wrong" aria-hidden />}
            <div>
              <p className={`font-bold ${feedback.correct ? "text-correct" : "text-wrong"}`}>
                {feedback.correct ? "Correto!" : `Resposta: ${feedback.expected}`}
              </p>
              <p className="text-sm">{feedback.nextInDays === 0 ? "Volta ainda hoje para reforçar." : `Próxima revisão em ${feedback.nextInDays} ${feedback.nextInDays === 1 ? "dia" : "dias"}.`}</p>
            </div>
          </div>
        ) : (
          <span />
        )}
        {feedback ? (
          <button type="button" onClick={next} className="btn-primary sm:min-w-40" disabled={pending} autoFocus>
            {i + 1 < cards.length ? "Continuar" : pending ? "Salvando…" : "Concluir"}
          </button>
        ) : (
          <button type="button" onClick={check} disabled={pending || (card.kind === "exercise" ? !answer : !text.trim())} className="btn-primary sm:min-w-40">
            {pending ? "Verificando…" : "Verificar"}
          </button>
        )}
      </div>
    </div>
  );
}
