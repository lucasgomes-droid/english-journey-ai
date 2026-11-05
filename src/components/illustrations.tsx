import { Avatar } from "@/components/avatar";
import type { AvatarLook } from "@/content/scenarios";

const A: AvatarLook = { skin: "#f1c27d", hair: "#3b2219", hairStyle: "ponytail", shirt: "#f3c24f", bg: "transparent" };
const B: AvatarLook = { skin: "#c68642", hair: "#1b1b1b", hairStyle: "short", shirt: "#2f62b5", bg: "transparent" };

/** Duas pessoas conversando, com balões — ilustração dos cartões de prática. */
export function TalkingPeople({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`} aria-hidden>
      <span className="absolute left-[8%] top-0 rounded-2xl rounded-bl-sm bg-boarding px-2.5 py-1 text-xs font-bold text-boarding-ink">Hi!</span>
      <span className="absolute right-[6%] top-[6%] rounded-2xl rounded-br-sm bg-atlantic px-2.5 py-1 text-xs font-bold text-surface">•••</span>
      <div className="absolute bottom-0 left-0 w-[52%] overflow-hidden rounded-full">
        <Avatar look={A} className="w-full" />
      </div>
      <div className="absolute bottom-0 right-0 w-[52%] overflow-hidden rounded-full">
        <Avatar look={B} className="w-full" />
      </div>
    </div>
  );
}
