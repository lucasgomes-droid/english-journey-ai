import Link from "next/link";
import { getExercise, getVocab } from "@/content/curriculum";
import { getSession } from "@/lib/data";
import { ReviewSession, type ReviewCard } from "./review-session";

export const metadata = { title: "Revisão" };

export default async function ReviewPage() {
  const { supabase, user } = await getSession();
  const now = new Date().toISOString();
  const [{ data }, { count: total }, { data: upcoming }] = await Promise.all([
    supabase.from("review_items").select("item_type, item_id, lapses").eq("user_id", user.id).lte("due_at", now).order("due_at").limit(20),
    supabase.from("review_items").select("item_id", { count: "exact", head: true }).eq("user_id", user.id),
    supabase.from("review_items").select("due_at").eq("user_id", user.id).gt("due_at", now).order("due_at").limit(1),
  ]);

  const cards: ReviewCard[] = [];
  for (const r of data ?? []) {
    if (r.item_type === "vocab") {
      const v = getVocab(r.item_id);
      if (v) cards.push({ kind: "vocab", id: v.id, pt: v.pt, en: v.en, say: v.say, struggling: r.lapses >= 2 });
    } else if (r.item_type === "exercise") {
      const e = getExercise(r.item_id);
      if (e) cards.push({ kind: "exercise", id: e.exercise.id, exercise: e.exercise, struggling: r.lapses >= 2 });
    }
  }

  return (
    <main className="mx-auto max-w-2xl">
      <h1 className="font-display text-4xl font-bold">Revisão</h1>
      <p className="mt-2 text-muted">
        Repetição espaçada: o que você acerta volta cada vez mais tarde; o que você erra volta logo. {total ?? 0} itens na sua memória.
      </p>
      {cards.length === 0 ? (
        <div className="panel mt-8 p-8 text-center">
          <p className="font-display text-2xl font-bold">Tudo revisado por agora</p>
          <p className="mt-2 text-muted">
            {upcoming?.[0]
              ? `Próxima revisão em ${new Date(upcoming[0].due_at).toLocaleString("pt-BR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}.`
              : "Conclua uma aula para colocar palavras novas na fila."}
          </p>
          <Link href="/trilha" className="btn-primary mt-6">
            Ir para a trilha
          </Link>
        </div>
      ) : (
        <ReviewSession cards={cards} />
      )}
    </main>
  );
}
