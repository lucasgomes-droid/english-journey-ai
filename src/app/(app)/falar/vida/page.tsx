import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getSession } from "@/lib/data";
import { LifePhrases } from "./life-phrases";

export const metadata = { title: "Fale sobre sua vida" };

export default async function VidaPage() {
  const { supabase, user } = await getSession();
  const { data } = await supabase.from("personal_phrases").select("id, topic, en, pt, source").eq("user_id", user.id).order("created_at", { ascending: false }).limit(300);
  return (
    <main className="mx-auto max-w-2xl">
      <Link href="/praticar" className="inline-flex items-center gap-1 text-sm font-bold text-muted hover:text-ink">
        <ArrowLeft size={16} aria-hidden /> Praticar
      </Link>
      <h1 className="mt-1 font-display text-4xl font-bold">Fale sobre sua vida</h1>
      <p className="mt-2 text-muted">
        Conte sobre você em português. O app transforma isso em frases em inglês, no seu nível, para você treinar em voz alta. São as frases que você mais vai usar numa conversa de verdade.
      </p>
      <LifePhrases initial={data ?? []} />
    </main>
  );
}
