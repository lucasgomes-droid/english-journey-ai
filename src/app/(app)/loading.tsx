// Mostrado instantaneamente ao trocar de aba, enquanto o servidor prepara a página.
export default function Loading() {
  return (
    <div className="animate-pulse space-y-5" aria-busy="true" aria-label="Carregando">
      <div className="h-40 rounded-3xl bg-surface-2" />
      <div className="grid gap-5 md:grid-cols-2">
        <div className="h-48 rounded-2xl bg-surface-2" />
        <div className="h-48 rounded-2xl bg-surface-2" />
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-28 rounded-2xl bg-surface-2" />
        ))}
      </div>
    </div>
  );
}
