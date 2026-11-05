/**
 * A conversa por voz não pode travar em "Alex está falando…" quando a voz do servidor não responde:
 * a fala desiste depois de alguns segundos e o professor volta a ouvir.
 * Uso (ambiente local com IA simulada): npx tsx tests/e2e/voz-travada.e2e.ts
 */
import { writeFileSync, rmSync } from "node:fs";
import { chromium } from "playwright";
import { BASE, signup } from "./helpers";

(async () => {
  writeFileSync("/var/tmp/sb/tts-slow", "1");
  writeFileSync("/var/tmp/sb/stt-text", "I like football");
  const browser = await chromium.launch({ args: ["--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream", "--use-file-for-fake-audio-capture=/var/tmp/sb/fake-mic.wav", "--autoplay-policy=no-user-gesture-required"] });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, permissions: ["microphone"] });
  const page = await ctx.newPage();
  await signup(page, "travada");
  await page.goto(`${BASE}/conversa`);
  const t0 = Date.now();
  await page.getByRole("button", { name: "Iniciar conversa por voz" }).click();
  await page.getByText("Alex está falando…").waitFor();
  // Mesmo sem a voz do servidor, a conversa segue: ouve, transcreve e responde.
  await page.getByText("That sounds interesting!").first().waitFor({ timeout: 60000 });
  console.log(`✓ voz do servidor travada: a conversa seguiu sozinha (${Math.round((Date.now() - t0) / 1000)} s)`);
  await page.getByRole("button", { name: "Encerrar a conversa por voz" }).click();
  await browser.close();
})()
  .catch((e) => {
    console.error("FALHOU:", e);
    process.exitCode = 1;
  })
  .finally(() => {
    rmSync("/var/tmp/sb/tts-slow", { force: true });
    rmSync("/var/tmp/sb/stt-text", { force: true });
  });
