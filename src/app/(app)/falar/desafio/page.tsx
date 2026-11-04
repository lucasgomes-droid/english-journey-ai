import Link from "next/link";
import { ArrowLeft, Timer } from "lucide-react";
import { getSession } from "@/lib/data";
import { FLUENCY_TOPICS } from "@/content/speaking-topics";
import { LEVELS } from "@/content/curriculum";

export const metadata = { title: "Desafio de 1 minuto" };

export default async function DesafioPage() {
  const { supabase, user, profile } = await getSession();
  const { data: rows } = await supabase.from("speaking_sessions").select("topic, wpm, created_at").eq("user_id", user.id).eq("kind", "fluency").order("created_at", { ascending: false }).limit(200);
  const best = new Map<string, number>();
  for (const r of rows ?? []) best.set(r.topic, Math.max(best.get(r.topic) ?? 0, r.wpm));
  const level = profile?.current_level ?? "A1";
  const levels = [level, ...LEVELS.map((l) => l.code).filter((c) => c !== level)];
  const recent = (rows ?? []).slice(0, 8).reverse();

  return (
    <main className="mx-auto max-w-3xl">
      <Link href="/praticar" className="inline-flex items-center gap-1 text-sm font-bold text-muted hover:text-ink">
        <ArrowLeft size={16} aria-hidden /> Praticar
      </Link>
      <h1 className="mt-1 font-display text-4xl font-bold">Desafio de 1 minuto</h1>
      <p className="mt-2 text-muted">
        Escolha um tema e fale sem parar por um minuto. O app mede quantas palavras por minuto você fala e as pausas, e o professor mostra como dizer melhor.
      </p>
      {recent.length > 1 && (
        <section className="panel mt-6 p-5">
          <p className="font-bold">Seu ritmo nos últimos desafios (palavras/min)</p>
          <div className="mt-3 flex h-24 items-end gap-2" role="img" aria-label={`Ritmo: ${recent.map((r) => r.wpm).join(", ")}`}>
            {recent.map((r, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-xs text-muted">{r.wpm}</span>
                <div className="w-full rounded-md bg-atlantic" style={{ height: `${Math.max(4, Math.min(80, (r.wpm / 160) * 80))}px` }} />
              </div>
            ))}
          </div>
        </section>
      )}
      {levels.map((lv) => {
        const topics = FLUENCY_TOPICS.filter((t) => t.level === lv);
        if (!topics.length) return null;
        return (
          <section key={lv} className="mt-8">
            <h2 className="font-display text-2xl font-bold">
              {lv} {lv === level && <span className="chip ml-2 align-middle">seu nível</span>}
            </h2>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {topics.map((t) => (
                <li key={t.id}>
                  <Link href={`/falar/desafio/${t.id}`} className="panel flex h-full items-start gap-3 p-4 transition-colors hover:border-atlantic">
                    <Timer size={20} className="mt-0.5 shrink-0 text-atlantic" aria-hidden />
                    <span className="min-w-0 flex-1">
                      <span className="block font-bold" lang="en">
                        {t.en}
                      </span>
                      <span className="block text-sm text-muted">{t.pt}</span>
                    </span>
                    {best.has(t.id) && <span className="chip shrink-0">{best.get(t.id)} p/min</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </main>
  );
}
