"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, XCircle } from "lucide-react";
import { ExerciseView } from "@/components/exercise-view";
import { gradeExercise, scorePercent, type ExerciseAnswer, type GradeResult } from "@/lib/grading";
import { saveDrillScore } from "@/app/actions/difficulties";
import type { Exercise } from "@/content/types";

/** Etapa 4 do plano: exercícios específicos do tema (inclui frases que o próprio aluno errou). */
export function DrillRunner({ planId, drills }: { planId: number; drills: Exercise[] }) {
  const router = useRouter();
  const [pos, setPos] = useState(0);
  const [answer, setAnswer] = useState<ExerciseAnswer | null>(null);
  const [grade, setGrade] = useState<GradeResult | null>(null);
  const [results, setResults] = useState<boolean[]>([]);
  const [done, setDone] = useState<number | null>(null);
  const [pending, start] = useTransition();
  const ex = drills[pos];

  function check() {
    if (!answer) return;
    const g = gradeExercise(ex, answer);
    setGrade(g);
    setResults((r) => [...r, g.correct]);
  }
  function next() {
    if (pos + 1 < drills.length) {
      setPos(pos + 1);
      setAnswer(null);
      setGrade(null);
      return;
    }
    const score = scorePercent(results);
    setDone(score);
    start(async () => {
      await saveDrillScore(planId, score);
      router.refresh();
    });
  }

  if (done !== null)
    return (
      <p className="rounded-xl bg-surface-2 p-4" role="status">
        Você acertou <strong>{done}%</strong> dos exercícios específicos. {pending ? "Salvando…" : done >= 80 ? "Muito bem!" : "Releia os exemplos e tente de novo para fixar."}
      </p>
    );

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted">
        Exercício {pos + 1} de {drills.length}
      </p>
      <ExerciseView key={`${ex.id}-${pos}`} exercise={ex} locked={!!grade} result={grade} onChange={setAnswer} />
      {grade && (
        <p role="status" className={`flex items-start gap-2 rounded-xl p-3 ${grade.correct ? "bg-correct-bg text-correct" : "bg-wrong-bg text-wrong"}`}>
          {grade.correct ? <CheckCircle2 size={20} aria-hidden /> : <XCircle size={20} aria-hidden />}
          <span>
            {grade.correct ? "Correto!" : "Não foi dessa vez."} {!grade.correct && <>Resposta: <strong lang="en">{grade.expected}</strong></>}
          </span>
        </p>
      )}
      {grade ? (
        <button type="button" onClick={next} className="btn-primary">
          Continuar
        </button>
      ) : (
        <button type="button" onClick={check} disabled={!answer} className="btn-primary">
          Verificar
        </button>
      )}
    </div>
  );
}
