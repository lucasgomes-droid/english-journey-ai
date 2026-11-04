# English Journey AI

Professor particular de inglês com inteligência artificial, do A1 ao C2, para falantes de português.
Aplicativo web responsivo e instalável no celular (PWA).

**O que já funciona (versão 0.1):**

- Cadastro e login (Supabase), com perfil criado automaticamente
- Boas-vindas com tempo diário e objetivo de estudo
- Dashboard: próxima aula, rotina do dia, meta de XP, gráfico de 7 dias, sequência, tempo de estudo,
  palavras aprendidas, desempenho por habilidade, histórico e medalhas
- Trilha A1 completa: 3 módulos, 12 aulas, 3 avaliações de módulo e o teste de nível A1 (142 exercícios, 116 palavras)
- Aulas com objetivo, explicação em português, vocabulário com áudio e pronúncia aproximada, exemplos,
  exercícios corrigidos (múltipla escolha, tradução, lacunas, montar frase, escuta, ditado e pares), revisão e nota
- Desbloqueio progressivo: uma aula só abre depois da anterior; passar no teste A1 muda o nível para A2
- Repetição espaçada (SM-2): vocabulário e exercícios errados voltam automaticamente
- Professor de IA “Alex”: conversa livre ou ligada à aula, por texto ou voz, mantém o contexto,
  corrige frases e explica os erros em português, adapta-se ao nível e às dificuldades recentes
- XP, sequência de dias, 10 conquistas, histórico — tudo salvo no banco
- PWA instalável

**Ainda não implementado** (próximas etapas, ver `docs/ARQUITETURA.md`): avaliação fonética de pronúncia
(Etapa 4), simulador de situações reais (Etapa 5) e conteúdo A2–C2 (Etapa 7). Essas áreas não aparecem no app
até estarem prontas.

---

## Rodar no seu computador

Pré-requisito: [Node.js 20 ou superior](https://nodejs.org).

```bash
git clone https://github.com/lucasgomes-droid/english-journey-ai.git
cd english-journey-ai
npm install
cp .env.example .env.local   # depois preencha as variáveis (veja abaixo)
npm run dev                  # abra http://localhost:3000
```

O app já se conecta ao Supabase do projeto; para o professor de IA, preencha `AI_API_KEY`.

## 1. Supabase (banco e login)

O projeto Supabase oficial (`english-journey-ai`, ref `qxgblksieynolyqsedxr`) já está criado, com as tabelas,
as regras de segurança (RLS) e todo o conteúdo das aulas. O app já aponta para ele por padrão (`src/lib/env.ts`).

Pendente no Supabase depois do primeiro deploy: em **Authentication → URL Configuration**, coloque o endereço
da Vercel como **Site URL** e adicione `https://SEU-APP.vercel.app/auth/callback` em **Redirect URLs**.

Para usar outro projeto Supabase: rode os dois arquivos de `supabase/migrations` no **SQL Editor** (nessa ordem) e
defina `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` (chave *publishable*).

> O plano gratuito do Supabase pausa projetos sem uso por 7 dias; basta reativar no painel.

## 2. Ativar o professor de IA — gratuito

1. Crie uma conta em <https://console.groq.com> e gere uma chave em **API Keys**.
2. Defina `AI_API_KEY` com essa chave. O modelo padrão é `openai/gpt-oss-120b` e a voz do aluno é
   transcrita com `whisper-large-v3-turbo`, ambos da Groq.
3. Para usar outro provedor compatível com a API da OpenAI, mude `AI_BASE_URL` e `AI_MODEL`
   (ex.: OpenAI `https://api.openai.com/v1`; Google Gemini `https://generativelanguage.googleapis.com/v1beta/openai`).
   Se o provedor de chat não tiver Whisper, defina `STT_API_KEY`/`STT_BASE_URL` apontando para um que tenha.

As chaves de IA ficam **somente no servidor**. Nunca coloque `NEXT_PUBLIC_` nelas.

### 2b. Voz natural e nota de pronúncia por som (opcional)

- **Voz natural:** com a chave da Groq, o app já tenta a voz `canopylabs/orpheus-v1-english`.
  Se o modelo exigir aceite de termos, abra <https://console.groq.com/playground?model=canopylabs%2Forpheus-v1-english>
  e aceite. Se falhar, o app usa a voz do navegador automaticamente.
- **Nota de pronúncia por som (fonética):** usa o Azure Speech, que tem plano gratuito (F0, 5 h/mês).
  1. Em <https://portal.azure.com> crie um recurso **Speech** (Serviços de Fala), tipo de preço **Free F0**,
     região por exemplo `eastus` ou `brazilsouth`.
  2. Em **Keys and Endpoint**, copie a **KEY 1** e a **Location/Region**.
  3. Cadastre `AZURE_SPEECH_KEY` e `AZURE_SPEECH_REGION` na Vercel e faça **Redeploy**.
  Com isso a voz passa a ser Azure Neural e cada palavra e som recebe nota de 0 a 100.
  Sem o Azure, o treino de pronúncia confere só quais palavras foram reconhecidas (e diz isso na tela).

## 3. Publicar na internet (Vercel) — gratuito

1. Entre em <https://vercel.com> com sua conta do GitHub.
2. **Add New → Project** → importe `english-journey-ai` → **Deploy** (o Next.js é detectado sozinho).
3. Em **Settings → Environment Variables**, cadastre `AI_API_KEY` (a chave da Groq).
   Opcionais: `AI_BASE_URL`, `AI_MODEL`, `STT_API_KEY`, `STT_BASE_URL`, `STT_MODEL`,
   `AZURE_SPEECH_KEY`, `AZURE_SPEECH_REGION`, `TTS_PROVIDER`, `TTS_MODEL`.
4. Em **Deployments**, clique nos três pontos do último deploy → **Redeploy** (para aplicar as variáveis).
5. Volte ao Supabase e confirme a **Site URL** e as **Redirect URLs** com o endereço final da Vercel.

A partir daí, todo `git push` na branch `main` publica uma nova versão automaticamente.

## 4. Instalar no celular (PWA)

- **Android (Chrome)**: abra o endereço do app → menu ⋮ → **Instalar app** / **Adicionar à tela inicial**.
- **iPhone (Safari)**: abra o endereço → botão Compartilhar → **Adicionar à Tela de Início**.

O microfone pede permissão na primeira vez. Em iPhone, a voz do professor depende das vozes em inglês
instaladas em Ajustes → Acessibilidade → Conteúdo Falado → Vozes.

---

## Comandos

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` / `npm start` | Build e servidor de produção |
| `npm test` | Testes unitários (correção, SRS, sequência, conquistas e integridade de todo o conteúdo) |
| `npm run typecheck` / `npm run lint` | Verificações de tipo e estilo |
| `npm run content:sql` | Regenera `20261104120100_seed_content.sql` depois de editar aulas em `src/content` |
| `npx tsx tests/e2e/flow.e2e.ts` | Teste ponta a ponta no navegador (app rodando + Supabase) |

## Adicionar ou editar aulas

O curso completo (A1 a C2: 6 níveis, 48 módulos, 246 aulas e avaliações, mais 11 mini-aulas) está em `src/content/<nível>/`.

1. Edite ou crie arquivos em `src/content/` (ex.: `src/content/a2/module1.ts`) e registre em `src/content/curriculum.ts`.
2. `npm test` — garante que toda resposta oficial é aceita pela correção e que os IDs são únicos.
3. `npm run content:sql` e execute o `20261104120100_seed_content.sql` gerado no SQL Editor do Supabase.
   O arquivo passa de 1 MB (limite do SQL Editor): execute em partes, por exemplo só as linhas do nível alterado
   (todas as linhas são `insert ... on conflict do update`, então a ordem e a repetição não causam problema),
   ou rode tudo de uma vez com `psql "$DATABASE_URL" -f supabase/migrations/20261104120100_seed_content.sql`.
4. `git commit` + `git push` — a Vercel publica.

## Segurança

- Chaves de IA só no servidor; a chave do Supabase no navegador é a pública, protegida por RLS.
- Aulas e revisões são corrigidas de novo no servidor antes de gravar nota e XP.
- Limite de 20 mensagens por minuto por aluno no professor de IA; áudio limitado a 60 s.

Arquitetura completa e roadmap: [`docs/ARQUITETURA.md`](docs/ARQUITETURA.md).
