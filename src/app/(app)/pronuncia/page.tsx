import Link from "next/link";
import { PRON_SETS } from "@/content/pronunciation";
import { getSession } from "@/lib/data";
import { isAzureConfigured } from "@/lib/speech-server";

export const metadata = { title: "Pronúncia" };

export default async function PronunciaPage() {
  const { supabase, user } = await getSession();
  const { data } = await supabase.from("pronunciation_attempts").select("details, overall").eq("user_id", user.id).not("overall", "is", null).order("created_at", { ascending: false }).limit(300);
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
      <h1 className="font-display text-4xl font-bold">Pronúncia</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Treinos dos sons que mais travam quem fala português. Ouça o modelo, repita e veja sua nota por palavra e por som.
      </p>
      {!phonetic && (
        <p className="mt-4 max-w-2xl rounded-2xl bg-boarding/20 p-4 text-sm">
          A análise fonética (nota por som) ainda não está ativada no servidor. Por enquanto o app confere se cada palavra foi reconhecida. Para ativar, configure o Azure Speech (veja o README).
        </p>
      )}
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {PRON_SETS.map((p) => {
          const scores = bySet.get(p.id);
          const avg = scores?.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;
          return (
            <li key={p.id}>
              <Link href={`/pronuncia/${p.id}`} className="panel flex h-full items-start gap-4 p-5 transition-colors hover:border-atlantic">
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-[#0e4d57] font-display text-lg font-bold text-boarding">{p.title.split(" ")[0]}</span>
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
    </main>
  );
}
