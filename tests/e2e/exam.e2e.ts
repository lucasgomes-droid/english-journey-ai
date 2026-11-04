/**
 * Fase 1 — prova de nível de ponta a ponta:
 * reprovar na escrita → plano de recuperação → nova tentativa bloqueada → cumprir o plano →
 * aprovar a escrita → reprovar no Speaking → plano → cumprir → aprovar Speaking →
 * Conversation → sobe para o A2 e o A2 abre.
 * Uso (ambiente local com IA simulada): npx tsx tests/e2e/exam.e2e.ts
 */
import { writeFileSync } from "node:fs";
import { chromium, type Page } from "playwright";
import { getLesson } from "../../src/content/curriculum";
import { BASE, SHOTS, completeLevelExceptFinal, doLesson, signup, sql, uid } from "./helpers";

const MODE = "/var/tmp/sb/exam-mode";
let current: Page | null = null;

/** Simula o aluno cumprindo as tarefas do plano aberto (atividades reais nas tabelas). */
function fulfilPlan(email: string, part: string) {
  const tasks = JSON.parse(sql(`select tasks from public.recovery_plans where user_id = ${uid(email)} and part = '${part}' and completed_at is null;`)) as { kind: string; ref?: string; target: number }[];
  for (const t of tasks) {
    const n = t.target;
    if (t.kind === "lesson") sql(`update public.lesson_progress set last_score = 95, updated_at = now() + interval '1 second' where user_id = ${uid(email)} and lesson_id = '${t.ref}';`);
    if (t.kind === "review") sql(`insert into public.activity_log (user_id, kind, title, xp, local_date, created_at) select ${uid(email)}, 'review', 'Revisão', 1, current_date, now() + interval '1 second' from generate_series(1, ${n});`);
    if (t.kind === "listening") sql(`insert into public.listening_results (user_id, item_id, level_code, score, total, created_at) select ${uid(email)}, 'x', 'A1', 3, 3, now() + interval '1 second' from generate_series(1, ${n});`);
    if (t.kind === "speaking") sql(`insert into public.speaking_sessions (user_id, kind, topic, created_at) select ${uid(email)}, 'fluency', 'x', now() + interval '1 second' from generate_series(1, ${n});`);
    if (t.kind === "pronunciation") sql(`insert into public.pronunciation_attempts (user_id, reference_text, provider, created_at) select ${uid(email)}, 'x', 'whisper', now() + interval '1 second' from generate_series(1, ${n});`);
  }
  return tasks.length;
}

async function speakingPart(page: Page) {
  await page.goto(`${BASE}/prova/A1/speaking`);
  for (let i = 0; i < 2; i++) {
    await page.getByRole("button", { name: "Gravar resposta" }).click();
    await page.getByRole("button", { name: "Terminei" }).waitFor();
    await page.waitForTimeout(9500);
    await page.getByRole("button", { name: "Terminei" }).click();
    await page.getByRole("button", { name: "Regravar" }).waitFor();
    if (i === 0) await page.getByRole("button", { name: "Próxima pergunta" }).click();
  }
  await page.getByRole("button", { name: "Enviar para avaliação" }).click();
}

(async () => {
  const browser = await chromium.launch({
    args: ["--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream", "--use-file-for-fake-audio-capture=/var/tmp/sb/fake-mic.wav%noloop", "--autoplay-policy=no-user-gesture-required"],
  });
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, permissions: ["microphone"] });
  const page = await ctx.newPage();
  current = page;
  await page.addInitScript(() => localStorage.setItem("ej-speak-mode", "0"));
  page.on("pageerror", (e) => console.error("ERRO NA PÁGINA:", e.message));
  writeFileSync(MODE, "pass");

  const email = await signup(page, "prova");
  completeLevelExceptFinal(email, "A1");
  const final = getLesson("a1-final-test")!;

  // 1) Escrita: reprova → plano.
  await doLesson(page, final, { wrong: true });
  await page.getByText("Parte escrita da prova A1: plano de recuperação criado").waitFor();
  await page.screenshot({ path: `${SHOTS}/prova-escrita-reprovada.png`, fullPage: true });
  await page.goto(`${BASE}/aula/${final.id}`);
  await page.getByText("Cumpra o plano de recuperação para liberar uma nova tentativa.").waitFor();
  await page.getByRole("link", { name: "Ver meu plano" }).click();
  await page.waitForURL("**/prova/A1");
  await page.getByText("Seu plano de recuperação").waitFor();
  if (await page.getByRole("link", { name: "Tentar de novo" }).count()) throw new Error("nova tentativa liberada antes do plano");
  await page.screenshot({ path: `${SHOTS}/prova-plano.png`, fullPage: true });
  console.log("✓ reprovou na escrita: plano criado e nova tentativa bloqueada");

  // 2) Cumpre o plano → nova tentativa → aprova a escrita.
  const n = fulfilPlan(email, "written");
  await page.reload();
  await page.getByRole("link", { name: "Tentar de novo" }).waitFor();
  console.log(`✓ plano cumprido (${n} tarefas): nova tentativa liberada`);
  await doLesson(page, final);
  await page.getByText("Parte escrita da prova A1 aprovada").waitFor();
  const lvl = sql(`select current_level from public.profiles where id = ${uid(email)};`);
  if (lvl !== "A1") throw new Error("subiu de nível só com a escrita: " + lvl);
  console.log("✓ escrita aprovada; ainda no A1 (faltam Speaking e Conversation)");

  // 3) Speaking: reprova → plano → cumpre → aprova.
  writeFileSync(MODE, "fail");
  await speakingPart(page);
  await page.getByText("Ainda não foi desta vez").waitFor({ timeout: 30000 });
  await page.screenshot({ path: `${SHOTS}/prova-speaking-reprovado.png`, fullPage: true });
  await page.goto(`${BASE}/prova/A1/speaking`);
  await page.getByText("Esta parte não está disponível agora").waitFor();
  await page.goto(`${BASE}/prova/A1`);
  await page.getByText("Fazer 2 desafios de fala de 1 minuto").waitFor();
  console.log("✓ reprovou no Speaking: plano criado e página bloqueada");
  fulfilPlan(email, "speaking");
  writeFileSync(MODE, "pass");
  await speakingPart(page);
  await page.getByText("Aprovado nesta parte").waitFor({ timeout: 30000 });
  await page.screenshot({ path: `${SHOTS}/prova-speaking-aprovado.png`, fullPage: true });
  console.log("✓ Speaking aprovado depois do plano");

  // 4) Conversation → sobe para o A2.
  await page.goto(`${BASE}/prova/A1/conversa`);
  await page.getByRole("button", { name: "Começar a conversa" }).click();
  await page.getByText("Hi! I'm Sam. What's your name?").waitFor();
  const lines = ["My name is Lucas.", "I'm from Brazil, from Sao Paulo.", "I work in logistics.", "I like football and music. And you?", "Yes, I have two children."];
  for (const l of lines) {
    await page.getByPlaceholder("Ou digite sua resposta…").fill(l);
    await page.getByRole("button", { name: "Enviar" }).click();
    await page.waitForFunction(() => {
      const el = document.querySelector<HTMLInputElement>("#exam-draft");
      return !el || !el.disabled;
    }, null, { timeout: 30000 });
  }
  await page.getByText("subiu para o A2").waitFor({ timeout: 30000 });
  await page.screenshot({ path: `${SHOTS}/prova-aprovado.png`, fullPage: true });
  if (sql(`select current_level from public.profiles where id = ${uid(email)};`) !== "A2") throw new Error("não subiu para o A2");
  await page.locator("header").getByText("A2", { exact: true }).first().waitFor({ timeout: 10000 });
  console.log("✓ Conversation aprovada: subiu para o A2");

  // 5) O A2 abre.
  await page.goto(`${BASE}/aula/a2-m1-l1`);
  await page.getByRole("heading", { level: 1, name: getLesson("a2-m1-l1")!.title, exact: true }).waitFor();
  await page.goto(`${BASE}/prova/A1`);
  await page.getByText("Nível A1 comprovado").waitFor();
  await page.screenshot({ path: `${SHOTS}/prova-a1-comprovado.png`, fullPage: true });
  console.log("✓ A2 aberto e prova do A1 marcada como comprovada");
  await browser.close();
})().catch(async (e) => {
  await current?.screenshot({ path: `${SHOTS}/prova-falha.png`, fullPage: true }).catch(() => null);
  console.error("FALHOU:", e);
  process.exit(1);
});
