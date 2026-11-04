import Link from "next/link";
import { Target } from "lucide-react";
import { getSession } from "@/lib/data";
import { computeDiagnostics } from "@/lib/diagnostics";

export const metadata = { title: "Pontos fracos" };

export default async function DiagnosticoPage() {
  const { supabase, user } = await getSession();
  const d = await computeDiagnostics(supabase, user.id);
  const sorted = [...d.areas].sort((a, b) => (a.score ?? 101) - (b.score ?? 101));

  return (
    <main className="space-y-6">
      <header>
        <h1 className="font-display text-4xl font-bold">Meus pontos fracos</h1>
        <p className="mt-2 max-w-2xl text-muted">Calculado a partir de tudo o que você fez: exercícios, listening, revisões e conversas. Atualiza sozinho a cada atividade.</p>
      </header>

      <section className="overflow-hidden rounded-3xl bg-[#0e4d57] p-6 text-white sm:p-8">
        {d.weakest ? (
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="flex items-center gap-2 text-white/75">
                <Target size={18} aria-hidden /> Seu maior ponto fraco agora
              </p>
              <p className="mt-1 font-display text-5xl font-bold">{d.weakest.label}</p>
              <p className="mt-1 text-white/80">
                {d.weakest.score}% de acerto · {d.weakest.detail}
              </p>
            </div>
            <Link href={d.weakest.href} className="btn-go text-lg">
              {d.weakest.action}
            </Link>
          </div>
        ) : (
          <div>
            <p className="font-display text-3xl font-bold">Ainda estamos conhecendo você</p>
            <p className="mt-2 text-white/80">Faça algumas aulas, um listening e uma conversa. Com pelo menos 5 respostas por área, o diagnóstico aparece aqui.</p>
          </div>
        )}
      </section>

      <section className="grid gap-4 sm:grid-cols-3" aria-label="Fala nesta semana">
        <div className="panel p-5">
          <p className="font-display text-3xl font-bold">{d.speakingThisWeek.voiceMessages}</p>
          <p className="font-bold">frases faladas em conversas</p>
          <p className="text-sm text-muted">nos últimos 7 dias</p>
        </div>
        <div className="panel p-5">
          <p className="font-display text-3xl font-bold">{d.speakingThisWeek.pronunciation}</p>
          <p className="font-bold">gravações de pronúncia</p>
          <p className="text-sm text-muted">nos últimos 7 dias</p>
        </div>
        <Link href="/professor?ligar=1" className="flex flex-col justify-center rounded-2xl bg-boarding p-5 text-boarding-ink">
          <p className="font-display text-xl font-bold">Falar agora</p>
          <p className="text-sm">Ligação só por voz com o professor</p>
        </Link>
      </section>

      <section className="panel p-6" aria-labelledby="areas">
        <h2 id="areas" className="font-display text-2xl font-bold">
          Todas as áreas
        </h2>
        <p className="text-sm text-muted">Da mais fraca para a mais forte</p>
        <ul className="mt-5 space-y-5">
          {sorted.map((a) => (
            <li key={a.key}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-bold">{a.label}</span>
                <span className="text-sm text-muted">
                  {a.score === null ? `faltam dados (${a.samples}/5)` : `${a.score}% · ${a.samples} ${a.key === "pronunciation" ? "gravações" : "respostas"}`}
                </span>
              </div>
              <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-surface-2">
                <div
                  className={`h-full rounded-full transition-all ${a.score === null ? "" : a.score < 60 ? "bg-wrong" : a.score < 80 ? "bg-boarding" : "bg-correct"}`}
                  style={{ width: `${a.score ?? 0}%` }}
                />
              </div>
              <p className="mt-1 text-sm text-muted">{a.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="panel p-6" aria-labelledby="topicos">
          <h2 id="topicos" className="font-display text-2xl font-bold">
            Temas com mais erros
          </h2>
          {d.hardTopics.length ? (
            <ul className="mt-4 divide-y divide-line">
              {d.hardTopics.map((t) => (
                <li key={t.lessonId}>
                  <Link href={`/aula/${t.lessonId}`} className="flex items-center justify-between gap-3 py-3 hover:text-atlantic">
                    <span className="font-bold">{t.title}</span>
                    <span className="text-sm text-muted">
                      {t.rate}% de erro · {t.errors} {t.errors === 1 ? "erro" : "erros"}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-muted">Nenhum erro registrado ainda.</p>
          )}
        </section>

        <section className="panel p-6" aria-labelledby="palavras">
          <h2 id="palavras" className="font-display text-2xl font-bold">
            Palavras que você mais esquece
          </h2>
          {d.hardWords.length ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {d.hardWords.map((w) => (
                <li key={w.en} className="rounded-xl bg-surface-2 px-3 py-2" title={`Esquecida ${w.lapses}×`}>
                  <span className="font-bold" lang="en">
                    {w.en}
                  </span>{" "}
                  <span className="text-sm text-muted">{w.pt}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-muted">Quando você errar uma palavra na revisão, ela aparece aqui.</p>
          )}
          <Link href="/revisao" className="btn-ghost mt-4">
            Revisar agora
          </Link>
        </section>

        <section className="panel p-6" aria-labelledby="correcoes">
          <h2 id="correcoes" className="font-display text-2xl font-bold">
            Erros nas conversas
          </h2>
          {d.recentCorrections.length ? (
            <ul className="mt-4 space-y-3">
              {d.recentCorrections.map((c, i) => (
                <li key={i} className="rounded-xl border border-boarding/60 bg-boarding/10 p-3 text-sm">
                  <span className="text-wrong line-through" lang="en">
                    {c.original}
                  </span>{" "}
                  →{" "}
                  <strong lang="en">{c.corrected}</strong>
                  <span className="mt-1 block text-muted">{c.explanation}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-muted">As correções do professor e dos personagens aparecem aqui.</p>
          )}
        </section>

        <section className="panel p-6" aria-labelledby="sons">
          <h2 id="sons" className="font-display text-2xl font-bold">
            Sons que você mais erra
          </h2>
          {d.weakSounds.length ? (
            <ul className="mt-4 space-y-2">
              {d.weakSounds.map((w) => (
                <li key={w.phoneme} className="rounded-xl bg-surface-2 p-3 text-sm">
                  <span className="font-mono text-base font-bold">/{w.phoneme}/</span> <span className="text-muted">· {w.misses}×</span>
                  <span className="mt-1 block">{w.tip}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-muted">Aparece quando houver gravações com análise fonética (nota por som).</p>
          )}
          {d.pronunciationWeeks.length > 1 && (
            <div className="mt-5">
              <p className="text-sm font-bold">Evolução da pronúncia por semana</p>
              <div className="mt-2 flex h-24 items-end gap-2" role="img" aria-label={`Notas semanais: ${d.pronunciationWeeks.map((w) => w.avg).join(", ")}`}>
                {d.pronunciationWeeks.map((w) => (
                  <div key={w.week} className="flex flex-1 flex-col items-center gap-1">
                    <span className="text-xs text-muted">{w.avg}</span>
                    <div className="w-full rounded-md bg-atlantic" style={{ height: `${Math.max(6, w.avg * 0.7)}px` }} />
                  </div>
                ))}
              </div>
            </div>
          )}
          <Link href="/pronuncia" className="btn-ghost mt-4">
            Treinar pronúncia
          </Link>
        </section>

        <section className="panel p-6" aria-labelledby="lis-nivel">
          <h2 id="lis-nivel" className="font-display text-2xl font-bold">
            Listening por nível
          </h2>
          {d.listeningByLevel.length ? (
            <ul className="mt-4 space-y-3">
              {d.listeningByLevel.map((l) => (
                <li key={l.level} className="flex items-center gap-3">
                  <span className="w-8 font-bold">{l.level}</span>
                  <span className="h-3 flex-1 overflow-hidden rounded-full bg-surface-2">
                    <span className={`block h-full rounded-full ${l.pct < 60 ? "bg-wrong" : l.pct < 80 ? "bg-boarding" : "bg-correct"}`} style={{ width: `${l.pct}%` }} />
                  </span>
                  <span className="w-28 text-right text-sm text-muted">
                    {l.pct}% · {l.attempts} {l.attempts === 1 ? "áudio" : "áudios"}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-muted">Faça um exercício de listening para medir seu nível de compreensão.</p>
          )}
          <Link href="/listening" className="btn-ghost mt-4">
            Abrir listening
          </Link>
        </section>
      </div>
    </main>
  );
}
