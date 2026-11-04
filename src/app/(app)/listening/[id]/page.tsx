import { notFound } from "next/navigation";
import { getListening, LISTENING_RATE } from "@/content/listening";
import { ListeningPlayer } from "./listening-player";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return { title: getListening(id)?.title ?? "Listening" };
}

export default async function ListeningItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = getListening(id);
  if (!item) notFound();
  return <ListeningPlayer item={item} rate={LISTENING_RATE[item.level]} />;
}
