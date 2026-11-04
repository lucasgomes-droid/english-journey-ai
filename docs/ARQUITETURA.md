# Arquitetura do English Journey AI

## Visão geral

```
 Navegador / PWA (celular e computador)
 ├─ Next.js (React 19, TypeScript, Tailwind 4)
 ├─ Web Speech API → voz do professor e áudios das aulas (TTS, grátis, no aparelho)
 └─ MediaRecorder → grava o microfone
        │  HTTPS (cookies de sessão; nenhuma chave secreta no navegador)
        ▼
 Servidor Next.js na Vercel (backend)
 ├─ Server Components  → leem dados do aluno com RLS
 ├─ Server Actions     → corrigem aulas/revisões, somam XP, sequência, conquistas
 ├─ /api/tutor         → professor de IA (chave AI_API_KEY só aqui)
 ├─ /api/transcribe    → fala → texto (Whisper)
 └─ proxy.ts           → renova sessão e protege rotas
        │                         │
        ▼                         ▼
 Supabase                     Provedor de IA compatível com OpenAI
 ├─ Auth (e-mail e senha)     ├─ Chat: Groq openai/gpt-oss-120b (padrão)
 └─ Postgres + RLS            └─ STT:  Groq whisper-large-v3-turbo
```

Frontend, backend e serviços externos estão separados: o navegador só conversa com o
nosso servidor e com o Supabase (usando a chave pública protegida por RLS). As chaves
de IA ficam em variáveis de ambiente do servidor, sem o prefixo `NEXT_PUBLIC_`.

## Decisões

| Tema | Escolha | Motivo |
| --- | --- | --- |
| Framework | Next.js 16 (App Router) | Frontend + backend no mesmo projeto, deploy gratuito na Vercel |
| Banco/Auth | Supabase | Postgres real, autenticação pronta, RLS, plano gratuito |
| Conteúdo das aulas | Arquivos TypeScript em `src/content` | Versionado no GitHub, tipado e testado; espelhado no banco por `npm run content:sql` |
| Correção | Mesma função no navegador (feedback imediato) e no servidor (nota oficial) | Rapidez sem confiar no cliente |
| Memorização | SM-2 (`src/lib/srs.ts`) | Algoritmo de repetição espaçada consagrado |
| IA | API compatível com OpenAI | Troca de provedor (Groq, OpenAI, Gemini, OpenRouter) só por variável de ambiente |
| Voz do professor | Web Speech API | Grátis e sem latência de rede; pode ser trocada por TTS neural depois |
| Fala do aluno | Whisper via API | Funciona em todos os navegadores, inclusive iPhone |
| Pronúncia (Etapa 4) | Azure Speech — Pronunciation Assessment | Análise fonética real (fonema, palavra, fluência, prosódia), com plano gratuito |
| PWA | `manifest.ts` + `public/sw.js` | Instalável no celular; páginas sempre da rede para não mostrar progresso velho |

## Estrutura de pastas

```
src/
  app/
    (auth)/login, (auth)/cadastro   telas de acesso
    (app)/                          área logada (layout com navegação)
      page.tsx                      dashboard
      trilha/                       mapa de níveis, módulos e aulas
      aula/[id]/                    player da aula (explicação → vocabulário → exemplos → exercícios → resultado)
      revisao/                      sessão de repetição espaçada
      professor/                    chat com IA (texto e voz)
      perfil/                       metas, rotina e conquistas
    boas-vindas/                    configuração inicial da rotina
    api/tutor, api/transcribe       backend de IA
    actions/                        server actions (aulas, revisão, conta)
  content/                          currículo (A1 completo; A2–C2 nas próximas etapas)
  lib/                              correção, SRS, sequência, conquistas, IA, Supabase
supabase/migrations/                SQL do banco (esquema + conteúdo gerado)
tests/                              testes unitários (vitest) e ponta a ponta (playwright)
```

## Banco de dados

Conteúdo: `levels`, `modules`, `lessons`, `vocabulary`, `exercises`.
Aluno: `profiles` (nível, metas, XP, sequência), `lesson_progress`, `exercise_answers`
(cada resposta, base para detectar dificuldades), `assessments` (testes de módulo/nível),
`review_items` (fila SM-2), `activity_log` (histórico, tempo e XP por dia), `achievements`,
`conversations` + `messages` (histórico do professor, com correções), `pronunciation_attempts`
(pronta para a Etapa 4).

Toda tabela tem RLS: cada aluno só lê e grava as próprias linhas. Um gatilho cria o perfil
automaticamente no cadastro.

## Telas

1. Login e cadastro
2. Boas-vindas: tempo diário e objetivo
3. Início (dashboard): próxima aula, rotina do dia, meta de XP, 7 dias, sequência, horas,
   palavras aprendidas, desempenho por habilidade, histórico e medalhas
4. Trilha: níveis A1–C2 como linha de metrô; aulas bloqueadas até concluir a anterior
5. Aula: objetivo, explicação em português, vocabulário com áudio e pronúncia aproximada,
   exemplos, exercícios corrigidos, revisão, convite para conversa e nota
6. Revisão: palavras e exercícios errados voltando no tempo certo
7. Professor IA: conversa livre ou ligada a uma aula, por texto ou voz, com correções
8. Perfil: metas, rotina, conquistas, sair

## Plano de execução

| Etapa | Escopo | Situação |
| --- | --- | --- |
| 1 | Arquitetura, identidade visual, cadastro, dashboard, banco | Feito |
| 2 | Trilha A1, aulas, exercícios e correção | Feito (3 módulos, 12 aulas, 3 avaliações de módulo, teste de nível) |
| 3 | Professor de IA por texto e voz | Feito (precisa de `AI_API_KEY`) |
| 4 | Pronúncia: gravação, análise fonética, notas por som | Próxima |
| 5 | English in Real Life: cenários com personagens A1–C2 | A fazer |
| 6 | Gamificação completa, metas semanais, estatísticas de pronúncia | Base feita (XP, sequência, medalhas, SRS); ampliar |
| 7 | Conteúdo A2 → C2 | A fazer |

### Etapa 4 (pronúncia) — desenho

Fluxo: frase → áudio modelo (TTS) → gravação → envio ao servidor → Azure Pronunciation
Assessment com o texto de referência → notas de precisão, fluência, completude e prosódia,
com detalhe por palavra e por fonema → destaque das palavras e sons fracos → repetir.
O áudio precisa ir como WAV PCM 16 kHz (conversão no navegador com Web Audio). Trilhas
especiais para brasileiros (TH, R, H, vogais, consoantes finais, contrações, ligação) usam
os fonemas retornados para dar dicas específicas. As notas serão exibidas como estimativas.
