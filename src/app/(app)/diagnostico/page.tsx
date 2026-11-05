import { redirect } from "next/navigation";

/** O diagnóstico agora faz parte de "Meu progresso". */
export default function DiagnosticoPage() {
  redirect("/meu-professor");
}
