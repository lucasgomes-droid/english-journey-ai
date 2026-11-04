import { redirect } from "next/navigation";
import Link from "next/link";
import { Wordmark } from "@/components/brand";
import { getSession } from "@/lib/data";
import { VoiceCapsProvider } from "@/lib/voice";
import { isSttConfigured } from "@/lib/ai";
import { isAzureConfigured, ttsProvider } from "@/lib/speech-server";
import { PlacementTest } from "./placement-test";

export const metadata = { title: "Teste de nivelamento" };

export default async function NivelamentoPage() {
  const { profile } = await getSession();
  if (!profile) redirect("/configuracao");
  return (
    <VoiceCapsProvider caps={{ neural: ttsProvider() !== "none", phonetic: isAzureConfigured(), stt: isSttConfigured() }}>
      <main className="mx-auto max-w-xl px-4 py-10">
        <Link href={profile.onboarded ? "/perfil" : "/boas-vindas"}>
          <Wordmark />
        </Link>
        <h1 className="mt-10 font-display text-4xl font-bold">Teste de nivelamento</h1>
        <p className="mt-3 text-muted">
          24 questões rápidas, do A1 ao B2, com leitura e escuta. Leva uns 8 minutos. Se não souber, escolha “Não sei”: chutar só atrapalha a estimativa.
        </p>
        <PlacementTest current={profile.current_level} />
      </main>
    </VoiceCapsProvider>
  );
}
