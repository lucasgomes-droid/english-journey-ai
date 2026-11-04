/**
 * Teste ponta a ponta: cadastro → boas-vindas → aula com exercícios → progresso salvo → revisão.
 * Requer o app rodando (BASE_URL, padrão http://localhost:3000) conectado a um Supabase.
 * Uso: npx tsx tests/e2e/flow.e2e.ts
 */
import { execSync } from "node:child_process";
import { chromium, type Page } from "playwright";
import { ALL_LESSONS } from "../../src/content/curriculum";
import { orderTokens } from "../../src/lib/grading";
import type { Exercise } from "../../src/content/types";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const SHOTS = process.env.SHOTS_DIR ?? "./screenshots";
const email = `aluno${Date.now()}@example.com`;
let current: Page | null = null;

async function answer(page: Page, ex: Exercise, wrong = false) {
  const section = page.locator("main section, main .panel").first();
  switch (ex.type) {
    case "multiple_choice":
      await section.getByRole("radio", { name: ex.options[wrong ? (ex.answer + 1) % ex.options.length : ex.answer], exact: false }).first().click();
      break;
    case "listening":
      if (ex.options) await section.getByRole("radio").nth(wrong ? (ex.answer! + 1) % ex.options.length : ex.answer!).click();
      else await section.locator("input, textarea").fill(wrong ? "something else" : ex.accepted![0]);
      break;
    case "translate":
    case "fill_blank":
      await section.locator("input, textarea").fill(wrong ? "wrong answer" : ex.accepted[0]);
      break;
    case "word_order": {
      const words = orderTokens(ex.answer);
      if (wrong) words.reverse();
      for (const w of words) await section.locator(`[data-bank-word="${w.replace(/"/g, '\\"')}"]:not([disabled])`).first().click();
      break;
    }
    case "match_pairs":
      for (const [l, r] of ex.pairs) {
        await section.getByRole("button", { name: l, exact: true }).click();
        await section.getByRole("button", { name: r, exact: true }).click();
      }
      break;
  }
}

async function doLesson(page: Page, lessonIdx: number, wrongIdx: number[] = []) {
  const lesson = ALL_LESSONS[lessonIdx];
  await page.goto(`${BASE}/aula/${lesson.id}`);
  await page.getByRole("heading", { level: 1, name: lesson.title, exact: true }).waitFor();
  // Fases de explicação/vocabulário/exemplos
  for (let i = 0; i < 4; i++) {
    const btn = page.getByRole("button", { name: /^(Continuar|Praticar|Começar avaliação)$/ });
    if (!(await btn.isVisible())) break;
    const label = await btn.textContent();
    await btn.click();
    if (label === "Praticar" || label === "Começar avaliação") break;
  }
  for (let i = 0; i < lesson.exercises.length; i++) {
    const ex = lesson.exercises[i];
    await page.getByText(`Exercício ${i + 1} de ${lesson.exercises.length}`).waitFor();
    await answer(page, ex, wrongIdx.includes(i));
    await page.getByRole("button", { name: "Verificar" }).click();
    const status = page.getByRole("status").first();
    await status.waitFor();
    const txt = (await status.textContent()) ?? "";
    const expectCorrect = !wrongIdx.includes(i);
    if (expectCorrect !== /Correto/.test(txt)) throw new Error(`Exercício ${ex.id}: esperado ${expectCorrect ? "certo" : "errado"}, tela: ${txt}`);
    await page.getByRole("button", { name: "Continuar" }).click();
  }
  // Exercícios errados voltam no fim da aula (não em avaliações): responder certo agora.
  if (lesson.kind === "lesson") {
    for (const i of wrongIdx) {
      await page.getByText("Vamos fixar").waitFor();
      await answer(page, lesson.exercises[i]);
      await page.getByRole("button", { name: "Verificar" }).click();
      const st = (await page.getByRole("status").first().textContent()) ?? "";
      if (!/Correto/.test(st)) throw new Error(`Repetição de ${lesson.exercises[i].id} deveria estar certa: ${st}`);
      await page.getByRole("button", { name: "Continuar" }).click();
    }
  }
  await page.getByText(/\+\d+ XP/).first().waitFor({ timeout: 15000 });
  return lesson;
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 860 } });
  current = page;
  page.on("pageerror", (e) => console.error("ERRO NA PÁGINA:", e.message));

  await page.goto(`${BASE}/cadastro`);
  await page.screenshot({ path: `${SHOTS}/01-cadastro.png` });
  await page.getByPlaceholder("Seu nome").fill("Lucas Gomes");
  await page.getByPlaceholder("voce@email.com").fill(email);
  await page.getByPlaceholder("Mínimo de 8 caracteres").fill("senhaforte123");
  await page.getByRole("button", { name: "Criar conta" }).click();
  await page.waitForURL("**/boas-vindas");
  await page.getByRole("button", { name: "20 min" }).click();
  await page.getByRole("button", { name: "Viajar" }).click();
  await page.screenshot({ path: `${SHOTS}/02-boas-vindas.png` });
  await page.getByRole("button", { name: "Começar no A1" }).click();
  await page.waitForURL(`${BASE}/`);
  await page.screenshot({ path: `${SHOTS}/03-dashboard-vazio.png`, fullPage: true });
  console.log("✓ cadastro e boas-vindas");

  // Aula 1 com 2 erros propositais (vão para a revisão)
  await page.goto(`${BASE}/aula/${ALL_LESSONS[0].id}`);
  await page.screenshot({ path: `${SHOTS}/04-aula-explicacao.png`, fullPage: true });
  const l1 = await doLesson(page, 0, [1, 4]);
  await page.screenshot({ path: `${SHOTS}/05-aula-resultado.png`, fullPage: true });
  console.log(`✓ aula "${l1.title}" concluída com erros propositais`);

  // Aula 2 sem erros
  const l2 = await doLesson(page, 1);
  console.log(`✓ aula "${l2.title}" concluída`);

  // Aula 3: captura de exercícios
  const l3 = ALL_LESSONS[2];
  await page.goto(`${BASE}/aula/${l3.id}`);
  for (const n of ["Continuar", "Continuar", "Praticar"]) await page.getByRole("button", { name: n, exact: true }).click();
  await answer(page, l3.exercises[0]);
  await page.screenshot({ path: `${SHOTS}/06-exercicio.png` });
  await page.getByRole("button", { name: "Verificar" }).click();
  await page.screenshot({ path: `${SHOTS}/07-exercicio-correto.png` });

  // Bloqueio: aula 5 não pode abrir
  await page.goto(`${BASE}/aula/${ALL_LESSONS[4].id}`);
  await page.waitForURL("**/trilha", { timeout: 10000 }).catch(() => {
    throw new Error("Aula bloqueada abriu!");
  });
  console.log("✓ aula bloqueada redireciona para a trilha");
  await page.screenshot({ path: `${SHOTS}/08-trilha.png`, fullPage: true });

  await page.goto(`${BASE}/`);
  await page.screenshot({ path: `${SHOTS}/09-dashboard.png`, fullPage: true });
  const body = await page.textContent("main");
  if (!/aulas concluídas/.test(body ?? "")) throw new Error("Dashboard sem estatísticas");

  // Revisão: os 2 exercícios errados devem estar na fila
  // Erros voltam em 10 minutos: primeiro a fila está vazia, com a próxima revisão agendada.
  await page.goto(`${BASE}/revisao`);
  await page.getByText(/Próxima revisão em/).waitFor();
  console.log("✓ revisão agendada para daqui a 10 minutos");
  if (process.env.MAKE_DUE_CMD) {
    // Ambiente de teste local: antecipa os itens para testar a sessão de revisão.
    execSync(process.env.MAKE_DUE_CMD);
    await page.goto(`${BASE}/revisao`);
    await page.getByText(/1 de \d+/).waitFor();
    await page.screenshot({ path: `${SHOTS}/10-revisao.png`, fullPage: true });
    const lesson1 = ALL_LESSONS[0];
    // Responde corretamente aos itens (exercícios errados da aula 1 e vocabulário).
    for (let k = 0; k < 30; k++) {
      const counter = await page.getByText(/^\d+ de \d+$/).first().textContent().catch(() => null);
      if (!counter) break;
      const prompt = (await page.locator("main .panel").first().textContent()) ?? "";
      const ex = lesson1.exercises.find((e) => "prompt" in e && e.prompt && prompt.includes(e.prompt));
      const vocab = ALL_LESSONS.flatMap((l) => l.vocabulary).find((v) => prompt.trim().endsWith(`inglês?${v.pt}`));
      if (ex) await answer(page, ex);
      else if (vocab) await page.getByPlaceholder("Escreva em inglês").fill(vocab.en);
      else throw new Error(`Item de revisão desconhecido: ${prompt}`);
      await page.getByRole("button", { name: "Verificar" }).click();
      const st = (await page.getByRole("status").first().textContent()) ?? "";
      if (!st.includes("Correto")) throw new Error(`Revisão deveria estar correta: ${st}`);
      const last = /^(\d+) de \1$/.test(counter.trim());
      await page.getByRole("button", { name: last ? "Concluir" : "Continuar" }).click();
      if (last) break;
    }
    await page.getByText("Revisão concluída").waitFor();
    console.log("✓ sessão de revisão concluída");
  }

  await page.goto(`${BASE}/professor`);
  await page.screenshot({ path: `${SHOTS}/11-professor.png`, fullPage: true });
  await page.goto(`${BASE}/perfil`);
  await page.screenshot({ path: `${SHOTS}/12-perfil.png`, fullPage: true });

  // Celular
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await mobile.context().addCookies(await page.context().cookies());
  await mobile.goto(`${BASE}/`);
  await mobile.screenshot({ path: `${SHOTS}/13-celular-inicio.png`, fullPage: true });
  await mobile.goto(`${BASE}/trilha`);
  await mobile.screenshot({ path: `${SHOTS}/14-celular-trilha.png` });
  await mobile.goto(`${BASE}/aula/${l3.id}`);
  for (const n of ["Continuar", "Continuar", "Praticar"]) await mobile.getByRole("button", { name: n, exact: true }).click();
  await mobile.screenshot({ path: `${SHOTS}/15-celular-exercicio.png` });

  console.log(`E-mail de teste: ${email}`);
  await browser.close();
})().catch(async (e) => {
  console.error("FALHOU:", e);
  await current?.screenshot({ path: `${SHOTS}/falha.png`, fullPage: true }).catch(() => {});
  process.exit(1);
});
