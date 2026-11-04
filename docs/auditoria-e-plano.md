# English Journey AI — Auditoria e plano de evolução

_4 de novembro de 2026 · base: commit b5c3e32 (produção em english-journey-ai.vercel.app)_

## 1. Diagnóstico da arquitetura

| Camada | Como está | Avaliação |
|---|---|---|
| Front-end | Next.js 16 (App Router, server components + server actions), React 19, Tailwind v4, PWA | Sólido. Páginas são renderizadas no servidor com dados reais; pouca lógica duplicada. |
| Dados | Supabase Postgres com RLS em todas as tabelas do aluno; 17 tabelas (progresso, respostas, avaliações, revisão SM-2, conversas, pronúncia, fala, listening) | Sólido. Toda tela lê dados reais; não há números inventados. |
| Conteúdo | Curso escrito em código (`src/content/<nível>/`) e espelhado no banco pelo seed | Bom para versionar e testar. O seed passou de 1 MB e precisa ser rodado em partes no editor do Supabase. |
| IA | Groq: chat (gpt-oss-120b), reconhecimento de fala (Whisper), voz (Orpheus); voz do aparelho como reserva | Funciona e é gratuito, mas sujeito a limite de uso do plano grátis. Chaves só no servidor. |
| Testes | 38 testes de unidade (Vitest) + testes ponta a ponta (Playwright) com banco local e IA simulada, inclusive microfone falso | Bom. Cada fase nova ganha testes. |
| Deploy | GitHub → Vercel automático a cada push | Ok. |

## 2. O que já existe

- **Trilha A1–C2 completa**: 6 níveis × 8 módulos, 246 itens (aulas, testes de módulo e teste final por nível), 2.161 exercícios, 1.716 palavras. Aulas liberadas em sequência; teste de nivelamento define o nível inicial.
- **Exercícios**: múltipla escolha, lacuna, ordenar palavras, traduzir, ligar pares, ditado/listening, fala.
- **Conversação**: professor IA por texto e por ligação de voz; 18 cenários com personagens e cena livre; correções viram itens de revisão.
- **Pronúncia**: palavras e frases com checagem de palavras pelo Whisper (sem nota fonética inventada), 8 conjuntos de pares mínimos, shadowing, "ouvir minha voz × modelo".
- **Fala livre**: desafio de 1 minuto (ritmo, pausas, hesitações + retorno da IA), gravação semanal com histórico de áudio, "fale sobre sua vida" (frases pessoais).
- **Listening**: 36 áudios A1–C2.
- **Revisão espaçada (SM-2)** de vocabulário, exercícios errados e frases.
- **Diagnóstico** por habilidade, painel com rotina diária, XP, ofensiva, conquistas, lembrete na agenda.

## 3. O que precisa melhorar

1. **Progressão**: hoje o teste final escrito (75%) já sobe o aluno de nível. Falta exigir **fala e conversa** para avançar, e falta plano de recuperação antes de refazer.
2. **Aprovação nas aulas**: nota mínima de 60% é baixa para "domínio" — subir para 70%.
3. **Ordem das aulas**: começam pela teoria. A especificação pede situação → palavras → exemplos → prática → correção → explicação → nova situação, com ~70% de prática.
4. **Fim de conversa**: as correções aparecem, mas não há o relatório completo (o que disse, versão melhor, erros, expressões novas, nota, sugestão).
5. **Menu**: 5 abas; a especificação pede 10 áreas.
6. **Painel**: falta "continuar de onde parei", tempo de estudo e evolução semanal por habilidade em um só lugar.

## 4. O que é novo

- Critérios claros por nível ("ao final do A2 você consegue…") e **prova de nível em 5 partes** (Reading, Writing, Listening, Speaking, Conversation).
- **Plano de recuperação** gerado a partir dos erros reais; nova tentativa só depois de cumprir o plano.
- **Tradução pt-BR liga/desliga** e botão **"Não entendi"** (explicação mais simples, em português).
- **Meu Professor IA** (resumo do aluno, recomendações) e **Minhas Dificuldades** (padrões de erro por categoria: tempos verbais, preposições, artigos, vocabulário, pronúncia, compreensão…).
- **Novos cenários** obrigatórios (café, rua, mercado, aeroporto, trabalho, dia a dia) com ambiente visual, missão e dificuldade por nível.
- Pronúncia: entonação, ritmo e áudio em velocidades diferentes.
- **Aprendizado adaptativo**: mais exercícios do tipo em que o aluno erra; relatórios semanais.

## 5. Limitações técnicas (honestas)

- **Nota fonética real** (por som) exige um serviço pago (Azure Speech pede cartão). Sem ele, a pronúncia é avaliada por palavras reconhecidas, pares mínimos e comparação com a própria voz — sem notas inventadas.
- **Plano grátis da Groq** tem limite de pedidos por minuto/dia; em uso intenso a IA pode pedir para aguardar. A voz Orpheus é um modelo "preview".
- **Voz do aparelho** (reserva) varia por celular; no Android precisa da voz em inglês instalada.
- **Avaliação de fala e conversa por IA** é útil, mas não equivale a uma banca humana; ela é calibrada para ser conservadora e mostra a transcrição para o aluno conferir.
- **Conteúdo** foi escrito em grande volume e rapidamente; precisa de revisão pedagógica humana com o uso.
- Ambientes visuais por cenário: ilustrações próprias em SVG/CSS (sem imagens de terceiros).

## 6. Plano por fases (cada uma implementada, testada e validada antes da próxima)

| Fase | Entrega | Como validar |
|---|---|---|
| **1. Progressão A1–C2** | Critérios por nível; aulas exigem 70%; prova de nível com parte escrita + Speaking + Conversation; subir de nível só com as 3 partes aprovadas; plano de recuperação com tarefas medidas por atividade real; refazer liberado só após o plano | Testes de unidade das regras; e2e: reprovar → plano → cumprir → refazer → subir |
| **2. Método prático + cenários** | Aulas reordenadas (situação primeiro, ~70% prática); novos cenários obrigatórios; relatório completo no fim de cada conversa | e2e da aula e do relatório; conferência da proporção por aula |
| **3. Traduções** | Interruptor pt-BR em aulas, conversas e listening; botão "Não entendi" | e2e liga/desliga; preferência salva no perfil |
| **4. Professor IA + Dificuldades** | Classificação dos erros por categoria; telas "Meu Professor IA" e "Minhas Dificuldades"; plano inteligente de recuperação | Testes da classificação; dados reais da conta de teste |
| **5. Visual e responsividade** | Menu com as 10 áreas; painel novo; ambientes visuais por cenário; ajuste celular/desktop | Capturas em 360 px, 768 px e 1280 px; checagem de acessibilidade |
| **6. Avaliações, revisões e relatórios** | Testes de módulo com fala; relatório semanal; frequência adaptativa de exercícios | e2e + conferência dos relatórios |
| **7. Testes e correções** | Rodada completa em celular e computador, áudio, microfone, permissões, desempenho | Lista de verificação final |
