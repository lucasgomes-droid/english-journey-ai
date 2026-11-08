/**
 * Listening ampliado: 10 áudios por nível (avisos, recados, notícias, podcasts, conversas naturais),
 * velocidades devagar / normal / rápida; só inglês americano (sem falas com outro sotaque).
 * Uso (ambiente local com IA simulada): npx tsx tests/e2e/listening.e2e.ts
 */
import { chromium } from "playwright";
import { LISTENING } from "../../src/content/listening";
import { BASE, signup, sql, uid } from "./helpers";

(async () => {
  for (const lv of ["A1", "A2", "B1", "B2", "C1", "C2"]) if (LISTENING.filter((i) => i.level === lv).length < 10) throw new Error(`${lv} com menos de 10 áudios`);
  const browser = await chromium.launch({ args: ["--autoplay-policy=no-user-gesture-required"] });
  const page = await (await browser.newContext({ viewport: { width: 390, height: 844 } })).newPage();
  page.on("pageerror", (e) => console.error("ERRO NA PÁGINA:", e.message));
  const email = await signup(page, "ouvir");
  const item = LISTENING.find((i) => i.id === "l-a2-train-announcement")!;
  sql(`update public.profiles set current_level = 'A2' where id = ${uid(email)}`);
  await page.goto(`${BASE}/listening/${item.id}`);
  await page.getByRole("heading", { name: item.title }).waitFor();
  if (await page.getByText(/Sotaque (britânico|australiano)/).count()) throw new Error("só inglês americano: não deveria haver aviso de sotaque");
  await page.getByRole("button", { name: "Mais rápido" }).waitFor();
  await page.getByRole("button", { name: "Mais devagar" }).waitFor();
  await page.getByRole("button", { name: "Ouvir o áudio" }).click();
  await page.waitForTimeout(800);
  await page.getByRole("button", { name: "Parar" }).click();
  for (const [qi, q] of item.questions.entries()) await page.getByRole("group", { name: `Pergunta ${qi + 1}` }).getByRole("button", { name: q.options[q.answer], exact: true }).click();
  await page.getByPlaceholder("Escreva o que ouviu").fill(item.dictation);
  await page.getByRole("button", { name: "Verificar respostas" }).click();
  await page.getByText("Perfeito!").waitFor({ timeout: 15000 });
  console.log("✓ 10 áudios por nível; aviso de estação em inglês americano, velocidades devagar/rápida, perguntas e ditado conferidos");
  await browser.close();
})().catch((e) => {
  console.error("FALHOU:", e);
  process.exit(1);
});
