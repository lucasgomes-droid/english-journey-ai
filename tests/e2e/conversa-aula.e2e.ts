/**
 * Conversa da aula: no fim da aula, "Use você mesmo" oferece conversar com o Alex sobre o tema
 * (ou escrever). Ele pergunta, corrige na hora, e após 4 respostas mostra o que você usou da aula;
 * o resultado conta para o domínio. Depois do teste do módulo, aparece a missão do módulo.
 * Uso (ambiente local com IA simulada): npx tsx tests/e2e/conversa-aula.e2e.ts
 */
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { chromium } from "playwright";
import { ALL_LESSONS } from "../../src/content/curriculum";
import { BASE, doLesson, signup, sql, uid } from "./helpers";

(async () => {
  const STT = "/var/tmp/sb/stt-text";
  rmSync(STT, { force: true });
  const browser = await chromium.launch({
    args: ["--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream", "--use-file-for-fake-audio-capture=/var/tmp/sb/fake-mic.wav", "--autoplay-policy=no-user-gesture-required"],
  });
  const page = await (await browser.newContext({ viewport: { width: 390, height: 844 }, permissions: ["microphone"] })).newPage();
  await page.addInitScript(() => localStorage.setItem("ej-speak-mode", "0"));
  page.on("pageerror", (e) => console.error("ERRO NA PÁGINA:", e.message));
  const email = await signup(page, "talk");

  await doLesson(page, ALL_LESSONS[0]);
  const card = page.locator("section[aria-labelledby=use-voce-mesmo]");
  await card.getByRole("heading", { name: "Use você mesmo" }).waitFor();
  if ((await card.getByRole("radio", { name: "Conversar com o Alex" }).getAttribute("aria-checked")) !== "true") throw new Error("conversa deveria vir selecionada");
  await card.getByRole("button", { name: "Começar a conversa" }).click();
  await card.getByText("Hi! Nice to meet you. What's your name?").waitFor({ timeout: 30000 });
  const reply = async (t: string) => {
    await card.getByLabel("Responder escrevendo").waitFor({ timeout: 30000 });
    await card.getByLabel("Responder escrevendo").fill(t);
    await card.getByRole("button", { name: "Enviar resposta escrita" }).click();
  };
  await reply("My name is Lucas. Nice to meet you!");
  await card.getByText("Great! And where are you from?").first().waitFor({ timeout: 30000 });
  await reply("I has 30 years");
  await card.getByText("Com I usamos have.").waitFor({ timeout: 30000 });
  await card.getByText("Tente de novo · toque no microfone").waitFor({ timeout: 30000 });
  // Repete certo → a conversa anda: o histórico enviado ao Alex passa a ter a frase corrigida.
  writeFileSync(STT, "I have");
  writeFileSync("/var/tmp/sb/mockai.log", "");
  await card.getByRole("button", { name: "Tentar de novo" }).click();
  await page.waitForTimeout(1200);
  await card.getByRole("button", { name: "Enviar" }).click();
  await card.getByText("✓ Você repetiu certo.").waitFor({ timeout: 30000 });
  await card.getByText("Sua vez · toque no microfone para responder").waitFor({ timeout: 30000 });
  rmSync(STT, { force: true });
  const lastTalk = readFileSync("/var/tmp/sb/mockai.log", "utf8").trim().split("\n").filter(Boolean).map((l) => JSON.parse(l)).filter((l) => l.kind === "chat" && !String(l.last).startsWith("(Teacher note")).at(-1);
  if (lastTalk?.last !== "I have") throw new Error(`depois de acertar, o Alex deveria responder à frase corrigida; recebeu: ${lastTalk?.last}`);
  console.log("✓ conversa da aula: corrige na hora; ao repetir certo, a conversa segue a partir da frase correta (sem repetir a pergunta)");
  await reply("I'm from Brazil.");
  await reply("I live in São Paulo.");
  await card.getByText("Você usou a aula numa conversa!").waitFor({ timeout: 40000 });
  await card.getByText("Nice to meet you", { exact: true }).waitFor();
  await card.getByText(/Da próxima vez, tente/).waitFor();
  const saved = sql(`select count(*) from public.production_attempts where user_id = ${uid(email)} and feedback->>'kind' = 'lesson-talk' and score = 84`);
  if (saved !== "1") throw new Error(`conversa não salva como evidência: ${saved}`);
  console.log("✓ após 4 respostas: o que você usou da aula, o que faltou e sugestão; salvo como evidência de domínio");

  // Missão do módulo depois do teste do módulo.
  for (const l of ALL_LESSONS.filter((x) => x.moduleId === "a1-m1" && x.kind === "lesson"))
    sql(`insert into public.lesson_progress (user_id, lesson_id, status, best_score, last_score, attempts, completed_at) values (${uid(email)}, '${l.id}', 'completed', 100, 100, 1, now()) on conflict do nothing`);
  await doLesson(page, ALL_LESSONS.find((l) => l.id === "a1-m1-test")!);
  await page.getByText("Missão da unidade: Fazer um novo amigo").waitFor({ timeout: 30000 });
  const href = await page.getByRole("link", { name: "Ligar agora" }).getAttribute("href");
  if (href !== "/professor?cenario=new-friend&nivel=A1&ligar=1") throw new Error(`link da missão: ${href}`);
  console.log("✓ teste do módulo aprovado → missão do módulo (situação real) com ligação direta");
  await browser.close();
})().catch((e) => {
  console.error("FALHOU:", e);
  process.exit(1);
});
