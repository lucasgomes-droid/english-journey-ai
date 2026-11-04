import { getSession } from "@/lib/data";
import { SCENARIOS } from "@/content/scenarios";
import { ScenarioPicker } from "./scenario-picker";

export const metadata = { title: "Conversar" };

export default async function ConversarPage() {
  const { profile } = await getSession();
  const scenarios = SCENARIOS.map((s) => ({ id: s.id, title: s.title, category: s.category, name: s.character.name, role: s.character.role, look: s.character.look }));
  return (
    <main>
      <h1 className="font-display text-4xl font-bold">Conversa livre</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Escolha uma situação da vida real e converse com um personagem por texto ou voz. Ele reage ao que você diz, faz perguntas inesperadas e corrige seus erros em português.
      </p>
      <ScenarioPicker scenarios={scenarios} defaultLevel={profile?.current_level ?? "A1"} />
    </main>
  );
}
