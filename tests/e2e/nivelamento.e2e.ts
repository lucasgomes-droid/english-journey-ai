/**
 * M5 — Nivelamento A1–C2: para cedo no primeiro nível que vai mal, mostra resultado por nível e por competência,
 * deixa claro que é estimativa e põe a trilha no nível estimado.
 * Uso (ambiente local com IA simulada): npx tsx tests/e2e/nivelamento.e2e.ts
 */
import { chromium } from "playwright";
import { PLACEMENT } from "../../src/content/placement";
import { BASE, signup, sql, uid } from "./helpers";

(async () => {
  const browser = await chromium.launch({ args: ["--autoplay-policy=no-user-gesture-required"] });
  const page = await (await browser.newContext({ viewport: { width: 390, height: 844 } })).newPage();
  page.on("pageerror", (e) => console.error("ERRO NA PÁGINA:", e.message));
  const email = await signup(page, "nivel");
  await page.goto(`${BASE}/nivelamento`);
  await page.getByRole("button", { name: "Começar o teste" }).click();
  let asked = 0;
  // Acerta A1 e A2, erra (Não sei) o B1 → deve parar no fim do B1 e estimar B1.
  for (const q of PLACEMENT) {
    await page.getByText(`${asked + 1} de ${PLACEMENT.length}`).or(page.getByText("Seu nível estimado")).first().waitFor();
    if (await page.getByText("Seu nível estimado").count()) break;
    asked++;
    if (q.level === "A1" || q.level === "A2") await page.getByRole("radio").nth(q.answer).click();
    else await page.getByRole("button", { name: "Não sei" }).click();
  }
  await page.getByText("Seu nível estimado").waitFor();
  if (asked !== 18) throw new Error(`deveria parar depois do B1 (18 questões), parou em ${asked}`);
  await page.getByText("B1", { exact: true }).first().waitFor();
  await page.getByRole("list", { name: "Resultado por competência" }).getByText("Compreensão oral").waitFor();
  await page.getByText(/não é certificação/).waitFor();
  const level = sql(`select current_level from public.profiles where id = ${uid(email)}`);
  if (level !== "B1") throw new Error(`nível salvo ${level}`);
  console.log("✓ nivelamento parou no B1 (18 de 36 questões), mostrou leitura × compreensão oral, aviso de estimativa; trilha no B1");
  await browser.close();
})().catch((e) => {
  console.error("FALHOU:", e);
  process.exit(1);
});
