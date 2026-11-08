/**
 * Projeto de Evolução: A1 em 8 unidades, transcrição do listening (salvar palavra), Vocabulário,
 * Construir frases (situação → resposta → correção → repetir) e painel do Meu progresso.
 * Uso (ambiente local com IA simulada): npx tsx tests/e2e/evolucao.e2e.ts
 */
import { chromium } from "playwright";
import { ALL_LESSONS, LEVELS } from "../../src/content/curriculum";
import { LISTENING } from "../../src/content/listening";
import { BASE, SHOTS, doLesson, signup, sql, uid } from "./helpers";

(async () => {
  const a1 = LEVELS.find((l) => l.code === "A1")!;
  if (
    a1.modules.length !== 8 ||
    a1.modules[0].title !== "Primeiros passos" ||
    a1.modules[7].title !== "Consolidação"
  )
    throw new Error("A1 deveria ter 8 unidades na ordem do projeto");
  const browser = await chromium.launch();
  for (const vp of [
    { name: "celular", width: 390, height: 844 },
    { name: "desktop", width: 1280, height: 900 },
  ]) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
    });
    await ctx.addInitScript(() => localStorage.setItem("ej-speak-mode", "0"));
    const page = await ctx.newPage();
    page.on("pageerror", (e) => console.error("ERRO NA PÁGINA:", e.message));
    const email = await signup(page, `evo${vp.name}`);

    // Trilha: unidades, primeira aula é "Alfabeto".
    await page.goto(`${BASE}/trilha`);
    await page.getByText("Unidade 1").first().waitFor();
    await page.getByText("Primeiros passos").first().waitFor();
    await doLesson(page, ALL_LESSONS[0]);
    // Aula em foco no celular: sem a barra de navegação de baixo.
    await page.goto(`${BASE}/aula/${ALL_LESSONS[1].id}`);
    await page.getByRole("link", { name: "Sair da aula" }).waitFor();
    if (
      vp.name === "celular" &&
      (await page.getByRole("navigation", { name: "Principal" }).count())
    )
      throw new Error("barra de navegação deveria sumir na aula");
    console.log(
      `✓ [${vp.name}] A1 em unidades; aula concluída; aula em modo foco`,
    );

    // Vocabulário: as palavras da aula aparecem com estado e áudio; salvar uma palavra própria.
    await page.goto(`${BASE}/vocabulario`);
    await page.getByRole("heading", { name: "Vocabulário" }).waitFor();
    const word = ALL_LESSONS[0].vocabulary[0];
    await page.getByText(word.en, { exact: true }).first().waitFor();
    await page
      .getByRole("button", { name: `Ouvir ${word.en}` })
      .first()
      .waitFor();
    sql(
      `update public.review_items set lapses = 1, repetitions = 0, last_reviewed_at = now() where user_id = ${uid(email)} and item_id = '${word.id}'`,
    );
    await page.reload();
    await page.getByText("Esquecendo").first().waitFor();
    await page.getByText(/para recuperar/).waitFor();
    await page
      .getByLabel("Salvar uma palavra ou expressão")
      .fill("look forward to");
    await page.getByRole("button", { name: /Salvar/ }).click();
    await page.getByText(/Salvo: look forward to/).waitFor();
    await page.getByText("look forward to", { exact: true }).waitFor();
    await page.screenshot({
      path: `${SHOTS}/evo-vocabulario-${vp.name}.png`,
      fullPage: true,
    });
    console.log(
      `✓ [${vp.name}] Vocabulário: estado, áudio, esquecidas primeiro e palavra salva`,
    );

    // Listening: contexto/objetivo antes; transcrição depois, com replay e salvar palavra.
    const item = LISTENING.find((i) => i.level === "A1")!;
    await page.goto(`${BASE}/listening/${item.id}`);
    await page
      .getByText(/Objetivo/)
      .first()
      .waitFor();
    for (const [qi, q] of item.questions.entries())
      await page
        .getByRole("group", { name: `Pergunta ${qi + 1}` })
        .getByRole("button", { name: q.options[q.answer], exact: true })
        .click();
    await page.getByPlaceholder("Escreva o que ouviu").fill(item.dictation);
    await page.getByRole("button", { name: "Verificar respostas" }).click();
    await page.getByText("Transcrição").waitFor({ timeout: 15000 });
    await page
      .getByRole("button", { name: `Ouvir de novo: ${item.lines[0].text}` })
      .waitFor();
    const tok = item.lines[0].text
      .split(/\s+/)
      .find((t) => /^[A-Za-z]{4,}/.test(t))!;
    await page.locator("p[lang=en] button", { hasText: tok }).first().click();
    await page
      .getByRole("button", { name: "Salvar no meu vocabulário" })
      .click();
    await page
      .getByRole("status")
      .filter({ hasText: /salva|já estava/ })
      .waitFor();
    const n = sql(
      `select count(*) from public.personal_phrases where user_id = ${uid(email)} and source = 'listening'`,
    );
    if (Number(n) < 1) throw new Error("palavra do listening não foi salva");
    console.log(
      `✓ [${vp.name}] Listening: transcrição com replay e palavra salva no vocabulário`,
    );

    // Construir frases: errar, ver a correção e a versão para repetir; acertar a seguinte.
    await page.goto(`${BASE}/falar/construir?nivel=A1`);
    await page.getByText("Situação 1 de 8").waitFor();
    await page.getByRole("button", { name: "Ver dica" }).click();
    await page.getByText(/Use:/).waitFor();
    await page
      .getByLabel("Sua resposta em inglês")
      .fill("I is Lucas and I is from Brazil.");
    await page.getByRole("button", { name: "Corrigir" }).click();
    await page.getByText("Quase! Veja a versão corrigida:").waitFor();
    await page.getByText("I'm Lucas and I'm from Brazil.").waitFor();
    await page.getByText(/Com I usamos am/).waitFor();
    await page.screenshot({
      path: `${SHOTS}/evo-construir-${vp.name}.png`,
      fullPage: true,
    });
    await page.getByRole("button", { name: "Próxima situação" }).click();
    await page.getByText("Situação 2 de 8").waitFor();
    await page
      .getByLabel("Sua resposta em inglês")
      .fill("I'm a driver. I work in a warehouse.");
    await page.getByRole("button", { name: "Corrigir" }).click();
    await page.getByText("Correto!").waitFor();
    console.log(
      `✓ [${vp.name}] Construir frases: correção mostra original, versão certa e explicação`,
    );

    // Meu progresso: painel visual.
    await page.goto(`${BASE}/meu-professor`);
    for (const t of [
      "Seu nível (estimativa do app)",
      "Sua semana",
      "Metas",
      "Aulas por semana",
      "Domínio por competência",
      "Conquistas",
    ])
      await page.getByText(t, { exact: true }).first().waitFor();
    for (const s of [
      "Listening",
      "Fala",
      "Gramática",
      "Vocabulário",
      "Leitura",
      "Escrita",
    ])
      await page
        .getByRole("region", { name: "Domínio por competência" })
        .getByText(s, { exact: true })
        .waitFor();
    await page.getByRole("img", { name: /Aulas por semana: .*1$/ }).waitFor();
    await page.getByRole("img", { name: /Esquecendo: 1/ }).waitFor();
    await page.screenshot({
      path: `${SHOTS}/evo-progresso-${vp.name}.png`,
      fullPage: true,
    });
    // Início: meta, sequência e revisões.
    await page.goto(`${BASE}/`);
    await page
      .getByRole("region", { name: "Hoje" })
      .getByText("Meta de hoje")
      .waitFor();
    await page.getByText(/Última atividade:/).waitFor();
    await page.screenshot({
      path: `${SHOTS}/evo-inicio-${vp.name}.png`,
      fullPage: true,
    });
    console.log(
      `✓ [${vp.name}] Meu progresso: nível, semana, metas, gráfico, vocabulário, 6 competências e conquistas; Início com o dia`,
    );
    await ctx.close();
  }
  await browser.close();
})().catch((e) => {
  console.error("FALHOU:", e);
  process.exit(1);
});
