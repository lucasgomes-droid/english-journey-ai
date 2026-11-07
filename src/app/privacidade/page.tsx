import Link from "next/link";

export const metadata = { title: "Privacidade" };

/** Política de privacidade (LGPD), em linguagem simples. Página pública. */
export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl space-y-6 px-4 py-10">
      <header>
        <h1 className="font-display text-3xl font-bold">Privacidade e seus dados</h1>
        <p className="mt-2 text-muted">Como o English Journey AI usa seus dados, em linguagem simples (Lei Geral de Proteção de Dados — LGPD).</p>
      </header>

      <section className="space-y-2">
        <h2 className="font-display text-xl font-bold">O que guardamos</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Conta: e-mail e nome.</li>
          <li>Estudo: aulas feitas, respostas dos exercícios, revisões, provas, tempo de estudo e XP.</li>
          <li>Conversas com o professor: o texto do que você diz e escreve (a fala é transformada em texto), as correções e os relatórios.</li>
          <li>O que o professor lembra de você: fatos que você mesmo contou (trabalho, interesses, metas). Você vê e apaga cada um no Perfil.</li>
          <li>Gravação semanal de fala (opcional), guardada numa pasta privada só sua.</li>
          <li>Contagem de uso da IA por dia, para não esgotar o limite gratuito de todos.</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-xl font-bold">Para que usamos</h2>
        <p>Só para ensinar: montar seu plano de estudo, corrigir seus erros, medir sua evolução e personalizar as conversas. Não vendemos dados e não mostramos anúncios.</p>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-xl font-bold">Com quem compartilhamos</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Supabase: banco de dados e login.</li>
          <li>Vercel: hospedagem do app.</li>
          <li>Groq: processa o texto das conversas, transcreve a fala e gera a voz do professor. Ele recebe o necessário para responder, não o seu e-mail.</li>
        </ul>
        <p className="text-sm text-muted">O áudio da conversa vai para transcrição e não fica guardado, exceto a gravação semanal que você mesmo faz.</p>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-xl font-bold">Seus direitos</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Acessar e levar seus dados:</strong> Perfil → Meus dados → Baixar meus dados (arquivo JSON).
          </li>
          <li>
            <strong>Corrigir:</strong> nome e preferências no Perfil; o que o professor lembra, apagando item por item.
          </li>
          <li>
            <strong>Apagar:</strong> Perfil → Recomeçar do zero (só o progresso) ou Excluir minha conta (tudo, sem volta).
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-xl font-bold">Cuidados</h2>
        <p>Não conte ao professor senhas, números de documentos, cartões ou dados de saúde. Ele é instruído a não guardar esse tipo de informação.</p>
      </section>

      <p className="text-sm text-muted">Este texto descreve o funcionamento do app e não substitui orientação jurídica.</p>
      <Link href="/" className="btn-ghost inline-flex">
        Voltar ao app
      </Link>
    </main>
  );
}
