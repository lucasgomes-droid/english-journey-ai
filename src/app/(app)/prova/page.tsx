import { redirect } from "next/navigation";
import { getSession } from "@/lib/data";

export default async function ProvaIndex() {
  const { profile } = await getSession();
  redirect(`/prova/${profile?.current_level ?? "A1"}`);
}
