import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getSession } from "@/lib/data";
import { EVERY_LESSON, getModule } from "@/content/curriculum";
import { wordPriority, wordStatus, type WordHistory } from "@/lib/vocab-status";
import { VocabList, type VocabRow } from "./vocab-list";

export const metadata = { title: "Vocabulário" };

const SOURCE_LABEL: Record<string, string> = {
  life: "Sua vida",
  speaking: "Fala",
  conversation: "Conversa",
  listening: "Listening",
  vocab: "Você salvou",
};

export default async function VocabularioPage() {
  const { supabase, user } = await getSession();
  const [{ data: items }, { data: phrases }] = await Promise.all([
    supabase
      .from("review_items")
      .select(
        "item_type, item_id, repetitions, lapses, interval_days, due_at, last_reviewed_at",
      )
      .eq("user_id", user.id)
      .in("item_type", ["vocab", "phrase"])
      .limit(3000),
    supabase
      .from("personal_phrases")
      .select("id, topic, en, pt, source, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1000),
  ]);
  const hist = new Map<string, WordHistory>();
  for (const r of items ?? []) hist.set(`${r.item_type}:${r.item_id}`, r);
  // Momento da requisição (componente de servidor; não re-renderiza no cliente).
  // eslint-disable-next-line react-hooks/purity
  const now = Date.now();

  const rows: VocabRow[] = [];
  for (const l of EVERY_LESSON) {
    const mod = getModule(l.moduleId);
    for (const v of l.vocabulary) {
      const h = hist.get(`vocab:${v.id}`);
      if (!h) continue; // só palavras de aulas que o aluno já estudou
      const status = wordStatus(h, now);
      rows.push({
        key: v.id,
        en: v.en,
        pt: v.pt,
        say: v.say,
        example:
          v.example?.en ??
          l.examples.find((e) =>
            e.en.toLowerCase().includes(v.en.toLowerCase()),
          )?.en ??
          "",
        category: l.title,
        unit: mod?.title ?? "Mini-aula",
        level: mod?.level ?? "—",
        source: "Aula",
        status,
        reps: h.repetitions,
        lapses: h.lapses,
        last: h.last_reviewed_at,
        priority: wordPriority(status, h, now),
      });
    }
  }
  for (const p of phrases ?? []) {
    const h = hist.get(`phrase:ph-${p.id}`);
    const status = wordStatus(h, now);
    rows.push({
      key: `ph-${p.id}`,
      en: p.en,
      pt: p.pt,
      say: "",
      example: "",
      category: p.topic,
      unit: "",
      level: "—",
      source: SOURCE_LABEL[p.source] ?? p.source,
      status,
      reps: h?.repetitions ?? 0,
      lapses: h?.lapses ?? 0,
      last: h?.last_reviewed_at ?? null,
      priority: wordPriority(status, h, now),
    });
  }
  rows.sort((a, b) => a.priority - b.priority || a.en.localeCompare(b.en));

  return (
    <main className="mx-auto max-w-3xl">
      <Link
        href="/praticar"
        className="inline-flex items-center gap-1 text-sm font-bold text-muted hover:text-ink"
      >
        <ArrowLeft size={16} aria-hidden /> Praticar
      </Link>
      <h1 className="mt-1 font-display text-4xl font-bold">Vocabulário</h1>
      <p className="mt-2 text-muted">
        Tudo o que você já estudou e salvou. As palavras que você está
        esquecendo aparecem primeiro e entram na revisão.
      </p>
      <VocabList rows={rows} />
    </main>
  );
}
