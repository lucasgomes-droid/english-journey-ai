"use client";

import { useActionState, useState } from "react";
import { saveProfile, type FormState } from "@/app/actions/account";
import type { Profile } from "@/lib/data";

const MINUTES = [10, 15, 20, 30, 45, 60];
const GOALS = ["Viajar", "Trabalho e carreira", "Morar fora", "Conversar com estrangeiros", "Estudos e provas", "Filmes, séries e música"];

/** XP diário sugerido proporcional ao tempo disponível (≈2 XP por minuto). */
const xpFor = (min: number) => Math.max(10, Math.round((min * 2) / 5) * 5);

export function ProfileForm({ profile, onboarding = false }: { profile: Profile; onboarding?: boolean }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveProfile, {});
  const [minutes, setMinutes] = useState(profile.daily_minutes);
  const [goal, setGoal] = useState(profile.learning_goal ?? "");

  return (
    <form action={action} className="space-y-8">
      {onboarding && <input type="hidden" name="onboarding" value="1" />}
      <label className="block">
        <span className="mb-1.5 block font-bold">Seu nome</span>
        <input name="display_name" defaultValue={profile.display_name} required minLength={2} className="field" />
      </label>

      <fieldset>
        <legend className="mb-2 font-bold">Quanto tempo você tem por dia?</legend>
        <input type="hidden" name="daily_minutes" value={minutes} />
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {MINUTES.map((m) => (
            <button
              type="button"
              key={m}
              onClick={() => setMinutes(m)}
              aria-pressed={minutes === m}
              className={`rounded-xl border-2 px-2 py-3 font-bold ${minutes === m ? "border-atlantic bg-atlantic text-surface" : "border-line bg-surface"}`}
            >
              {m} min
            </button>
          ))}
        </div>
        <p className="mt-2 text-sm text-muted">Meta diária: {xpFor(minutes)} XP. Você pode mudar quando quiser no perfil.</p>
      </fieldset>
      <input type="hidden" name="daily_goal_xp" value={xpFor(minutes)} />
      <input type="hidden" name="weekly_goal_lessons" value={Math.max(2, Math.min(14, Math.round(minutes / 4)))} />

      <fieldset>
        <legend className="mb-2 font-bold">Para que você quer aprender inglês?</legend>
        <input type="hidden" name="learning_goal" value={goal} />
        <div className="flex flex-wrap gap-2">
          {GOALS.map((g) => (
            <button
              type="button"
              key={g}
              onClick={() => setGoal(g)}
              aria-pressed={goal === g}
              className={`rounded-full border-2 px-4 py-2 ${goal === g ? "border-atlantic bg-atlantic text-surface" : "border-line bg-surface"}`}
            >
              {g}
            </button>
          ))}
        </div>
        <p className="mt-2 text-sm text-muted">O professor de IA usa isso para escolher temas de conversa.</p>
      </fieldset>

      {state.error && <p className="rounded-xl bg-wrong-bg px-4 py-3 text-wrong">{state.error}</p>}
      {state.message && <p className="rounded-xl bg-correct-bg px-4 py-3 text-correct">{state.message}</p>}
      <button type="submit" disabled={pending} className={onboarding ? "btn-go w-full text-lg" : "btn-primary"}>
        {pending ? "Salvando…" : onboarding ? "Começar no A1" : "Salvar preferências"}
      </button>
    </form>
  );
}
