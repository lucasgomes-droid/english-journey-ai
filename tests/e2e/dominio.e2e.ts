/**
 * M1 — Meu progresso com 4 indicadores (Atividade, Desempenho, Domínio, Retenção):
 * - conta nova: sem dados, sem nota inventada;
 * - uma aula perfeita num dia só NÃO conta como domínio (aparece em "Quase dominados");
 * - respostas em 2 dias → dominado; certo de novo 7+ dias depois → retido;
 * - cada número mostra a amostra e a confiabilidade.
 * Uso (ambiente local com IA simulada): npx tsx tests/e2e/dominio.e2e.ts
 */
import { chromium } from "playwright";
import { ALL_LESSONS } from "../../src/content/curriculum";
import { BASE, SHOTS, doLesson, signup, sql, uid } from "./helpers";

(async () => {
  const browser = await chromium.launch();
  const page = await (await browser.newContext({ viewport: { width: 390, height: 844 } })).newPage();
  await page.addInitScript(() => localStorage.setItem("ej-speak-mode", "0"));
  page.on("pageerror", (e) => console.error("ERRO NA PÁGINA:", e.message));
  const email = await signup(page, "dom");
  const lesson = ALL_LESSONS[0];
  const total = ALL_LESSONS.filter((l) => l.kind === "lesson" && l.moduleId.startsWith("a1")).length;
  const panel = (name: string) => page.getByRole("region", { name, exact: true });
  const open = async () => {
    await page.goto(`${BASE}/meu-professor`);
    await page.getByRole("heading", { name: "Você está aprendendo?" }).waitFor();
  };

  await open();
  await panel("Domínio").getByText(`de ${total} objetivos`).waitFor();
  if (!/^0\b/.test((await panel("Domínio").locator("p").nth(1).innerText()).trim())) throw new Error("conta nova com domínio");
  await panel("Retenção").getByText("Sem dados ainda").waitFor();
  console.log(`✓ conta nova: 0 de ${total} objetivos do A1, sem dados de retenção (nada inventado)`);

  await doLesson(page, lesson);
  // "Use você mesmo": produção livre no fim da aula, corrigida pela IA.
  await page.getByRole("heading", { name: "Use você mesmo" }).waitFor();
  await page.getByLabel("Suas frases em inglês").fill("Hello! I'm Lucas and I'm from Brazil. Nice to meet you.");
  await page.getByRole("button", { name: "Corrigir" }).click();
  await page.getByText("Muito bem! Isso conta para o domínio desta aula.").waitFor({ timeout: 30000 });
  if (sql(`select count(*) from public.production_attempts where user_id = ${uid(email)} and score >= 70`) !== "1") throw new Error("produção não salva");
  console.log("✓ 'Use você mesmo': escreveu sobre a própria vida, a IA corrigiu e salvou como evidência");
  await open();
  if (!(await panel("Domínio").innerText()).startsWith("Domínio")) throw new Error("painel ausente");
  if (!/^0\b/.test((await panel("Domínio").locator("p").nth(1).innerText()).trim())) throw new Error("domínio com um dia só");
  await page.getByText("Quase dominados").waitFor();
  await page.getByText(/Falta: .*praticar em outro dia/).first().waitFor();
  await panel("Desempenho").getByText(/Confiabilidade (baixa|média) · \d+ respostas/).waitFor();
  console.log("✓ aula perfeita num dia só: ainda não é domínio ('Falta: praticar em outro dia'); amostra e confiabilidade aparecem");

  // Respostas em 2 dias diferentes → dominado.
  sql(`update public.exercise_answers set created_at = created_at - interval '1 day' where user_id = ${uid(email)} and id in (select id from public.exercise_answers where user_id = ${uid(email)} order by id limit 3)`);
  await open();
  await panel("Domínio").getByText(`de ${total} objetivos`).waitFor();
  if (!/^1\b/.test((await panel("Domínio").locator("p").nth(1).innerText()).trim())) throw new Error("não dominou com 2 dias");
  console.log("✓ acertos em 2 dias, com produção → 1 objetivo dominado");

  // Tudo 10 dias atrás + 2 acertos hoje (um de produção) → retido.
  sql(`update public.exercise_answers set created_at = created_at - interval '10 days' where user_id = ${uid(email)}`);
  sql(`update public.production_attempts set created_at = created_at - interval '10 days' where user_id = ${uid(email)}`);
  const prod = lesson.exercises.find((e) => e.type === "translate" || e.type === "fill_blank")!;
  const rec = lesson.exercises.find((e) => e.type === "multiple_choice")!;
  sql(`insert into public.exercise_answers (user_id, lesson_id, exercise_id, skill, answer, correct) values
    (${uid(email)}, '${lesson.id}', '${prod.id}', '${prod.skill}', '{"kind":"review"}', true),
    (${uid(email)}, '${lesson.id}', '${rec.id}', '${rec.skill}', '{"kind":"review"}', true)`);
  await open();
  await panel("Retenção").getByText("1 objetivo retido").waitFor();
  await panel("Retenção").getByText("100%").waitFor();
  await panel("Retenção").getByText(/Confiabilidade baixa · 2 respostas após 7\+ dias/).waitFor();
  await page.screenshot({ path: `${SHOTS}/m1-indicadores.png`, fullPage: true });
  console.log("✓ certo de novo 10 dias depois → retido (100%, 2 respostas, confiabilidade baixa)");

  // Leitura no teste do módulo: texto + 3 perguntas.
  const test = ALL_LESSONS.find((l) => l.id === "a1-m1-test")!;
  for (const l of ALL_LESSONS.filter((x) => x.moduleId === "a1-m1" && x.kind === "lesson"))
    sql(`insert into public.lesson_progress (user_id, lesson_id, status, best_score, last_score, attempts, completed_at) values (${uid(email)}, '${l.id}', 'completed', 100, 100, 1, now()) on conflict do nothing`);
  page.on("framenavigated", () => null);
  let sawPassage = false;
  const watcher = setInterval(async () => {
    if (!sawPassage && (await page.getByText("Leia o texto e responda").count().catch(() => 0))) sawPassage = (await page.getByRole("article", { name: "Texto: A new neighbour" }).count()) > 0;
  }, 300);
  await doLesson(page, test);
  clearInterval(watcher);
  const readingAnswers = sql(`select count(*) from public.exercise_answers where user_id = ${uid(email)} and exercise_id like 'a1-m1-test-r%' and correct`);
  if (readingAnswers !== "3") throw new Error(`leitura: ${readingAnswers} respostas`);
  if (!sawPassage) throw new Error("o texto da leitura não apareceu");
  console.log("✓ teste do módulo com leitura: texto 'A new neighbour' + 3 perguntas respondidas e salvas como reading");

  await browser.close();
})().catch((e) => {
  console.error("FALHOU:", e);
  process.exit(1);
});
