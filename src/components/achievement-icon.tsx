import { Award, Brain, CalendarCheck, Flag, Flame, Footprints, MessageCircle, Rocket, Sparkles, Trophy, type LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = { Award, Brain, CalendarCheck, Flag, Flame, Footprints, MessageCircle, Rocket, Sparkles, Trophy };

export function AchievementIcon({ name, size = 16 }: { name: string; size?: number }) {
  const Icon = ICONS[name] ?? Award;
  return <Icon size={size} aria-hidden />;
}
