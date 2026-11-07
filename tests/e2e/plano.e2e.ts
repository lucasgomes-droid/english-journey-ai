/**
 * M4 — Cronograma e Treino de hoje:
 * - no Perfil, o aluno escolhe dias de estudo, foco, meta (nível + data) e limite de revisões;
 * - o Praticar vira "Treino de hoje" (dentro do tempo do aluno) + semana com folgas + meta × ritmo;
 * - o que o aluno faz é marcado como feito no plano.
 * Uso (ambiente local com IA simulada): npx tsx tests/e2e/plano.e2e.ts
 */
import { chromium } from "playwright";
import { ALL_LESSONS } from "../../src/content/curriculum";
import { BASE, SHOTS, doLesson, signup, sql, uid } from "./helpers";

const DAY_LABEL = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

(async () => {
  const browser = await chromium.launch();
  const page = await (await browser.newContext({ viewport: { width: 390, height: 844 } })).newPage();
  await page.addInitScript(() => localStorage.setItem("ej-speak-mode", "0"));
  page.on("pageerror", (e) => console.error("ERRO NA PÁGINA:", e.message));
  const email = await signup(page, "plano");

  // Folga nos 2 dias seguintes a hoje (hoje continua dia de estudo).
  const today = Number(sql("select extract(dow from (now() at time zone 'America/Sao_Paulo'))::int"));
  const off = [(today + 1) % 7, (today + 2) % 7];
  await page.goto(`${BASE}/perfil`);
  for (const d of off) await page.getByRole("button", { name: DAY_LABEL[d], exact: true }).click();
  await page.getByRole("button", { name: "Entender o que ouço" }).click();
  await page.getByLabel("Nível que quer alcançar").selectOption("A2");
  await page.getByLabel("Até quando").fill("2027-06-30");
  await page.getByLabel("Revisões por dia (máx.)").selectOption("10");
  await page.getByRole("button", { name: "Salvar preferências" }).click();
  await page.getByText("Preferências salvas.").waitFor();
  const saved = sql(`select study_days, focus_skills, target_level, target_date, daily_review_limit from public.profiles where id = ${uid(email)}`);
  for (const d of off) if (saved.split("|")[0].includes(String(d))) throw new Error(`dia de folga salvo como estudo: ${saved}`);
  if (!saved.includes("{listening}") || !saved.includes("A2") || !saved.includes("2027-06-30") || !saved.endsWith("|10")) throw new Error(`plano não salvo: ${saved}`);
  console.log(`✓ Perfil: dias de estudo (folga ${off.map((d) => DAY_LABEL[d]).join(" e ")}), foco em listening, meta A2 até 30/06/2027, 10 revisões/dia`);

  await page.goto(`${BASE}/praticar`);
  await page.getByRole("heading", { name: "Treino de hoje" }).waitFor();
  const hoje = page.getByRole("region", { name: "Hoje" }).or(page.locator("section[aria-labelledby=hoje]"));
  await hoje.getByText("Aula nova").waitFor();
  const blocks = await hoje.locator("li").allInnerTexts();
  const minutes = blocks.map((b) => Number(b.match(/(\d+) min/)?.[1] ?? 0)).reduce((a, b) => a + b, 0);
  if (minutes > 15) throw new Error(`plano passa do tempo (15 min): ${minutes}`);
  const firstSkill = blocks.find((b) => !/Aula nova|Revisão|Reforço|Gravação/.test(b));
  if (!firstSkill || !/Listening/.test(firstSkill)) throw new Error(`foco em listening não priorizado: ${blocks.join(" / ")}`);
  const strip = await page.getByRole("list", { name: "Plano dos próximos 7 dias" }).locator("li").allInnerTexts();
  if (strip.filter((s) => s.includes("folga")).length !== 2) throw new Error(`folgas erradas: ${strip.join(" | ")}`);
  await page.getByRole("heading", { name: /Meta: A2 até 30\/06/ }).waitFor();
  await page.getByText(/Faltam \d+ aulas/).waitFor();
  await page.screenshot({ path: `${SHOTS}/m4-treino-de-hoje.png`, fullPage: true });
  console.log(`✓ Treino de hoje dentro de 15 min (${minutes} min), listening em primeiro; semana com 2 folgas; meta A2 com aulas restantes`);

  await doLesson(page, ALL_LESSONS[0]);
  await page.goto(`${BASE}/praticar`);
  await page.locator("section[aria-labelledby=hoje]").getByLabel("Feito hoje").first().waitFor();
  console.log("✓ aula feita → marcada como feita no treino de hoje");
  await browser.close();
})().catch((e) => {
  console.error("FALHOU:", e);
  process.exit(1);
});
