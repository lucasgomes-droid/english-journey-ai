"use client";

import { useActionState, useState } from "react";
import { saveProfile, type FormState } from "@/app/actions/account";
import type { Profile } from "@/lib/data";

const MINUTES = [10, 15, 20, 30, 45, 60];
const DAYS = [
  { d: 1, l: "Seg" },
  { d: 2, l: "Ter" },
  { d: 3, l: "Qua" },
  { d: 4, l: "Qui" },
  { d: 5, l: "Sex" },
  { d: 6, l: "Sáb" },
  { d: 0, l: "Dom" },
];
const FOCUS = [
  { k: "speaking", l: "Falar" },
  { k: "listening", l: "Entender o que ouço" },
  { k: "writing", l: "Escrever" },
  { k: "vocabulary", l: "Vocabulário" },
  { k: "grammar", l: "Gramática" },
];
const LEVELS = ["A2", "B1", "B2", "C1", "C2"];
const GOALS = ["Viajar", "Trabalho e carreira", "Morar fora", "Conversar com estrangeiros", "Estudos e provas", "Filmes, séries e música"];

/** XP diário sugerido proporcional ao tempo disponível (≈2 XP por minuto). */
const xpFor = (min: number) => Math.max(10, Math.round((min * 2) / 5) * 5);

export function ProfileForm({ profile, onboarding = false }: { profile: Profile; onboarding?: boolean }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveProfile, {});
  const [minutes, setMinutes] = useState(profile.daily_minutes);
  const [goal, setGoal] = useState(profile.learning_goal ?? "");
  const [days, setDays] = useState<number[]>(profile.study_days?.length ? profile.study_days : [0, 1, 2, 3, 4, 5, 6]);
  const [focus, setFocus] = useState<string[]>(profile.focus_skills ?? []);
  const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

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

      <fieldset>
        <legend className="mb-2 font-bold">Em quais dias você estuda?</legend>
        {days.map((d) => (
          <input key={d} type="hidden" name="study_days" value={d} />
        ))}
        <div className="flex flex-wrap gap-2">
          {DAYS.map((d) => (
            <button
              type="button"
              key={d.d}
              onClick={() => setDays((x) => (x.includes(d.d) && x.length === 1 ? x : toggle(x, d.d)))}
              aria-pressed={days.includes(d.d)}
              className={`min-w-14 rounded-xl border-2 px-3 py-2 font-bold ${days.includes(d.d) ? "border-atlantic bg-atlantic text-surface" : "border-line bg-surface"}`}
            >
              {d.l}
            </button>
          ))}
        </div>
        <p className="mt-2 text-sm text-muted">O cronograma da semana usa só esses dias. Nos outros, descanso.</p>
      </fieldset>

      {!onboarding && (
        <>
          <fieldset>
            <legend className="mb-2 font-bold">O que você quer priorizar?</legend>
            {focus.map((f) => (
              <input key={f} type="hidden" name="focus_skills" value={f} />
            ))}
            <div className="flex flex-wrap gap-2">
              {FOCUS.map((f) => (
                <button
                  type="button"
                  key={f.k}
                  onClick={() => setFocus((x) => toggle(x, f.k))}
                  aria-pressed={focus.includes(f.k)}
                  className={`rounded-full border-2 px-4 py-2 ${focus.includes(f.k) ? "border-atlantic bg-atlantic text-surface" : "border-line bg-surface"}`}
                >
                  {f.l}
                </button>
              ))}
            </div>
            <p className="mt-2 text-sm text-muted">Ganham mais tempo no plano. As competências em que você erra mais também ganham, automaticamente.</p>
          </fieldset>

          <fieldset className="grid gap-4 sm:grid-cols-3">
            <legend className="mb-2 font-bold">Meta e prazo (opcional)</legend>
            <label className="block">
              <span className="mb-1.5 block text-sm">Nível que quer alcançar</span>
              <select name="target_level" defaultValue={profile.target_level ?? ""} className="field">
                <option value="">Sem meta</option>
                {LEVELS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm">Até quando</span>
              <input type="date" name="target_date" defaultValue={profile.target_date ?? ""} className="field" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm">Revisões por dia (máx.)</span>
              <select name="daily_review_limit" defaultValue={String(profile.daily_review_limit ?? 20)} className="field">
                {[10, 20, 30, 50].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
          </fieldset>
        </>
      )}

      {state.error && <p className="rounded-xl bg-wrong-bg px-4 py-3 text-wrong">{state.error}</p>}
      {state.message && <p className="rounded-xl bg-correct-bg px-4 py-3 text-correct">{state.message}</p>}
      <button type="submit" disabled={pending} className={onboarding ? "btn-go w-full text-lg" : "btn-primary"}>
        {pending ? "Salvando…" : onboarding ? "Começar no A1" : "Salvar preferências"}
      </button>
    </form>
  );
}
