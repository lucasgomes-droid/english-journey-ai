import { Wordmark } from "@/components/brand";
import { isSupabaseConfigured } from "@/lib/env";

export const metadata = { title: "Configuração necessária" };

export default function SetupPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <Wordmark />
      <h1 className="mt-10 font-display text-3xl font-bold">
        {isSupabaseConfigured ? "Supabase configurado" : "Falta conectar o banco de dados"}
      </h1>
      {isSupabaseConfigured ? (
        <p className="mt-4 text-muted">As variáveis do Supabase foram encontradas. Volte para a página inicial.</p>
      ) : (
        <>
          <p className="mt-4 text-muted">
            O aplicativo precisa do Supabase para login e para salvar seu progresso. Defina estas variáveis de ambiente (no arquivo <code>.env.local</code> ou no painel da Vercel) e reinicie:
          </p>
          <pre className="panel mt-6 overflow-x-auto p-4 text-sm">{`NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-ou-publishable`}</pre>
          <p className="mt-6 text-muted">O passo a passo completo está no README do projeto, seção “Configurar o Supabase”.</p>
        </>
      )}
    </main>
  );
}
