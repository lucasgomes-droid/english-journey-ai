/** Capturas para revisão visual: npx tsx tests/e2e/shots.e2e.ts [rota...] */
import { chromium } from "playwright";
import { BASE, SHOTS, signup } from "./helpers";
(async () => {
  const routes = process.argv.slice(2).length ? process.argv.slice(2) : ["/", "/trilha"];
  const b = await chromium.launch();
  const setup = await b.newContext();
  await signup(await setup.newPage(), "shot");
  const state = await setup.storageState();
  for (const vp of [{ n: "desk", w: 1366, h: 900 }, { n: "cel", w: 390, h: 844 }]) {
    const p = await (await b.newContext({ viewport: { width: vp.w, height: vp.h }, storageState: state })).newPage();
    for (const r of routes) {
      await p.goto(BASE + r);
      await p.waitForLoadState("load");
      await p.waitForTimeout(1500);
      await p.screenshot({ path: `${SHOTS}/v-${vp.n}-${r.replace(/\W+/g, "_") || "home"}.png`, fullPage: vp.n === "cel" });
    }
  }
  await b.close();
})();
