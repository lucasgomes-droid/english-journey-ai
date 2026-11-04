/**
 * Fase 3 — tradução opcional e "Não entendi":
 * com tradução ligada o português aparece; desligada fica escondido (dá para espiar);
 * a preferência fica salva; "Traduzir" na conversa e "Não entendi" na aula e na conversa.
 * Uso (ambiente local com IA simulada): npx tsx tests/e2e/fase3.e2e.ts
 */
import { chromium, type Page } from "playwright";
import { getLesson } from "../../src/content/curriculum";
import { BASE, SHOTS, signup, sql, uid } from "./helpers";

let current: Page | null = null;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  current = page;
  await page.addInitScript(() => localStorage.setItem("ej-speak-mode", "0"));
  page.on("pageerror", (e) => console.error("ERRO NA PÁGINA:", e.message));
  const email = await signup(page, "f3");
  const lesson = getLesson("a1-m1-l1")!;
  const firstVocab = lesson.vocabulary[0];

  const toVocab = async () => {
    await page.goto(`${BASE}/aula/${lesson.id}`);
    await page.getByText("Sua missão nesta aula").waitFor();
    await page.getByRole("button", { name: "Continuar" }).click();
    await page.getByRole("heading", { name: "Vocabulário" }).waitFor();
  };

  // Ligada (padrão): tradução visível.
  await toVocab();
  await page.getByText(firstVocab.pt, { exact: true }).first().waitFor();
  console.log("✓ tradução ligada: português aparece no vocabulário");

  // Desliga: some, mas dá para espiar; preferência salva no perfil.
  await page.getByRole("button", { name: /Tradução ligada|Mostrar tradução/ }).click();
  await page.waitForFunction(() => document.querySelector('[aria-pressed="false"]'));
  await page.waitForTimeout(800);
  if (sql(`select show_translation from public.profiles where id = ${uid(email)};`) !== "f") throw new Error("preferência não foi salva");
  await toVocab();
  if (await page.getByText(firstVocab.pt, { exact: true }).count()) throw new Error("tradução deveria estar escondida");
  await page.getByRole("button", { name: "Ver a tradução em português" }).first().click();
  await page.getByText(firstVocab.pt, { exact: true }).first().waitFor();
  await page.screenshot({ path: `${SHOTS}/f3-so-ingles.png`, fullPage: true });
  console.log("✓ só inglês: tradução escondida, dá para espiar, preferência salva");

  // "Não entendi" na aula.
  await page.goto(`${BASE}/aula/${lesson.id}`);
  await page.getByRole("button", { name: "Não entendi" }).click();
  await page.getByRole("dialog", { name: "Explicação do professor" }).getByText("Aqui você cumprimenta").waitFor({ timeout: 15000 });
  await page.screenshot({ path: `${SHOTS}/f3-nao-entendi.png` });
  await page.getByRole("button", { name: "Fechar" }).click();
  console.log("✓ 'Não entendi' explica em português na aula");

  // Conversa: liga a tradução de novo, "Traduzir" e "Não entendi".
  sql(`update public.profiles set show_translation = true where id = ${uid(email)};`);
  await page.goto(`${BASE}/professor?cenario=cafe&nivel=A1`);
  await page.getByRole("button", { name: "Traduzir" }).first().click();
  await page.getByText("Bom dia! O que vai ser para você?").waitFor({ timeout: 15000 });
  await page.getByRole("button", { name: "Não entendi" }).click();
  await page.getByRole("dialog", { name: "Explicação do professor" }).waitFor();
  await page.screenshot({ path: `${SHOTS}/f3-conversa.png` });
  console.log("✓ conversa: 'Traduzir' com expressões e 'Não entendi'");
  await browser.close();
})().catch(async (e) => {
  await current?.screenshot({ path: `${SHOTS}/f3-falha.png`, fullPage: true }).catch(() => null);
  console.error("FALHOU:", e);
  process.exit(1);
});
