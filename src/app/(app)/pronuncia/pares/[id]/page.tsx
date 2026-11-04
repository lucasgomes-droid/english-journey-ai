import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPairSet } from "@/content/minimal-pairs";
import { PairTrainer } from "./pair-trainer";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return { title: `Pares: ${getPairSet(id)?.title ?? ""}` };
}

export default async function PairPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const set = getPairSet(id);
  if (!set) notFound();
  return (
    <main className="mx-auto max-w-2xl">
      <Link href="/pronuncia" className="inline-flex items-center gap-1 text-sm font-bold text-muted hover:text-ink">
        <ArrowLeft size={16} aria-hidden /> Pronúncia
      </Link>
      <h1 className="mt-1 font-display text-4xl font-bold">{set.title}</h1>
      <p className="font-mono text-atlantic">
        {set.sounds[0]} × {set.sounds[1]}
      </p>
      <p className="mt-3 rounded-2xl bg-boarding/20 p-4">{set.issue}</p>
      <PairTrainer set={set} />
    </main>
  );
}
