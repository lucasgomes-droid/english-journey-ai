import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getTopic } from "@/content/speaking-topics";
import { FreeSpeaking } from "@/components/free-speaking";
import { SpeakButton } from "@/components/speak-button";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return { title: `Desafio: ${getTopic(id)?.pt ?? ""}` };
}

export default async function DesafioTopicPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const topic = getTopic(id);
  if (!topic) notFound();
  return (
    <main className="mx-auto max-w-2xl">
      <Link href="/falar/desafio" className="inline-flex items-center gap-1 text-sm font-bold text-muted hover:text-ink">
        <ArrowLeft size={16} aria-hidden /> Desafio de 1 minuto
      </Link>
      <p className="mt-1 text-sm font-bold text-atlantic">{topic.level}</p>
      <h1 className="flex items-start gap-3 font-display text-3xl font-bold" lang="en">
        {topic.en} <SpeakButton text={topic.en} />
      </h1>
      <p className="mt-1 text-muted">{topic.pt}</p>
      <div className="mt-4 rounded-2xl bg-boarding/20 p-4">
        <p className="text-sm font-bold">Para começar:</p>
        <ul className="mt-1 flex flex-wrap gap-2">
          {topic.starters.map((s) => (
            <li key={s} className="rounded-full bg-surface px-3 py-1 text-sm" lang="en">
              {s}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <FreeSpeaking kind="fluency" topicId={topic.id} maxSeconds={60} />
      </div>
    </main>
  );
}
