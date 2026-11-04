import { getSession } from "@/lib/data";
import { CATEGORIES, SCENARIOS } from "@/content/scenarios";
import { ScenarioPicker } from "./scenario-picker";

export const metadata = { title: "Conversar" };

export default async function ConversarPage() {
  const { profile } = await getSession();
  const scenarios = SCENARIOS.map((s) => ({ id: s.id, title: s.title, category: s.category, name: s.character.name, role: s.character.role, look: s.character.look, place: s.place, mission: s.mission_pt }));
  return (
    <main>
      <h1 className="font-display text-4xl font-bold">Conversa livre</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Escolha uma situação da vida real e converse com um personagem por texto ou voz. Cada cena tem uma missão. No A1 e no A2 a conversa é simples; do B1 em diante o personagem cria problemas reais para você resolver. No fim, veja o relatório com nota, erros e expressões novas.
      </p>
      <ScenarioPicker scenarios={scenarios} categoryOrder={CATEGORIES} defaultLevel={profile?.current_level ?? "A1"} />
    </main>
  );
}
