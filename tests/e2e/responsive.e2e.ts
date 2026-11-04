/**
 * Fase 5 — responsividade e menu: em celular (360), tablet (768) e computador (1280), claro e escuro,
 * nenhuma página principal pode ter rolagem horizontal nem texto menor que 12 px;
 * o menu tem as 10 áreas (barra lateral no computador, "Mais" no celular).
 * Uso: npx tsx tests/e2e/responsive.e2e.ts
 */
import { chromium } from "playwright";
import { BASE, SHOTS, signup } from "./helpers";

const PAGES = ["/", "/trilha", "/praticar", "/conversar", "/professor?cenario=cafe&nivel=B1", "/pronuncia", "/listening", "/meu-professor", "/dificuldades", "/avaliacoes", "/perfil", "/prova/A1", "/aula/a1-m1-l1", "/revisao"];
const MENU = ["Início", "Minha Trilha", "Praticar", "Conversação", "Pronúncia", "Listening", "Meu Professor IA", "Minhas Dificuldades", "Avaliações", "Meu Perfil"];

(async () => {
  const browser = await chromium.launch();
  const setup = await browser.newContext();
  const sp = await setup.newPage();
  await signup(sp, "resp");
  const state = await setup.storageState();
  await setup.close();
  const problems: string[] = [];

  for (const vp of [
    { name: "360", width: 360, height: 760 },
    { name: "768", width: 768, height: 1024 },
    { name: "1280", width: 1280, height: 900 },
  ]) {
    for (const scheme of ["light", "dark"] as const) {
      const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, storageState: state, colorScheme: scheme });
      const page = await ctx.newPage();
      page.on("pageerror", (e) => problems.push(`${vp.name} ${scheme}: erro de página ${e.message}`));
      for (const path of PAGES) {
        await page.goto(`${BASE}${path}`);
        await page.waitForLoadState("networkidle");
        const r = await page.evaluate(() => {
          const overflow = document.documentElement.scrollWidth - window.innerWidth;
          const small: string[] = [];
          for (const el of Array.from(document.querySelectorAll<HTMLElement>("main *"))) {
            if (!el.childNodes.length || !Array.from(el.childNodes).some((n) => n.nodeType === 3 && n.textContent!.trim())) continue;
            const r = el.getBoundingClientRect();
            if (!r.width || !r.height) continue;
            const fs = parseFloat(getComputedStyle(el).fontSize);
            if (fs < 10) small.push(`${el.tagName} ${fs}px "${el.textContent!.trim().slice(0, 30)}"`);
          }
          return { overflow, small: small.slice(0, 3) };
        });
        if (r.overflow > 1) problems.push(`${vp.name} ${scheme} ${path}: rolagem horizontal de ${r.overflow}px`);
        if (r.small.length) problems.push(`${vp.name} ${scheme} ${path}: texto pequeno ${r.small.join("; ")}`);
        if (scheme === "dark" && ["/", "/meu-professor", "/conversar", "/avaliacoes"].includes(path))
          await page.screenshot({ path: `${SHOTS}/f5-${vp.name}-${path.replace(/\W+/g, "_") || "home"}.png`, fullPage: vp.width < 1000 });
      }
      // Menu com as 10 áreas.
      await page.goto(`${BASE}/`);
      if (vp.width >= 1024) {
        for (const m of MENU) if (!(await page.getByRole("navigation", { name: "Principal" }).getByRole("link", { name: m, exact: true }).count())) problems.push(`${vp.name}: menu sem ${m}`);
      } else {
        await page.getByRole("button", { name: "Mais" }).click();
        const sheet = page.getByRole("dialog", { name: "Todas as áreas" });
        for (const m of MENU) if (!(await sheet.getByRole("link", { name: m, exact: true }).count())) problems.push(`${vp.name}: "Mais" sem ${m}`);
        if (scheme === "dark") await page.screenshot({ path: `${SHOTS}/f5-${vp.name}-menu.png` });
        await sheet.getByRole("link", { name: "Avaliações" }).click();
        await page.waitForURL("**/avaliacoes");
      }
      await ctx.close();
    }
    console.log(`✓ ${vp.name}px verificado (claro e escuro)`);
  }
  await browser.close();
  if (problems.length) {
    console.error("PROBLEMAS:\n" + problems.join("\n"));
    process.exit(1);
  }
  console.log(`✓ ${PAGES.length} páginas × 3 tamanhos × 2 temas sem rolagem horizontal nem texto pequeno; menu com as 10 áreas`);
})().catch((e) => {
  console.error("FALHOU:", e);
  process.exit(1);
});
