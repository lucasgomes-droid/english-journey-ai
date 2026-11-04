import { redirect } from "next/navigation";
import Link from "next/link";
import { Flame, Zap } from "lucide-react";
import { AppNav } from "@/components/app-nav";
import { Wordmark } from "@/components/brand";
import { getSession } from "@/lib/data";
import { displayStreak, localDate } from "@/lib/streak";
import { VoiceCapsProvider } from "@/lib/voice";
import { isSttConfigured } from "@/lib/ai";
import { isAzureConfigured, ttsProvider } from "@/lib/speech-server";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { supabase, user, profile } = await getSession();
  if (!profile) redirect("/configuracao");
  if (!profile.onboarded) redirect("/boas-vindas");

  const { count } = await supabase
    .from("review_items")
    .select("item_id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .lte("due_at", new Date().toISOString());
  const streak = displayStreak(profile.last_study_date, profile.streak_current, localDate(new Date(), profile.timezone));

  const caps = { neural: ttsProvider() !== "none", phonetic: isAzureConfigured(), stt: isSttConfigured() };

  return (
    <VoiceCapsProvider caps={caps}>
    <div className="mx-auto flex min-h-dvh max-w-6xl gap-8 px-4 lg:px-6">
      <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col gap-8 py-6 lg:flex">
        <Link href="/">
          <Wordmark />
        </Link>
        <AppNav variant="sidebar" dueReviews={count ?? 0} />
      </aside>
      <div className="min-w-0 flex-1 pb-28 lg:pb-12">
        <header className="flex items-center justify-between py-4 lg:justify-end lg:py-6">
          <Link href="/" className="lg:hidden" aria-label="English Journey AI — início">
            <Wordmark compact />
          </Link>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="chip" title="Sequência de dias estudando">
              <Flame size={16} className={streak > 0 ? "text-[#e8590c]" : "text-muted"} aria-hidden />
              {streak}
              <span className="sr-only">dias seguidos</span>
            </span>
            <span className="chip" title="XP total">
              <Zap size={16} className="text-[#d49b00]" aria-hidden />
              {profile.xp_total} XP
            </span>
            <span className="chip bg-atlantic text-surface" title="Nível atual">
              {profile.current_level}
            </span>
          </div>
        </header>
        {children}
      </div>
      <AppNav variant="bottom" dueReviews={count ?? 0} />
    </div>
    </VoiceCapsProvider>
  );
}
