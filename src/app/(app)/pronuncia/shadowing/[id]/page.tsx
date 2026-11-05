import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getListening, LISTENING_RATE } from "@/content/listening";
import { ShadowPlayer } from "./shadow-player";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return { title: `Shadowing: ${getListening(id)?.title ?? ""}` };
}

export default async function ShadowPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = getListening(id);
  if (!item) notFound();
  return (
    <main className="mx-auto max-w-2xl">
      <Link href="/pronuncia" className="inline-flex items-center gap-1 text-sm font-bold text-muted hover:text-ink">
        <ArrowLeft size={16} aria-hidden /> Pronúncia
      </Link>
      <p className="mt-1 text-sm font-bold text-atlantic">Shadowing · {item.level}</p>
      <h1 className="font-display text-3xl font-bold">{item.title}</h1>
      <p className="mt-3 rounded-2xl bg-boarding/20 p-4">
        Ouça a frase e repita logo em seguida, imitando o ritmo, a entonação e as pausas, como uma sombra. O microfone abre sozinho quando o áudio termina.
      </p>
      <ShadowPlayer item={item} rate={LISTENING_RATE[item.level]} />
    </main>
  );
}
