/**
 * M0 — estabilidade e custo de IA:
 * - cada fala da conversa usa o modelo menor; se a cota dele acabar (429), o maior assume sem erro para o aluno;
 * - o uso é registrado por aluno/dia e, no limite diário, a conversa avisa com mensagem amigável;
 * - voz natural com cota esgotada: o servidor para de insistir (não gasta cota a cada frase).
 * Roda por último (o bloqueio da voz fica na memória do servidor por alguns minutos).
 * Uso (ambiente local com IA simulada): npx tsx tests/e2e/custo.e2e.ts
 */
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { chromium } from "playwright";
import { BASE, signup, sql, uid } from "./helpers";

const LOG = "/var/tmp/sb/mockai.log";
const lines = () => readFileSync(LOG, "utf8").trim().split("\n").filter(Boolean).map((l) => JSON.parse(l) as { kind: string; model?: string });

(async () => {
  for (const f of ["/var/tmp/sb/quota-20b", "/var/tmp/sb/quota-120b", "/var/tmp/sb/tts-429"]) rmSync(f, { force: true });
  const browser = await chromium.launch();
  const page = await (await browser.newContext()).newPage();
  const email = await signup(page, "custo");
  const say = (message: string, conversationId?: string) => page.request.post(`${BASE}/api/tutor`, { data: { message, conversationId, tutorMode: "professor" } });

  // 1) Modelo menor nas falas.
  writeFileSync(LOG, "");
  let r = await say("Hello, I like coffee");
  if (!r.ok()) throw new Error(`conversa falhou: ${r.status()} ${await r.text()}`);
  const conv = (await r.json()).conversationId as string;
  const models1 = lines().filter((l) => l.kind === "chat").map((l) => l.model);
  if (models1.at(-1) !== "openai/gpt-oss-20b") throw new Error(`esperava gpt-oss-20b, veio ${models1.join(",")}`);
  console.log("✓ fala da conversa usa o modelo menor (gpt-oss-20b)");

  // 2) Cota do menor esgotada → o maior assume.
  writeFileSync("/var/tmp/sb/quota-20b", "1");
  writeFileSync(LOG, "");
  r = await say("I work in a warehouse", conv);
  rmSync("/var/tmp/sb/quota-20b", { force: true });
  if (!r.ok()) throw new Error(`reserva falhou: ${r.status()} ${await r.text()}`);
  const models2 = lines().filter((l) => l.kind === "chat").map((l) => l.model);
  if (models2.join(",") !== "openai/gpt-oss-20b,openai/gpt-oss-120b") throw new Error(`reserva errada: ${models2.join(",")}`);
  console.log("✓ cota do modelo menor esgotada → o maior responde, sem erro para o aluno");

  // 3) Uso registrado por aluno e por dia.
  const used = Number(sql(`select requests from public.ai_usage where user_id = ${uid(email)} and kind = 'chat' and day = current_date`));
  if (used !== 2) throw new Error(`uso registrado errado: ${used}`);
  console.log("✓ uso de IA registrado por aluno e por dia (2 falas)");

  // 4) Limite diário → aviso amigável, sem chamar a IA.
  sql(`update public.ai_usage set requests = 150 where user_id = ${uid(email)} and kind = 'chat'`);
  writeFileSync(LOG, "");
  r = await say("One more", conv);
  const body = await r.json();
  if (r.status() !== 429 || !body.limit || !/conversas com o professor de hoje/.test(body.error)) throw new Error(`limite não aplicado: ${r.status()} ${JSON.stringify(body)}`);
  if (lines().some((l) => l.kind === "chat")) throw new Error("a IA foi chamada mesmo no limite");
  console.log("✓ limite diário: mensagem amigável e a IA não é chamada");

  // 5) Voz natural com cota esgotada: o servidor para de insistir.
  writeFileSync("/var/tmp/sb/tts-429", "1");
  writeFileSync(LOG, "");
  const t1 = await page.request.post(`${BASE}/api/tts`, { data: { text: "Quota test one", voice: "f1" } });
  const t2 = await page.request.post(`${BASE}/api/tts`, { data: { text: "Quota test two", voice: "f1" } });
  rmSync("/var/tmp/sb/tts-429", { force: true });
  const ttsCalls = lines().filter((l) => l.kind === "tts" || l.kind === undefined).length;
  if (t1.status() !== 429 || t2.status() === 200) throw new Error(`voz: ${t1.status()} ${t2.status()}`);
  if (ttsCalls > 1) throw new Error(`o servidor insistiu na voz com cota esgotada (${ttsCalls} chamadas)`);
  console.log("✓ voz natural sem cota: uma tentativa só, depois o app usa a voz do aparelho");

  await browser.close();
})().catch((e) => {
  for (const f of ["/var/tmp/sb/quota-20b", "/var/tmp/sb/tts-429"]) rmSync(f, { force: true });
  console.error("FALHOU:", e);
  process.exit(1);
});
