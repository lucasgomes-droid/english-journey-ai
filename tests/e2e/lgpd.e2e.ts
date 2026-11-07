/**
 * M7 — Relatório mensal e LGPD:
 * - relatório com aba Semana/Mês e recomendações do professor;
 * - política de privacidade pública;
 * - baixar meus dados (JSON com perfil, conversas, fatos…);
 * - excluir a conta apaga o usuário e todos os dados em cascata (sem afetar outro aluno).
 * Uso (ambiente local com IA simulada): npx tsx tests/e2e/lgpd.e2e.ts
 */
import { chromium } from "playwright";
import { BASE, signup, sql, uid } from "./helpers";

(async () => {
  const browser = await chromium.launch();
  const other = await (await browser.newContext()).newPage();
  const otherEmail = await signup(other, "lgpd-outro");
  const page = await (await browser.newContext({ viewport: { width: 390, height: 844 } })).newPage();
  page.on("pageerror", (e) => console.error("ERRO NA PÁGINA:", e.message));
  const email = await signup(page, "lgpd");
  sql(`insert into public.learner_facts (user_id, kind, value) values (${uid(email)}, 'work', 'works in logistics'), (${uid(otherEmail)}, 'work', 'teacher')`);

  await page.goto(`${BASE}/relatorio?periodo=mes`);
  await page.getByRole("heading", { name: "Relatório mensal" }).waitFor();
  await page.getByRole("heading", { name: /O Alex recomenda para o próximo mês/ }).waitFor();
  await page.getByRole("link", { name: "Semana", exact: true }).click();
  await page.getByRole("heading", { name: "Relatório semanal" }).waitFor();
  console.log("✓ relatório semanal e mensal, com recomendações do professor");

  const anon = await (await browser.newContext()).newPage();
  await anon.goto(`${BASE}/privacidade`);
  await anon.getByRole("heading", { name: "Privacidade e seus dados" }).waitFor();
  console.log("✓ política de privacidade pública (sem login)");

  const res = await page.request.get(`${BASE}/api/account/export`);
  const data = await res.json();
  if (!res.ok() || !String(res.headers()["content-disposition"]).includes("attachment")) throw new Error("exportação falhou");
  if (data.account.email !== email || data.learner_facts.length !== 1 || data.learner_facts[0].value !== "works in logistics") throw new Error(`exportação com dados errados: ${JSON.stringify(data.learner_facts)}`);
  console.log("✓ baixar meus dados: JSON com conta, perfil e o que o professor lembra (só os meus)");

  await page.goto(`${BASE}/perfil`);
  await page.getByRole("button", { name: "Excluir minha conta" }).click();
  const dialog = page.getByRole("dialog", { name: "Excluir a conta para sempre?" });
  await dialog.getByLabel("Para confirmar, digite EXCLUIR").fill("excluir");
  await dialog.getByRole("button", { name: "Excluir conta" }).click();
  await page.getByText("Sua conta e todos os seus dados foram excluídos.").waitFor({ timeout: 20000 });
  const left = sql(`select (select count(*) from auth.users where email = '${email}') || ',' || (select count(*) from public.learner_facts f where not exists (select 1 from auth.users u where u.id = f.user_id)) || ',' || (select count(*) from public.learner_facts where user_id = ${uid(otherEmail)})`);
  if (left !== "0,0,1") throw new Error(`exclusão incompleta ou afetou outro aluno: ${left}`);
  console.log("✓ excluir conta: usuário e dados apagados em cascata; outro aluno intacto");
  await browser.close();
})().catch((e) => {
  console.error("FALHOU:", e);
  process.exit(1);
});
