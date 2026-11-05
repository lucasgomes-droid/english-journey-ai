/**
 * Fase 7 — acessibilidade: axe-core nas páginas principais (celular e computador, claro e escuro).
 * Falha com violações sérias ou críticas.
 * Uso: npx tsx tests/e2e/a11y.e2e.ts
 */
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { BASE, signup } from "./helpers";

const PAGES = ["/", "/trilha", "/praticar", "/praticar/adaptativo", "/conversa", "/conversar", "/professor?cenario=cafe&nivel=B1", "/pronuncia", "/listening", "/meu-professor", "/dificuldades", "/dificuldades/questions", "/avaliacoes", "/relatorio", "/perfil", "/prova/A1", "/aula/a1-m1-l1", "/revisao"];

(async () => {
  const browser = await chromium.launch();
  const setup = await browser.newContext();
  await signup(await setup.newPage(), "a11y");
  const state = await setup.storageState();
  await setup.close();
  const problems: string[] = [];
  for (const vp of [
    { w: 390, h: 844 },
    { w: 1280, h: 900 },
  ])
    for (const scheme of ["light", "dark"] as const) {
      const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, storageState: state, colorScheme: scheme });
      // O tema escuro agora é uma opção do Perfil (salva no aparelho).
      if (scheme === "dark") await ctx.addInitScript(() => localStorage.setItem("ej-theme", "dark"));
      const page = await ctx.newPage();
      for (const p of PAGES) {
        await page.goto(`${BASE}${p}`);
        await page.waitForLoadState("load");
        await page.waitForTimeout(700);
        const r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
        for (const v of r.violations.filter((v) => v.impact === "serious" || v.impact === "critical"))
          problems.push(`${vp.w} ${scheme} ${p}: ${v.id} (${v.nodes.length}) ${v.nodes[0]?.target.join(" ")} — ${v.nodes[0]?.failureSummary?.split("\n")[1] ?? ""}`);
      }
      await ctx.close();
    }
  await browser.close();
  const uniq = Array.from(new Set(problems));
  if (uniq.length) {
    console.error(uniq.join("\n"));
    process.exit(1);
  }
  console.log(`✓ ${PAGES.length} páginas × 2 tamanhos × 2 temas sem violações sérias de acessibilidade (WCAG 2 A/AA)`);
})();
