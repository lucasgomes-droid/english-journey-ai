import Link from "next/link";
import { PRON_SETS } from "@/content/pronunciation";
import { PAIR_SETS } from "@/content/minimal-pairs";
import { LISTENING } from "@/content/listening";
import { getSession } from "@/lib/data";
import { isAzureConfigured } from "@/lib/speech-server";

export const metadata = { title: "Pronúncia" };

export default async function PronunciaPage() {
  const { supabase, user } = await getSession();
  const [{ data }, { data: pairRows }] = await Promise.all([
    supabase.from("pronunciation_attempts").select("details, overall").eq("user_id", user.id).not("overall", "is", null).order("created_at", { ascending: false }).limit(300),
    supabase.from("pronunciation_attempts").select("details, completeness").eq("user_id", user.id).eq("provider", "minimal-pair").order("created_at", { ascending: false }).limit(400),
  ]);
  // Acerto por par mínimo (palavra entendida como a pessoa quis).
  const pairStats = new Map<string, { ok: number; n: number }>();
  for (const r of pairRows ?? []) {
    const id = ((r.details as { context?: string } | null)?.context ?? "").replace("pair:", "");
    const e = pairStats.get(id) ?? { ok: 0, n: 0 };
    e.n++;
    if (Number(r.completeness) === 100) e.ok++;
    pairStats.set(id, e);
  }
  // Média por conjunto (via contexto salvo: "pron:<id>").
  const bySet = new Map<string, number[]>();
  for (const r of data ?? []) {
    const ctx = (r.details as { context?: string } | null)?.context ?? "";
    if (ctx.startsWith("pron:")) {
      const id = ctx.slice(5).split("#")[0];
      bySet.set(id, [...(bySet.get(id) ?? []), Number(r.overall)]);
    }
  }
  const phonetic = isAzureConfigured();

  return (
    <main>
      <h1 className="font-display text-3xl font-bold">Pronúncia</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Treinos dos sons que mais travam quem fala português. Comece pelos pares mínimos, depois treine frases e faça shadowing.
      </p>
      <h2 className="mt-8 font-display text-2xl font-bold">1. Pares mínimos</h2>
      <p className="mt-1 max-w-2xl text-sm text-muted">Palavras que só mudam por um som (think × sink). Primeiro você treina o ouvido; depois fala e vê qual palavra o reconhecedor de voz entendeu.</p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {PAIR_SETS.map((p) => {
          const st = pairStats.get(p.id);
          const rate = st && st.n >= 3 ? Math.round((st.ok / st.n) * 100) : null;
          return (
            <li key={p.id}>
              <Link href={`/pronuncia/pares/${p.id}`} className="panel flex h-full flex-col gap-1 p-4 transition-colors hover:border-atlantic">
                <span className="flex items-baseline justify-between gap-2">
                  <span className="font-display text-lg font-bold">{p.title}</span>
                  {rate !== null && <span className={`chip ${rate >= 80 ? "bg-correct-bg text-correct" : rate < 60 ? "bg-wrong-bg text-wrong" : ""}`}>{rate}%</span>}
                </span>
                <span className="text-sm text-muted" lang="en">
                  {p.pairs[0].a} × {p.pairs[0].b}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <h2 className="mt-10 font-display text-2xl font-bold">2. Sons em frases</h2>
      {!phonetic && (
        <p className="mt-1 max-w-2xl text-sm text-muted">
          Ouça, repita e compare sua gravação com o modelo. O app confere quais palavras foram reconhecidas (a nota por som exige a análise fonética, que ainda não está ativada).
        </p>
      )}
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {PRON_SETS.map((p) => {
          const scores = bySet.get(p.id);
          const avg = scores?.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;
          return (
            <li key={p.id}>
              <Link href={`/pronuncia/${p.id}`} className="panel flex h-full items-start gap-4 p-5 transition-colors hover:border-atlantic">
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-hero font-display text-lg font-bold text-boarding">{p.title.split(" ")[0]}</span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="font-display text-lg font-bold">{p.title}</span>
                    {avg !== null && <span className={`chip ${avg >= 80 ? "bg-correct-bg text-correct" : avg < 60 ? "bg-wrong-bg text-wrong" : ""}`}>{avg}</span>}
                  </span>
                  <span className="block font-mono text-sm text-atlantic">{p.sound}</span>
                  <span className="mt-1 block text-sm text-muted">{p.why}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <h2 className="mt-10 font-display text-2xl font-bold">3. Shadowing</h2>
      <p className="mt-1 max-w-2xl text-sm text-muted">Repita cada frase logo depois do áudio, imitando ritmo e entonação. É o treino que mais aproxima a sua fala da de um nativo.</p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {LISTENING.map((l) => (
          <li key={l.id} className="min-w-0">
            <Link href={`/pronuncia/shadowing/${l.id}`} className="panel flex items-center gap-3 p-3 transition-colors hover:border-atlantic">
              <span className="chip shrink-0">{l.level}</span>
              <span className="min-w-0 flex-1 overflow-hidden">
                <span className="block truncate font-bold">{l.title}</span>
                <span className="text-xs text-muted">{l.lines.length} frases</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
