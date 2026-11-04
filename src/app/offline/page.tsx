export const metadata = { title: "Sem conexão" };

export default function OfflinePage() {
  return (
    <main className="mx-auto grid min-h-dvh max-w-md place-items-center px-4 text-center">
      <div>
        <h1 className="font-display text-3xl font-bold">Você está sem internet</h1>
        <p className="mt-3 text-muted">Seu progresso é salvo na nuvem, então as aulas precisam de conexão. Reconecte e toque em tentar de novo.</p>
        {/* Recarregamento completo de propósito (testa a conexão). */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/" className="btn-primary mt-6">
          Tentar de novo
        </a>
      </div>
    </main>
  );
}
