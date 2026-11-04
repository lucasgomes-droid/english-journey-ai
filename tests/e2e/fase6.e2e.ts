/**
 * Fase 6 — avaliações, revisão adaptativa e relatórios:
 * a revisão começa pelo tema mais fraco; o treino adaptativo foca no que o aluno erra e
 * grava os resultados; o relatório semanal compara as duas últimas semanas; Avaliações lista provas.
 * Uso (ambiente local com IA simulada): npx tsx tests/e2e/fase6.e2e.ts
 */
import { chromium, type Page } from "playwright";
import { getCategory } from "../../src/content/error-patterns";
import { getLesson } from "../../src/content/curriculum";
import { BASE, SHOTS, signup, sql, uid } from "./helpers";

let current: Page | null = null;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  current = page;
  page.on("pageerror", (e) => console.error("ERRO NA PÁGINA:", e.message));
  const email = await signup(page, "f6");
  const u = uid(email);
  const ql = getLesson("a1-m3-l4")!;
  const mcq = ql.exercises.find((e) => e.type === "multiple_choice")!;

  // Semana passada: 8 erros em perguntas, pouco estudo. Esta semana: mais estudo e mais acertos.
  sql(`insert into public.exercise_answers (user_id, lesson_id, exercise_id, skill, answer, correct, created_at)
       select ${u}, '${ql.id}', '${mcq.id}', 'grammar', '{}'::jsonb, g > 8, now() - interval '9 day' - (g || ' minute')::interval from generate_series(1, 12) g;
       insert into public.exercise_answers (user_id, lesson_id, exercise_id, skill, answer, correct, created_at)
       select ${u}, '${ql.id}', '${mcq.id}', 'grammar', '{}'::jsonb, g > 3, now() - interval '1 day' - (g || ' minute')::interval from generate_series(1, 12) g;
       insert into public.activity_log (user_id, kind, title, xp, duration_seconds, local_date, created_at) values
         (${u}, 'lesson', 'Aula', 10, 600, current_date - 9, now() - interval '9 day'),
         (${u}, 'lesson', 'Aula', 10, 2400, current_date - 1, now() - interval '1 day');
       insert into public.review_items (user_id, item_type, item_id, due_at) values
         (${u}, 'vocab', '${getLesson("a1-m1-l1")!.vocabulary[0].id}', now() - interval '2 day'),
         (${u}, 'exercise', '${mcq.id}', now() - interval '1 hour');`);

  // Relatório semanal.
  await page.goto(`${BASE}/relatorio`);
  await page.getByText("Destaques da semana").waitFor();
  await page.getByText(/Você estudou 30 min a mais/).waitFor();
  await page.getByText(/Acerto nos exercícios: 33% → 75%/).waitFor();
  await page.getByText(new RegExp(`Menos erros de ${getCategory("questions")!.label.toLowerCase().replace(/[()/]/g, ".")}`)).waitFor();
  await page.screenshot({ path: `${SHOTS}/f6-relatorio.png`, fullPage: true });
  console.log("✓ relatório semanal compara as semanas com dados reais");

  // Revisão adaptativa: o exercício de perguntas (tema fraco) vem antes da palavra mais antiga.
  await page.goto(`${BASE}/revisao`);
  await page.getByText(mcq.type === "multiple_choice" ? mcq.prompt : "").first().waitFor();
  console.log("✓ revisão começa pelo tema mais fraco (perguntas)");

  // Treino adaptativo.
  await page.goto(`${BASE}/praticar/adaptativo`);
  await page.getByText("Treino adaptativo").first().waitFor();
  const firstChip = await page.locator("header p span").first().textContent();
  if (!firstChip?.startsWith(getCategory("questions")!.label)) throw new Error("foco do treino deveria ser perguntas: " + firstChip);
  await page.screenshot({ path: `${SHOTS}/f6-adaptativo.png`, fullPage: true });
  const before = Number(sql(`select count(*) from public.exercise_answers where user_id = ${u};`));
  for (let i = 0; i < 12; i++) {
    await page.getByText(`Exercício ${i + 1} de 12`).waitFor();
    const radios = page.getByRole("radio");
    if (await radios.count()) await radios.first().click();
    else if (await page.locator("main input, main textarea").count()) await page.locator("main input, main textarea").first().fill("test");
    else {
      const bank = page.locator("[data-bank-word]:not([disabled])");
      while (await bank.count()) await bank.first().click();
    }
    await page.getByRole("button", { name: "Verificar", exact: true }).click();
    await page.getByRole("button", { name: "Continuar" }).click();
  }
  await page.getByText(/Seus resultados já ajustaram/).waitFor({ timeout: 15000 });
  await page.waitForTimeout(1000);
  const after = Number(sql(`select count(*) from public.exercise_answers where user_id = ${u};`));
  if (after <= before) throw new Error("treino adaptativo não gravou respostas");
  console.log(`✓ treino adaptativo focado em perguntas; ${after - before} respostas gravadas para as próximas análises`);

  // Avaliações.
  await page.goto(`${BASE}/avaliacoes`);
  await page.getByText("Avaliações dos módulos").first().waitFor();
  await page.getByRole("link", { name: "Ir para a prova de nível" }).first().waitFor();
  await page.screenshot({ path: `${SHOTS}/f6-avaliacoes.png`, fullPage: true });
  console.log("✓ Avaliações lista testes de módulo e provas de nível");
  await browser.close();
})().catch(async (e) => {
  await current?.screenshot({ path: `${SHOTS}/f6-falha.png`, fullPage: true }).catch(() => null);
  console.error("FALHOU:", e);
  process.exit(1);
});
