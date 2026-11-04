/**
 * Fase 4 — Minhas Dificuldades e Meu Professor IA:
 * erros reais viram padrões; o plano passa pelas 7 etapas (assunto, explicação, exemplos,
 * exercícios, conversa, verificação, registro) e o painel mostra a evolução.
 * Uso (ambiente local com IA simulada): npx tsx tests/e2e/fase4.e2e.ts
 */
import { chromium, type Page } from "playwright";
import { getCategory } from "../../src/content/error-patterns";
import { getLesson } from "../../src/content/curriculum";
import { BASE, SHOTS, signup, sql, uid } from "./helpers";

let current: Page | null = null;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  current = page;
  page.on("pageerror", (e) => console.error("ERRO NA PÁGINA:", e.message));
  const email = await signup(page, "f4");
  const u = uid(email);

  // Histórico real simulado: erros em perguntas (exercícios e conversa) e alguns acertos de vocabulário.
  const ql = getLesson("a1-m3-l4")!;
  const values = ql.exercises
    .slice(0, 6)
    .map((e, i) => `(${u}, '${ql.id}', '${e.id}', 'grammar', '{"kind":"text","text":"x"}'::jsonb, ${i === 5}, ${4000 + i * 900}, now() - interval '3 day' - interval '${i} hour')`)
    .join(",");
  sql(`insert into public.exercise_answers (user_id, lesson_id, exercise_id, skill, answer, correct, response_ms, created_at) values ${values};
       with c as (insert into public.conversations (user_id, mode, scenario_id, level_code, title) values (${u}, 'scenario', 'new-friend', 'A1', 'Fazer um novo amigo') returning id)
       insert into public.messages (conversation_id, user_id, role, content, correction, created_at)
       select c.id, ${u}, 'user', x.o, jsonb_build_object('original', x.o, 'corrected', x.c, 'explanation_pt', 'Pergunta precisa de do.'), now() - interval '1 hour'
       from c, (values ('Where you live?', 'Where do you live?'), ('What you do?', 'What do you do?'), ('You like music?', 'Do you like music?')) as x(o, c);`);

  await page.goto(`${BASE}/dificuldades`);
  const label = getCategory("questions")!.label;
  await page.getByText("Sua principal dificuldade agora").waitFor();
  const top = await page.locator("ol > li").first().textContent();
  if (!top?.includes(label)) throw new Error("principal dificuldade deveria ser perguntas: " + top);
  await page.getByText("Where do you live?").first().waitFor();
  await page.screenshot({ path: `${SHOTS}/f4-dificuldades.png`, fullPage: true });
  console.log("✓ padrão encontrado a partir de exercícios e conversa: " + label);

  // Plano: etapas 1–7.
  await page.locator("ol > li").first().getByRole("button", { name: "Começar plano de recuperação" }).click();
  await page.waitForURL("**/dificuldades/questions");
  await page.getByText("O erro, explicado em português").waitFor();
  await page.getByRole("button", { name: "Entendi, vamos praticar" }).click();
  await page.getByText(/Exercício 1 de/).waitFor();
  await page.waitForLoadState("networkidle");
  const total = Number((await page.getByText(/Exercício 1 de/).textContent())!.match(/de (\d+)/)![1]);
  for (let i = 0; i < total; i++) {
    await page.getByText(`Exercício ${i + 1} de ${total}`).waitFor();
    // As primeiras são as frases do próprio aluno: a correta é a que ele NÃO escreveu.
    const own = ["x", "Where you live?", "What you do?", "You like music?"];
    const radios = page.getByRole("radio");
    const drill = getCategory("questions")!.drills[i - (total - getCategory("questions")!.drills.length)];
    if (i < total - getCategory("questions")!.drills.length) {
      const texts = await radios.allTextContents();

      await radios.nth(texts.findIndex((t) => !own.includes(t.replace(/^\d+/, "").trim()))).click();
    } else if (drill.type === "multiple_choice") {
      await radios.nth(drill.answer).click();
    } else if (drill.type === "fill_blank") {
      await page.locator("main input").first().fill(drill.accepted[0]);
    }
    await page.getByRole("button", { name: "Verificar", exact: true }).click();
    const st = (await page.getByRole("status").first().textContent()) ?? "";
    if (!/Correto/.test(st)) console.log(`  exercício ${i + 1}: ${st}`);
    await page.getByRole("button", { name: "Continuar" }).click();
  }
  await page.getByText(/Você acertou 100%/).waitFor();
  console.log(`✓ exercícios específicos (${total}, com frases do próprio aluno): 100%`);

  // Etapa 5: conversa (4 falas) e etapa 6–7: verificação e registro.
  sql(`insert into public.messages (conversation_id, user_id, role, content) select c.id, ${u}, 'user', 'Do you live here?' from public.conversations c cross join generate_series(1,4) where c.user_id = ${u};`);
  await page.reload();
  await page.getByText("Falas desde o início do plano: 4/4").waitFor();
  await page.getByRole("button", { name: "Verificar minha evolução" }).click();
  await page.getByText(/Você evoluiu/).first().waitFor({ timeout: 15000 });
  await page.goto(`${BASE}/dificuldades`);
  await page.getByText("Histórico dos planos").waitFor();
  await page.screenshot({ path: `${SHOTS}/f4-historico.png`, fullPage: true });
  console.log("✓ plano verificado e registrado no histórico");

  // Painel do professor.
  await page.goto(`${BASE}/meu-professor`);
  for (const t of ["O professor recomenda agora", "Taxa de acerto por competência", "Pontos fortes e dificuldades", "Evolução da pronúncia", "Evolução da conversação", "Tempo para responder", "Histórico de erros", "Próximos objetivos"])
    await page.getByText(t).first().waitFor();
  await page.getByText("Where do you live?").first().waitFor();
  await page.screenshot({ path: `${SHOTS}/f4-professor.png`, fullPage: true });
  console.log("✓ painel Meu Professor IA com dados reais (erros, tempos, evolução)");
  await browser.close();
})().catch(async (e) => {
  await current?.screenshot({ path: `${SHOTS}/f4-falha.png`, fullPage: true }).catch(() => null);
  console.error("FALHOU:", e);
  process.exit(1);
});
