/**
 * Gera supabase/migrations/20261104120100_seed_content.sql a partir do conteúdo em src/content.
 * Uso: npm run content:sql
 * Sempre que adicionar ou alterar aulas, rode este script e execute o SQL gerado
 * no Supabase (ele é idempotente: usa upsert).
 */
import { writeFileSync } from "node:fs";
import path from "node:path";
import { LEVELS } from "../src/content/curriculum";
import { MINI_MODULES } from "../src/content/mini";

const q = (v: string) => `'${v.replace(/'/g, "''")}'`;
const lines: string[] = [
  "-- ARQUIVO GERADO AUTOMATICAMENTE por `npm run content:sql`. Não edite à mão.",
  "-- Idempotente (upsert): pode ser executado quantas vezes for preciso.",
];

LEVELS.forEach((lv, i) => {
  lines.push(
    `insert into public.levels (code,name,description,sort) values (${q(lv.code)},${q(lv.name)},${q(lv.description)},${i + 1}) on conflict (code) do update set name=excluded.name, description=excluded.description, sort=excluded.sort;`,
  );
});

for (const lv of LEVELS) {
  const modules = [...lv.modules, ...MINI_MODULES.filter((m) => m.level === lv.code)];
  for (const m of modules) {
    lines.push(
      `insert into public.modules (id,level_code,sort,title,description) values (${q(m.id)},${q(lv.code)},${m.order},${q(m.title)},${q(m.description)}) on conflict (id) do update set level_code=excluded.level_code, sort=excluded.sort, title=excluded.title, description=excluded.description;`,
    );
    for (const l of m.lessons) {
      lines.push(
        `insert into public.lessons (id,module_id,sort,kind,title,objective,xp,pass_score) values (${q(l.id)},${q(m.id)},${l.order},${q(l.kind)},${q(l.title)},${q(l.objective)},${l.xp},${l.passScore}) on conflict (id) do update set module_id=excluded.module_id, sort=excluded.sort, kind=excluded.kind, title=excluded.title, objective=excluded.objective, xp=excluded.xp, pass_score=excluded.pass_score;`,
      );
      for (const v of l.vocabulary) {
        lines.push(
          `insert into public.vocabulary (id,lesson_id,en,pt,pronunciation) values (${q(v.id)},${q(l.id)},${q(v.en)},${q(v.pt)},${q(v.say)}) on conflict (id) do update set en=excluded.en, pt=excluded.pt, pronunciation=excluded.pronunciation;`,
        );
      }
      l.exercises.forEach((e, idx) => {
        const { id, type, skill, ...payload } = e;
        lines.push(
          `insert into public.exercises (id,lesson_id,sort,type,skill,payload) values (${q(id)},${q(l.id)},${idx + 1},${q(type)},${q(skill)},${q(JSON.stringify(payload))}::jsonb) on conflict (id) do update set sort=excluded.sort, type=excluded.type, skill=excluded.skill, payload=excluded.payload;`,
        );
      });
    }
  }
}
lines.push("");

const out = path.join(__dirname, "..", "supabase", "migrations", "20261104120100_seed_content.sql");
writeFileSync(out, lines.join("\n"));
console.log(`Gerado: ${out} (${lines.length} linhas)`);
