// Transição suave a cada troca de página (respeita "reduzir movimento").
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page">{children}</div>;
}
