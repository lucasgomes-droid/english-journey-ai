/**
 * Fase 2 — método prático e cenários reais:
 * a aula começa pela missão (explicação opcional, disponível na prática e no erro);
 * cenários com ambiente, missão por nível e relatório no fim da conversa.
 * Uso (ambiente local com IA simulada): npx tsx tests/e2e/fase2.e2e.ts
 */
import { chromium, type Page } from "playwright";
import { getLesson } from "../../src/content/curriculum";
import { BASE, SHOTS, answer, signup } from "./helpers";

let current: Page | null = null;

(async () => {
  const browser = await chromium.launch();
  for (const vp of [
    { name: "celular", width: 390, height: 844 },
    { name: "desktop", width: 1280, height: 900 },
  ]) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    current = page;
    await page.addInitScript(() => localStorage.setItem("ej-speak-mode", "0"));
    page.on("pageerror", (e) => console.error("ERRO NA PÁGINA:", e.message));
    await signup(page, `f2${vp.name}`);

    // Aula: missão primeiro, teoria opcional.
    const lesson = getLesson("a1-m4-l1")!;
    await page.goto(`${BASE}/aula/${lesson.id}`);
    await page.getByText("Sua missão nesta aula").waitFor();
    await page.getByText("Explicação rápida (opcional)").waitFor();
    if (await page.locator("details[open]").filter({ hasText: "Explicação rápida" }).count()) throw new Error("explicação deveria começar fechada");
    await page.screenshot({ path: `${SHOTS}/f2-aula-missao-${vp.name}.png`, fullPage: true });
    for (let i = 0; i < 5; i++) {
      const btn = page.getByRole("button", { name: /^(Continuar|Praticar|Falar em voz alta)$/ });
      if (!(await btn.isVisible())) break;
      const label = await btn.textContent();
      await btn.click();
      if (label === "Praticar") break;
    }
    await page.getByText(`Exercício 1 de ${lesson.exercises.length}`).waitFor();
    await answer(page, lesson.exercises[0], true);
    await page.getByRole("button", { name: "Verificar" }).click();
    await page.getByRole("button", { name: "Entender o erro" }).click();
    await page.getByRole("dialog", { name: "Explicação da aula" }).waitFor();
    await page.screenshot({ path: `${SHOTS}/f2-explicacao-${vp.name}.png` });
    await page.getByRole("button", { name: "Fechar" }).click();
    console.log(`✓ [${vp.name}] aula começa pela missão; explicação aparece quando erra`);

    // Cenário: café no B1, com ambiente, missão, complicação e relatório.
    await page.goto(`${BASE}/conversar`);
    await page.getByRole("tab", { name: "Cafés e restaurantes" }).click();
    await page.getByRole("radio", { name: "B1" }).click();
    await page.screenshot({ path: `${SHOTS}/f2-cenarios-${vp.name}.png`, fullPage: true });
    await page.getByRole("link", { name: /Em um café/ }).click();
    await page.getByText("Você entrou numa cafeteria em Londres").waitFor();
    await page.getByText(/Neste nível:/).waitFor();
    await page.getByRole("img", { name: "Ambiente: Cafeteria" }).first().waitFor();
    for (const msg of ["Hi! I want a coffee, please.", "A large latte with oat milk. How much is it?"]) {
      await page.getByRole("textbox", { name: "Mensagem" }).fill(msg);
      await page.getByRole("button", { name: "Enviar", exact: true }).click();
      await page.getByText(msg).waitFor();
      await page.waitForFunction(() => !document.querySelector<HTMLTextAreaElement>('textarea[aria-label="Mensagem"]')?.disabled, null, { timeout: 20000 });
    }
    await page.getByRole("button", { name: "Encerrar e ver relatório" }).click();
    await page.getByRole("dialog", { name: "Relatório da conversa" }).waitFor({ timeout: 20000 });
    for (const t of ["Nota de desempenho", "O que você falou", "Erros cometidos", "Novas expressões", "Sugestão de prática"]) await page.getByText(t).first().waitFor();
    await page.screenshot({ path: `${SHOTS}/f2-relatorio-${vp.name}.png`, fullPage: true });
    console.log(`✓ [${vp.name}] cenário com ambiente e missão por nível; relatório completo no fim`);
    await page.close();
  }
  await browser.close();
})().catch(async (e) => {
  await current?.screenshot({ path: `${SHOTS}/f2-falha.png`, fullPage: true }).catch(() => null);
  console.error("FALHOU:", e);
  process.exit(1);
});
