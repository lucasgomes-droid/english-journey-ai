/**
 * Ligação numa situação real (cenário): correção na hora.
 * O aluno fala com erro → o personagem pausa, diz em português "a forma correta é…", fala a frase certa
 * e pede para tentar de novo; a nova tentativa é conferida e só depois a conversa continua.
 * Uso (ambiente local com IA simulada): npx tsx tests/e2e/ligacao.e2e.ts
 */
import { writeFileSync, rmSync } from "node:fs";
import { chromium } from "playwright";
import { BASE, SHOTS, signup } from "./helpers";

const STT = "/var/tmp/sb/stt-text";

(async () => {
  rmSync(STT, { force: true });
  const browser = await chromium.launch({
    args: ["--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream", "--use-file-for-fake-audio-capture=/var/tmp/sb/fake-mic.wav", "--autoplay-policy=no-user-gesture-required"],
  });
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, permissions: ["microphone"] });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => console.error("ERRO NA PÁGINA:", e.message));
  await signup(page, "liga");

  writeFileSync(STT, "Hi, my name is Lucas");
  await page.goto(`${BASE}/professor?cenario=cafe&nivel=A1&ligar=1`);
  const call = page.getByRole("dialog", { name: /Ligação com/ });
  await call.waitFor({ timeout: 30000 });
  await call.getByRole("radiogroup", { name: "Intensidade da correção" }).waitFor();
  if ((await call.getByRole("radio", { name: "Normal" }).getAttribute("aria-checked")) !== "true") throw new Error("intensidade padrão deveria ser Normal");

  await call.getByText("Quase! A forma correta é:").waitFor({ timeout: 60000 });
  await call.getByText("My name's Lucas").first().waitFor();
  await call.getByRole("button", { name: "Pular e continuar a conversa" }).waitFor();
  await page.screenshot({ path: `${SHOTS}/ligacao-corrigir-na-hora.png` });
  console.log("✓ erro na fala → 'Quase! A forma correta é:' + frase certa + pede para tentar de novo");

  writeFileSync(STT, "My name's Lucas");
  await call.getByText("✓ Você repetiu certo:").waitFor({ timeout: 60000 });
  await call.getByText("Nice to meet you, Lucas!").first().waitFor({ timeout: 30000 });
  await call.getByText("✓ Você repetiu certo:").waitFor();
  console.log("✓ nova tentativa conferida; depois o personagem continua a conversa");

  rmSync(STT, { force: true });
  await call.getByRole("button", { name: "Encerrar ligação" }).click();
  await page.getByRole("heading", { name: "Resumo da ligação" }).waitFor();
  await page.getByText("My name's Lucas").first().waitFor();
  console.log("✓ a correção também fica no resumo da ligação");
  // Situações do dia a dia aparecem na lista e abrem normalmente.
  await page.goto(`${BASE}/conversar`);
  for (const t of ["No banco", "Na academia", "Conversa com o vizinho", "Small talk no elevador"]) await page.getByText(t, { exact: true }).first().waitFor();
  await page.goto(`${BASE}/professor?cenario=bank&nivel=A1`);
  await page.getByText("Good morning. How can I help you today?").first().waitFor();
  console.log("✓ situações do dia a dia (banco, academia, vizinho, small talk…) listadas e abrindo com o personagem");
  await browser.close();
})().catch((e) => {
  console.error("FALHOU:", e);
  rmSync(STT, { force: true });
  process.exit(1);
});
