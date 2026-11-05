/**
 * Professor particular por voz (aba Conversa):
 * - modos Livre / Professor / Imersão;
 * - conversa contínua por voz (microfone simulado): ouve, transcreve, responde e fala;
 * - aluno pergunta em português "como falo...?" → professor ensina e pede para repetir;
 * - repetição conferida pelo reconhecedor: sem entender → pede de novo (não conta erro); certo → elogia;
 * - relatório da sessão com pronúncia, pontos positivos e exercícios recomendados; histórico.
 * Uso (ambiente local com IA simulada): npx tsx tests/e2e/conversa.e2e.ts
 */
import { writeFileSync, rmSync } from "node:fs";
import { chromium, type Page } from "playwright";
import { BASE, SHOTS, signup, sql, uid } from "./helpers";

const STT = "/var/tmp/sb/stt-text";
let current: Page | null = null;

(async () => {
  rmSync(STT, { force: true });
  const browser = await chromium.launch({
    args: ["--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream", "--use-file-for-fake-audio-capture=/var/tmp/sb/fake-mic.wav", "--autoplay-policy=no-user-gesture-required"],
  });
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, permissions: ["microphone"] });
  const page = await ctx.newPage();
  current = page;
  page.on("pageerror", (e) => console.error("ERRO NA PÁGINA:", e.message));
  const email = await signup(page, "conv");

  await page.goto(`${BASE}/conversa`);
  const modes = page.getByRole("navigation", { name: "Modo da conversa" });
  for (const m of ["Livre", "Professor", "Imersão"]) await modes.getByRole("link", { name: m }).waitFor();
  await modes.getByRole("link", { name: "Professor" }).click();
  await page.waitForURL("**/conversa?modo=professor");
  console.log("✓ três modos disponíveis; escolhido o modo Professor");

  // Pergunta em português, por voz: "como falo...?"
  writeFileSync(STT, "Eu trabalho em um armazém. Como falo isso em inglês?");
  await page.getByRole("button", { name: "Iniciar conversa por voz" }).click();
  await page.getByText("O jeito de falar isso em inglês é:").first().waitFor({ timeout: 40000 });
  await page.getByText("I work in a warehouse and I'm responsible for inventory.").first().waitFor();
  await page.getByText("Repita comigo").first().waitFor();
  await page.getByText("Você (voz)").first().waitFor();
  console.log("✓ conversa por voz: pergunta em português → 'O jeito de falar isso em inglês é:' + frase em inglês, e pede para repetir");

  // Repetição sem entender → pede de novo (não marca erro); depois certa → elogio.
  writeFileSync(STT, "");
  await page.getByText("Não consegui ouvir bem").first().waitFor({ timeout: 40000 });
  writeFileSync(STT, "I work in a warehouse");
  await page.getByText("Saiu certinho!").first().waitFor({ timeout: 40000 });
  await page.screenshot({ path: `${SHOTS}/conversa-repita.png`, fullPage: true });
  console.log("✓ repetição: reconhecimento ruim pede para repetir; repetição certa é confirmada");

  // Continua a conversa por voz, encerra e vê o relatório.
  writeFileSync(STT, "I have 30 years and I like my job");
  await page.getByText("That sounds interesting!").first().waitFor({ timeout: 40000 });
  await page.getByRole("button", { name: "Encerrar a conversa por voz" }).click();
  rmSync(STT, { force: true });
  await page.getByRole("button", { name: /Encerrar e ver relatório/ }).click();
  const sheet = page.getByRole("dialog", { name: "Relatório da conversa" });
  for (const t of ["Pontos positivos", "Pronúncia nesta conversa", "Erros cometidos", "Exercícios recomendados"]) await sheet.getByText(t).first().waitFor({ timeout: 20000 });
  await page.screenshot({ path: `${SHOTS}/conversa-relatorio.png`, fullPage: true });
  console.log("✓ relatório da sessão: pontos positivos, pronúncia, erros e exercícios recomendados");

  const conv = sql(`select tutor_mode || ',' || (memory is null)::text from public.conversations where user_id = ${uid(email)} and tutor_mode is not null;`);
  if (!conv.startsWith("professor")) throw new Error("conversa não salvou o modo: " + conv);
  const times = Number(sql(`select count(*) from public.messages where user_id = ${uid(email)} and role = 'user' and response_ms is not null;`));
  if (times < 1) throw new Error("tempo de resposta não registrado");
  await sheet.getByRole("button", { name: "Fechar" }).last().click();
  await page.goto(`${BASE}/conversa`);
  await page.getByText("Conversas anteriores").waitFor();
  await page.locator("aside").getByRole("link").nth(1).click();
  await page.getByText("O jeito de falar isso em inglês é:").first().waitFor();
  // Ouvir de novo não trava: a conversa pausa e pode recomeçar.
  await page.getByRole("button", { name: "Ouvir de novo" }).first().click();
  await page.getByRole("button", { name: "Iniciar conversa por voz" }).waitFor();
  console.log(`✓ histórico: conversa salva com modo, tempo de resposta (${times} falas) e reaberta`);
  await browser.close();
})().catch(async (e) => {
  await current?.screenshot({ path: `${SHOTS}/conversa-falha.png`, fullPage: true }).catch(() => null);
  rmSync(STT, { force: true });
  console.error("FALHOU:", e);
  process.exit(1);
});
