import Link from "next/link";
import { getSession } from "@/lib/data";
import { ProfileForm } from "@/components/profile-form";
import { signOut } from "@/app/actions/account";
import { ACHIEVEMENTS } from "@/lib/achievements";
import { AchievementIcon } from "@/components/achievement-icon";

export const metadata = { title: "Perfil" };

export default async function ProfilePage() {
  const { supabase, user, profile } = await getSession();
  const { data } = await supabase.from("achievements").select("code, earned_at").eq("user_id", user.id);
  const earned = new Map((data ?? []).map((a) => [a.code as string, a.earned_at as string]));

  return (
    <main className="space-y-8">
      <header>
        <h1 className="font-display text-4xl font-bold">Perfil</h1>
        <p className="mt-1 text-muted">{user.email}</p>
      </header>

      <section className="panel flex flex-wrap items-center justify-between gap-4 p-6" aria-labelledby="nivel">
        <div>
          <h2 id="nivel" className="font-display text-2xl font-bold">
            Seu nível: {profile?.current_level}
          </h2>
          <p className="text-sm text-muted">Acha que está no nível errado? O teste de nivelamento ajusta o ponto de partida da trilha.</p>
        </div>
        <Link href="/nivelamento" className="btn bg-boarding text-boarding-ink">
          Fazer nivelamento
        </Link>
      </section>

      <section className="panel p-6" aria-labelledby="conquistas">
        <h2 id="conquistas" className="font-display text-2xl font-bold">
          Conquistas
        </h2>
        <p className="text-sm text-muted">
          {earned.size} de {ACHIEVEMENTS.length} desbloqueadas
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {ACHIEVEMENTS.map((a) => {
            const got = earned.get(a.code);
            return (
              <li key={a.code} className={`flex items-center gap-3 rounded-2xl border p-3 ${got ? "border-boarding bg-boarding/15" : "border-line opacity-60"}`}>
                <span className={`grid size-11 shrink-0 place-items-center rounded-full ${got ? "bg-boarding text-boarding-ink" : "bg-surface-2 text-muted"}`}>
                  <AchievementIcon name={a.icon} size={20} />
                </span>
                <span>
                  <span className="block font-bold">{a.title}</span>
                  <span className="block text-sm text-muted">
                    {a.description}
                    {got && ` · ${new Date(got).toLocaleDateString("pt-BR")}`}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      {profile && (
        <section className="panel p-6" aria-labelledby="prefs">
          <h2 id="prefs" className="mb-6 font-display text-2xl font-bold">
            Rotina e metas
          </h2>
          <ProfileForm profile={profile} />
        </section>
      )}

      <form action={signOut}>
        <button type="submit" className="btn-ghost">
          Sair da conta
        </button>
      </form>
    </main>
  );
}
