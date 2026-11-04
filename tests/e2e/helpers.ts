/** Utilidades dos testes ponta a ponta (ambiente local com Postgres na porta 5499). */
import { execSync } from "node:child_process";
import type { Page } from "playwright";
import { orderTokens } from "../../src/lib/grading";
import type { Exercise, Lesson } from "../../src/content/types";

export const BASE = process.env.BASE_URL ?? "http://localhost:3000";
export const SHOTS = process.env.SHOTS_DIR ?? "./screenshots";

/** Executa SQL no banco local de testes. */
export function sql(q: string) {
  const cmd = process.env.PSQL_CMD ?? `su postgres -c "psql -p 5499 -h /var/tmp -d sbtest -v ON_ERROR_STOP=1 -q -t -A"`;
  return execSync(cmd, { input: q }).toString().trim();
}

export const uid = (email: string) => `(select id from auth.users where email = '${email}')`;

/** Marca como concluídas todas as aulas de um nível, menos o teste final. */
export function completeLevelExceptFinal(email: string, level: string) {
  const lv = level.toLowerCase();
  sql(`insert into public.lesson_progress (user_id, lesson_id, status, best_score, last_score, attempts, completed_at, updated_at)
       select ${uid(email)}, id, 'completed', 90, 90, 1, now() - interval '1 day', now() - interval '1 day' from public.lessons
       where id like '${lv}-%' and id <> '${lv}-final-test'
       on conflict (user_id, lesson_id) do update set status = 'completed';`);
}

export async function signup(page: Page, prefix: string) {
  const email = `${prefix}${Date.now()}@example.com`;
  await page.goto(`${BASE}/cadastro`);
  await page.getByPlaceholder("Seu nome").fill("Aluno Teste");
  await page.getByPlaceholder("voce@email.com").fill(email);
  await page.getByPlaceholder("Mínimo de 8 caracteres").fill("senhaforte123");
  await page.getByRole("button", { name: "Criar conta" }).click();
  await page.waitForURL("**/boas-vindas");
  await page.getByRole("button", { name: "Começar no A1" }).click();
  await page.waitForURL(`${BASE}/`);
  return email;
}

export async function answer(page: Page, ex: Exercise, wrong = false) {
  const section = page.locator("main section, main .panel").first();
  switch (ex.type) {
    case "multiple_choice":
      return section.getByRole("radio").nth(wrong ? (ex.answer + 1) % ex.options.length : ex.answer).click();
    case "listening":
      if (ex.options) return section.getByRole("radio").nth(wrong ? (ex.answer! + 1) % ex.options.length : ex.answer!).click();
      return section.locator("input, textarea").fill(wrong ? "zzz" : ex.accepted![0]);
    case "translate":
    case "fill_blank":
      return section.locator("input, textarea").fill(wrong ? "zzz" : ex.accepted[0]);
    case "word_order": {
      const words = orderTokens(ex.answer);
      const seq = wrong ? [...words].reverse() : words;
      for (const w of seq) await section.locator(`[data-bank-word="${w.replace(/"/g, '\\"')}"]:not([disabled])`).first().click();
      return;
    }
    case "match_pairs":
      for (const [l, r] of ex.pairs) {
        await section.getByRole("button", { name: l, exact: true }).click();
        await section.getByRole("button", { name: r, exact: true }).click();
      }
  }
}

/** Faz uma aula inteira no modo digitar. `wrong`: erra de propósito tudo o que der. */
export async function doLesson(page: Page, lesson: Lesson, opts: { wrong?: boolean } = {}) {
  await page.goto(`${BASE}/aula/${lesson.id}`);
  await page.getByRole("heading", { level: 1, name: lesson.title, exact: true }).waitFor();
  for (let i = 0; i < 5; i++) {
    const btn = page.getByRole("button", { name: /^(Continuar|Praticar|Começar avaliação|Falar em voz alta)$/ });
    if (!(await btn.isVisible())) break;
    const label = await btn.textContent();
    await btn.click();
    if (label === "Praticar" || label === "Começar avaliação") break;
  }
  for (let i = 0; i < lesson.exercises.length; i++) {
    const ex = lesson.exercises[i];
    await page.getByText(`Exercício ${i + 1} de ${lesson.exercises.length}`).waitFor();
    const wrong = !!opts.wrong && ex.type !== "match_pairs";
    await answer(page, ex, wrong);
    await page.getByRole("button", { name: "Verificar" }).click();
    const st = (await page.getByRole("status").first().textContent()) ?? "";
    if (!wrong && !/Correto/.test(st)) throw new Error(`${ex.id}: ${st}`);
    await page.getByRole("button", { name: "Continuar" }).click();
  }
  await page.getByText(/\+\d+ XP/).first().waitFor({ timeout: 20000 });
}
