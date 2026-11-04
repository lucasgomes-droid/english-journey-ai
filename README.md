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

Sem as variáveis do Supabase o app abre uma tela explicando o que falta.

## 1. Configurar o Supabase (banco e login) — gratuito

1. Crie uma conta em <https://supabase.com> e clique em **New project** (região: São Paulo).
2. No projeto, abra **SQL Editor → New query**, cole todo o conteúdo de
   `supabase/migrations/20261104120000_schema.sql` e clique em **Run**.
3. Faça o mesmo com `supabase/migrations/20261104120100_seed_content.sql` (conteúdo das aulas).
4. Em **Project Settings → API** (ou botão **Connect**), copie:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** ou **publishable key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Em **Authentication → URL Configuration**:
   - **Site URL**: o endereço do app na Vercel (ex.: `https://english-journey-ai.vercel.app`)
   - **Redirect URLs**: adicione `https://SEU-APP.vercel.app/auth/callback` e `http://localhost:3000/auth/callback`
6. A confirmação de e-mail vem ligada: o aluno recebe um link e entra ao clicar. Para testar sem e-mail,
   desligue em **Authentication → Sign In / Providers → Email → Confirm email**.

> O plano gratuito do Supabase pausa projetos sem uso por 7 dias; basta reativar no painel.

## 2. Ativar o professor de IA — gratuito

1. Crie uma conta em <https://console.groq.com> e gere uma chave em **API Keys**.
2. Defina `AI_API_KEY` com essa chave. O modelo padrão é `openai/gpt-oss-120b` e a voz do aluno é
   transcrita com `whisper-large-v3-turbo`, ambos da Groq.
3. Para usar outro provedor compatível com a API da OpenAI, mude `AI_BASE_URL` e `AI_MODEL`
   (ex.: OpenAI `https://api.openai.com/v1`; Google Gemini `https://generativelanguage.googleapis.com/v1beta/openai`).
   Se o provedor de chat não tiver Whisper, defina `STT_API_KEY`/`STT_BASE_URL` apontando para um que tenha.

As chaves de IA ficam **somente no servidor**. Nunca coloque `NEXT_PUBLIC_` nelas.

## 3. Publicar na internet (Vercel) — gratuito

1. Entre em <https://vercel.com> com sua conta do GitHub.
2. **Add New → Project** → importe `english-journey-ai` → **Deploy** (o Next.js é detectado sozinho).
3. Em **Settings → Environment Variables**, cadastre:
   `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `AI_API_KEY`
   (opcionais: `AI_BASE_URL`, `AI_MODEL`, `STT_API_KEY`, `STT_BASE_URL`, `STT_MODEL`).
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

1. Edite ou crie arquivos em `src/content/` (ex.: `src/content/a2/module1.ts`) e registre em `src/content/curriculum.ts`.
2. `npm test` — garante que toda resposta oficial é aceita pela correção e que os IDs são únicos.
3. `npm run content:sql` e execute o `20261104120100_seed_content.sql` gerado no SQL Editor do Supabase.
4. `git commit` + `git push` — a Vercel publica.

## Segurança

- Chaves de IA só no servidor; a chave do Supabase no navegador é a pública, protegida por RLS.
- Aulas e revisões são corrigidas de novo no servidor antes de gravar nota e XP.
- Limite de 20 mensagens por minuto por aluno no professor de IA; áudio limitado a 60 s.

Arquitetura completa e roadmap: [`docs/ARQUITETURA.md`](docs/ARQUITETURA.md).
