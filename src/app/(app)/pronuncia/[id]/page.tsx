import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPronSet } from "@/content/pronunciation";
import { PronounceCard } from "@/components/pronounce-card";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return { title: `Pronúncia: ${getPronSet(id)?.title ?? ""}` };
}

export default async function PronSetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const set = getPronSet(id);
  if (!set) notFound();
  return (
    <main className="mx-auto max-w-2xl">
      <Link href="/pronuncia" className="inline-flex items-center gap-1 text-sm font-bold text-muted hover:text-ink">
        <ArrowLeft size={16} aria-hidden /> Pronúncia
      </Link>
      <h1 className="mt-1 font-display text-4xl font-bold">{set.title}</h1>
      <p className="font-mono text-atlantic">{set.sound}</p>
      <div className="mt-4 space-y-2 rounded-2xl bg-boarding/20 p-4">
        <p>
          <strong>Por que é difícil:</strong> {set.why}
        </p>
        <p>
          <strong>Como fazer:</strong> {set.how}
        </p>
      </div>
      <div className="mt-6 space-y-4">
        {set.items.map((it, i) => (
          <PronounceCard key={it.en} text={it.en} translation={it.pt} context={`pron:${set.id}#${i}`} />
        ))}
      </div>
    </main>
  );
}
