"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { SpeakButton } from "@/components/speak-button";
import { saveWord } from "@/app/actions/practice";
import { STATUS_LABEL, type WordStatus } from "@/lib/vocab-status";

export interface VocabRow {
  key: string;
  en: string;
  pt: string;
  say: string;
  example: string;
  category: string;
  unit: string;
  level: string;
  source: string;
  status: WordStatus;
  reps: number;
  lapses: number;
  last: string | null;
  priority: number;
}

const STATUS_STYLE: Record<WordStatus, string> = {
  esquecida: "bg-wrong/15 text-wrong",
  aprendendo: "bg-atlantic/15 text-atlantic",
  nova: "bg-surface-2 text-muted",
  firme: "bg-correct/15 text-correct",
};
const DATE = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
});

export function VocabList({ rows }: { rows: VocabRow[] }) {
  const [status, setStatus] = useState<WordStatus | "todas">("todas");
  const [level, setLevel] = useState("todos");
  const [q, setQ] = useState("");
  const [word, setWord] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const counts = useMemo(() => {
    const c: Record<WordStatus, number> = {
      nova: 0,
      aprendendo: 0,
      firme: 0,
      esquecida: 0,
    };
    for (const r of rows) c[r.status]++;
    return c;
  }, [rows]);
  const levels = useMemo(
    () =>
      [...new Set(rows.map((r) => r.level))].filter((l) => l !== "—").sort(),
    [rows],
  );
  const shown = rows.filter(
    (r) =>
      (status === "todas" || r.status === status) &&
      (level === "todos" || r.level === level) &&
      (!q || `${r.en} ${r.pt}`.toLowerCase().includes(q.toLowerCase())),
  );

  async function add() {
    setBusy(true);
    setMsg(null);
    const r = await saveWord({
      en: word,
      topic: "Minhas palavras",
      source: "vocab",
    }).catch(() => null);
    setBusy(false);
    if (r && "ok" in r && r.ok) {
      setMsg(
        r.already
          ? `"${word}" já está no seu vocabulário.`
          : `Salvo: ${word}${r.pt ? ` — ${r.pt}` : ""}. Entra na revisão amanhã.`,
      );
      setWord("");
    } else
      setMsg((r && "error" in r && r.error) || "Não consegui salvar agora.");
  }

  return (
    <>
      <section
        className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4"
        aria-label="Resumo"
      >
        {(["esquecida", "aprendendo", "nova", "firme"] as WordStatus[]).map(
          (s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(status === s ? "todas" : s)}
              aria-pressed={status === s}
              className={`panel p-4 text-left ${status === s ? "ring-2 ring-atlantic" : ""}`}
            >
              <span className="block font-display text-3xl font-bold">
                {counts[s]}
              </span>
              <span className="text-sm text-muted">{STATUS_LABEL[s]}</span>
            </button>
          ),
        )}
      </section>
      {counts.esquecida > 0 && (
        <p className="mt-3 text-sm">
          Você tem {counts.esquecida}{" "}
          {counts.esquecida === 1 ? "palavra" : "palavras"} para recuperar.{" "}
          <Link href="/revisao" className="font-bold text-atlantic underline">
            Revisar agora
          </Link>
        </p>
      )}

      <section className="panel mt-6 p-4" aria-label="Salvar palavra">
        <label htmlFor="new-word" className="font-bold">
          Salvar uma palavra ou expressão
        </label>
        <div className="mt-2 flex gap-2">
          <input
            id="new-word"
            className="field min-w-0 flex-1"
            lang="en"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="ex.: look forward to"
            maxLength={80}
          />
          <button
            type="button"
            className="btn-go"
            onClick={add}
            disabled={busy || word.trim().length < 2}
          >
            <Plus size={16} aria-hidden /> {busy ? "Salvando…" : "Salvar"}
          </button>
        </div>
        {msg && (
          <p className="mt-2 text-sm" role="status">
            {msg}
          </p>
        )}
      </section>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <label htmlFor="vocab-q" className="sr-only">
          Buscar
        </label>
        <input
          id="vocab-q"
          className="field min-w-0 flex-1"
          placeholder="Buscar palavra…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <label htmlFor="vocab-level" className="sr-only">
          Nível
        </label>
        <select
          id="vocab-level"
          className="field"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="todos">Todos os níveis</option>
          {levels.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
      </div>

      {rows.length === 0 ? (
        <p className="panel mt-4 p-6 text-muted">
          Ainda não há palavras. Faça uma aula ou salve palavras do Listening e
          elas aparecem aqui.
        </p>
      ) : (
        <ul className="mt-4 space-y-2" aria-label={`${shown.length} palavras`}>
          {shown.slice(0, 300).map((r) => (
            <li key={r.key} className="panel p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span lang="en" className="text-lg font-bold">
                  {r.en}
                </span>
                <SpeakButton text={r.en} label={`Ouvir ${r.en}`} />
                <span className="text-muted">{r.pt}</span>
                <span className={`chip ml-auto ${STATUS_STYLE[r.status]}`}>
                  {STATUS_LABEL[r.status]}
                </span>
              </div>
              {r.say && (
                <p className="mt-1 text-sm text-muted">Pronúncia: {r.say}</p>
              )}
              {r.example && (
                <p className="mt-1 text-sm" lang="en">
                  “{r.example}”
                </p>
              )}
              <p className="mt-2 text-xs text-muted">
                {[
                  r.level !== "—" ? r.level : null,
                  r.unit || null,
                  r.category,
                  r.source,
                ]
                  .filter(Boolean)
                  .join(" · ")}{" "}
                · {r.reps}{" "}
                {r.reps === 1 ? "acerto seguido" : "acertos seguidos"} ·{" "}
                {r.lapses} {r.lapses === 1 ? "erro" : "erros"}
                {r.last
                  ? ` · revisada em ${DATE.format(new Date(r.last))}`
                  : ""}
              </p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
