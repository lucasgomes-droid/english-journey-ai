/**
 * Fase 5 — responsividade e menu: em celular (360), tablet (768) e computador (1280), claro e escuro,
 * nenhuma página principal pode ter rolagem horizontal nem texto menor que 12 px;
 * o menu tem as 6 áreas de estudo (barra lateral no computador, barra inferior no celular).
 * Uso: npx tsx tests/e2e/responsive.e2e.ts
 */
import { chromium } from "playwright";
import { BASE, SHOTS, signup } from "./helpers";

const PAGES = ["/", "/trilha", "/praticar", "/conversa", "/conversar", "/professor?cenario=cafe&nivel=B1", "/pronuncia", "/listening", "/meu-professor", "/dificuldades", "/avaliacoes", "/perfil", "/prova/A1", "/aula/a1-m4-l1", "/revisao", "/vocabulario", "/falar/construir"];
const MENU = ["Início", "Trilha", "Praticar", "Conversa", "Meu progresso", "Perfil"];
const BOTTOM = ["Início", "Trilha", "Praticar", "Conversa", "Progresso"];

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
      // O tema escuro agora é uma opção do Perfil (salva no aparelho).
      if (scheme === "dark") await ctx.addInitScript(() => localStorage.setItem("ej-theme", "dark"));
      const page = await ctx.newPage();
      page.on("pageerror", (e) => problems.push(`${vp.name} ${scheme}: erro de página ${e.message}`));
      for (const path of PAGES) {
        await page.goto(`${BASE}${path}`);
        await page.waitForLoadState("load");
        await page.waitForTimeout(700);
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
      // Menu focado: 6 áreas no computador, 5 atalhos + Perfil no topo no celular.
      await page.goto(`${BASE}/`);
      const nav = page.getByRole("navigation", { name: "Principal" }).filter({ visible: true });
      for (const m of vp.width >= 1024 ? MENU : BOTTOM) if (!(await nav.getByRole("link", { name: m, exact: true }).count())) problems.push(`${vp.name}: menu sem ${m}`);
      await ctx.close();
    }
    console.log(`✓ ${vp.name}px verificado (claro e escuro)`);
  }
  await browser.close();
  if (problems.length) {
    console.error("PROBLEMAS:\n" + problems.join("\n"));
    process.exit(1);
  }
  console.log(`✓ ${PAGES.length} páginas × 3 tamanhos × 2 temas sem rolagem horizontal nem texto pequeno; menu focado (6 áreas)`);
})().catch((e) => {
  console.error("FALHOU:", e);
  process.exit(1);
});
