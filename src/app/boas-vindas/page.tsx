import { redirect } from "next/navigation";
import { Wordmark } from "@/components/brand";
import { getSession } from "@/lib/data";
import { ProfileForm } from "@/components/profile-form";

export const metadata = { title: "Boas-vindas" };

export default async function WelcomePage() {
  const { profile } = await getSession();
  if (!profile) redirect("/configuracao");
  if (profile.onboarded) redirect("/");
  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <Wordmark />
      <h1 className="mt-10 font-display text-4xl font-bold">Vamos montar sua rotina, {profile.display_name.split(" ")[0]}.</h1>
      <p className="mt-3 text-muted">
        Você começa no A1, com explicações em português. Diga quanto tempo tem por dia e montamos um plano diário com aula, revisão e conversa.
      </p>
      <div className="mt-8">
        <ProfileForm profile={profile} onboarding />
      </div>
    </main>
  );
}
