/**
 * Teste do conteúdo A2: com o A1 concluído, a primeira aula do A2 abre, é feita
 * de ponta a ponta (modo digitar) e o teste final do A1 sobe o nível.
 * Uso (ambiente local): A2_SETUP_CMD="psql ... {email}" npx tsx tests/e2e/a2.e2e.ts
 */
import { execSync } from "node:child_process";
import { chromium } from "playwright";
import { ALL_LESSONS } from "../../src/content/curriculum";
import { orderTokens } from "../../src/lib/grading";
import type { Exercise } from "../../src/content/types";
import type { Page } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const SHOTS = process.env.SHOTS_DIR ?? "./screenshots";

async function answer(page: Page, ex: Exercise) {
  const section = page.locator("main section, main .panel").first();
  switch (ex.type) {
    case "multiple_choice":
      return section.getByRole("radio").nth(ex.answer).click();
    case "listening":
      if (ex.options) return section.getByRole("radio").nth(ex.answer!).click();
      return section.locator("input, textarea").fill(ex.accepted![0]);
    case "translate":
    case "fill_blank":
      return section.locator("input, textarea").fill(ex.accepted[0]);
    case "word_order":
      for (const w of orderTokens(ex.answer)) await section.locator(`[data-bank-word="${w.replace(/"/g, '\\"')}"]:not([disabled])`).first().click();
      return;
    case "match_pairs":
      for (const [l, r] of ex.pairs) {
        await section.getByRole("button", { name: l, exact: true }).click();
        await section.getByRole("button", { name: r, exact: true }).click();
      }
  }
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.addInitScript(() => localStorage.setItem("ej-speak-mode", "0"));
  page.on("pageerror", (e) => console.error("ERRO NA PÁGINA:", e.message));
  const email = `a2${Date.now()}@example.com`;
  await page.goto(`${BASE}/cadastro`);
  await page.getByPlaceholder("Seu nome").fill("Aluno A2");
  await page.getByPlaceholder("voce@email.com").fill(email);
  await page.getByPlaceholder("Mínimo de 8 caracteres").fill("senhaforte123");
  await page.getByRole("button", { name: "Criar conta" }).click();
  await page.waitForURL("**/boas-vindas");
  await page.getByRole("button", { name: "Começar no A1" }).click();
  await page.waitForURL(`${BASE}/`);

  // Marca o A1 como concluído, exceto o teste final (feito de verdade abaixo).
  execSync(process.env.A2_SETUP_CMD!.replace("{email}", email));
  const final = ALL_LESSONS.find((l) => l.id === "a1-final-test")!;
  for (const lesson of [final, ALL_LESSONS.find((l) => l.id === "a2-m1-l1")!]) {
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
      await page.getByText(`Exercício ${i + 1} de ${lesson.exercises.length}`).waitFor();
      await answer(page, lesson.exercises[i]);
      await page.getByRole("button", { name: "Verificar" }).click();
      const st = (await page.getByRole("status").first().textContent()) ?? "";
      if (!/Correto/.test(st)) throw new Error(`${lesson.exercises[i].id}: ${st}`);
      await page.getByRole("button", { name: "Continuar" }).click();
    }
    await page.getByText(/\+\d+ XP/).first().waitFor({ timeout: 15000 });
    await page.screenshot({ path: `${SHOTS}/a2-${lesson.id}.png`, fullPage: true });
    console.log(`✓ ${lesson.title} concluída`);
  }
  await page.goto(`${BASE}/trilha`);
  await page.getByText("Planos e futuro").first().waitFor();
  await page.screenshot({ path: `${SHOTS}/a2-trilha.png`, fullPage: true });
  const level = await page.locator("header").first().textContent();
  if (!/A2/.test(level ?? "")) throw new Error("nível não subiu para A2: " + level);
  console.log("✓ nível subiu para A2 e a trilha do A2 aparece");
  await browser.close();
})().catch((e) => {
  console.error("FALHOU:", e);
  process.exit(1);
});
