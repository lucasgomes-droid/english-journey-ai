/**
 * Conteúdo de todos os níveis: com o A1 comprovado, a primeira aula do A2 abre e é feita
 * de ponta a ponta (modo digitar); depois a primeira aula do B1, B2, C1 e C2.
 * Uso (ambiente local): npx tsx tests/e2e/a2.e2e.ts
 */
import { chromium } from "playwright";
import { ALL_LESSONS } from "../../src/content/curriculum";
import { BASE, SHOTS, completeLevelExceptFinal, doLesson, signup, sql, uid } from "./helpers";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.addInitScript(() => localStorage.setItem("ej-speak-mode", "0"));
  page.on("pageerror", (e) => console.error("ERRO NA PÁGINA:", e.message));
  const email = await signup(page, "a2");

  // O A2 continua fechado só com as aulas do A1 feitas (falta a prova de nível).
  completeLevelExceptFinal(email, "A1");
  await page.goto(`${BASE}/aula/a2-m1-l1`);
  await page.waitForURL("**/trilha");
  console.log("✓ A2 fechado antes da prova de nível do A1");

  for (const lv of ["A2", "B1", "B2", "C1", "C2"]) {
    sql(`update public.profiles set current_level = '${lv}' where id = ${uid(email)};`);
    const first = ALL_LESSONS.find((l) => l.id === `${lv.toLowerCase()}-m1-l1`)!;
    await doLesson(page, first);
    await page.screenshot({ path: `${SHOTS}/lv-${lv}.png`, fullPage: true });
    console.log(`✓ ${lv}: ${first.title} concluída`);
  }
  sql(`update public.profiles set current_level = 'A2' where id = ${uid(email)};`);
  await page.goto(`${BASE}/trilha`);
  await page.getByText("Planos e futuro").first().waitFor();
  await page.getByText("Prova de nível A2", { exact: true }).waitFor();
  await page.screenshot({ path: `${SHOTS}/a2-trilha.png`, fullPage: true });
  console.log("✓ trilha mostra o A2 e a prova de cada nível");
  await browser.close();
})().catch((e) => {
  console.error("FALHOU:", e);
  process.exit(1);
});
