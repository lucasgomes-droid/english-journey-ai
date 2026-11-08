/**
 * Perfil → "Recomeçar do zero": exige digitar RESETAR, apaga todo o progresso do aluno
 * (sem tocar nos dados de outros alunos) e volta às boas-vindas no A1.
 * Uso: npx tsx tests/e2e/reset.e2e.ts
 */
import { chromium, type Page } from "playwright";
import { getLesson } from "../../src/content/curriculum";
import { BASE, SHOTS, doLesson, signup, sql, uid } from "./helpers";

let current: Page | null = null;
const TABLES = ["lesson_progress", "exercise_answers", "review_items", "activity_log", "exam_attempts", "recovery_plans", "practice_plans", "conversations", "messages", "personal_phrases"];
const count = (email: string) => Object.fromEntries(TABLES.map((t) => [t, Number(sql(`select count(*) from public.${t} where user_id = ${uid(email)};`))]));

(async () => {
  const browser = await chromium.launch();
  const other = await browser.newPage();
  await other.addInitScript(() => localStorage.setItem("ej-speak-mode", "0"));
  const otherEmail = await signup(other, "outro");
  await doLesson(other, getLesson("a1-m4-l1")!);

  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  current = page;
  await page.addInitScript(() => localStorage.setItem("ej-speak-mode", "0"));
  const email = await signup(page, "reset");
  const u = uid(email);
  await doLesson(page, getLesson("a1-m4-l1")!);
  sql(`update public.profiles set current_level = 'B1', streak_best = 9 where id = ${u};
       insert into public.exam_attempts (user_id, level_code, part, score, passed) values (${u}, 'A1', 'written', 50, false);
       insert into public.recovery_plans (user_id, level_code, part, tasks) values (${u}, 'A1', 'written', '[]');
       insert into public.practice_plans (user_id, category) values (${u}, 'questions');
       with c as (insert into public.conversations (user_id, level_code, title) values (${u}, 'A1', 'x') returning id)
       insert into public.messages (conversation_id, user_id, role, content) select id, ${u}, 'user', 'hi' from c;
       insert into public.personal_phrases (user_id, topic, en, pt) values (${u}, 't', 'Hi', 'Oi');`);
  const before = count(email);
  if (Object.values(before).some((n) => n === 0)) throw new Error("dados de teste incompletos: " + JSON.stringify(before));
  const otherBefore = count(otherEmail);

  await page.goto(`${BASE}/perfil`);
  await page.getByRole("button", { name: "Resetar meu progresso" }).click();
  const dialog = page.getByRole("dialog", { name: "Apagar todo o progresso?" });
  if (await dialog.getByRole("button", { name: "Apagar e recomeçar" }).isEnabled()) throw new Error("botão deveria exigir a confirmação");
  await dialog.getByLabel("Para confirmar, digite RESETAR").fill("resetar");
  await page.screenshot({ path: `${SHOTS}/reset-confirmar.png` });
  await dialog.getByRole("button", { name: "Apagar e recomeçar" }).click();
  await page.waitForURL("**/boas-vindas", { timeout: 20000 });
  console.log("✓ confirmação digitada; voltou para as boas-vindas");

  const after = count(email);
  const left = Object.entries(after).filter(([, n]) => n > 0);
  if (left.length) throw new Error("sobrou progresso: " + JSON.stringify(left));
  const prof = sql(`select current_level || ',' || xp_total || ',' || streak_best || ',' || onboarded from public.profiles where id = ${u};`);
  if (prof !== "A1,0,0,false") throw new Error("perfil não reiniciado: " + prof);
  if (JSON.stringify(count(otherEmail)) !== JSON.stringify(otherBefore)) throw new Error("apagou dados de outro aluno!");
  console.log("✓ todo o progresso apagado, perfil no A1 com 0 XP; dados de outro aluno intactos");

  await page.getByRole("button", { name: "Começar no A1" }).click();
  await page.waitForURL(`${BASE}/`);
  await page.getByText("Continuar de onde parei:").waitFor();
  await page.getByText(getLesson("a1-m4-l1")!.title).first().waitFor();
  console.log("✓ recomeçou do zero na primeira aula");
  await browser.close();
})().catch(async (e) => {
  await current?.screenshot({ path: `${SHOTS}/reset-falha.png`, fullPage: true }).catch(() => null);
  console.error("FALHOU:", e);
  process.exit(1);
});
