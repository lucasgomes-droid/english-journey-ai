"use client";

import { useState } from "react";
import { BellRing, CalendarPlus, Download } from "lucide-react";

const TZ = "America/Sao_Paulo";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/** Próxima data (AAAAMMDD) a partir de amanhã, no fuso de São Paulo. */
function startDate() {
  const now = new Date(Date.now() + 86_400_000);
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
  return parts.replaceAll("-", "");
}

export function buildIcs(time: string, minutes: number, url: string) {
  const [h, m] = time.split(":").map(Number);
  const end = new Date(2000, 0, 1, h, m + minutes);
  const d = startDate();
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//English Journey AI//Lembrete//PT",
    "CALSCALE:GREGORIAN",
    "BEGIN:VTIMEZONE",
    `TZID:${TZ}`,
    "BEGIN:STANDARD",
    "DTSTART:19700101T000000",
    "TZOFFSETFROM:-0300",
    "TZOFFSETTO:-0300",
    "TZNAME:-03",
    "END:STANDARD",
    "END:VTIMEZONE",
    "BEGIN:VEVENT",
    `UID:english-journey-${d}-${pad(h)}${pad(m)}@english-journey-ai`,
    `DTSTAMP:${stamp}`,
    `DTSTART;TZID=${TZ}:${d}T${pad(h)}${pad(m)}00`,
    `DTEND;TZID=${TZ}:${d}T${pad(end.getHours())}${pad(end.getMinutes())}00`,
    "RRULE:FREQ=DAILY",
    "SUMMARY:Inglês: falar 15 minutos",
    `DESCRIPTION:Revisão + fala do dia + uma conversa curta. ${url}`,
    `URL:${url}`,
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "DESCRIPTION:Hora do inglês!",
    "TRIGGER:PT0M",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

/**
 * Lembrete diário pelo calendário do celular: funciona em qualquer aparelho,
 * sem conta extra nem serviço pago. O próprio calendário avisa no horário.
 */
export function ReminderCard({ minutes }: { minutes: number }) {
  const [time, setTime] = useState("19:00");
  // Calculado só no clique (no navegador), para não divergir da renderização do servidor.
  const appUrl = () => window.location.origin;

  function download() {
    const url = appUrl();
    const blob = new Blob([buildIcs(time, minutes, url)], { type: "text/calendar;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "lembrete-ingles.ics";
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }

  function openGoogle() {
    const url = appUrl();
    const [h, m] = time.split(":").map(Number);
    const end = new Date(2000, 0, 1, h, m + minutes);
    const d = startDate();
    const link = `https://calendar.google.com/calendar/render?${new URLSearchParams({
    action: "TEMPLATE",
    text: "Inglês: falar 15 minutos",
    dates: `${d}T${pad(h)}${pad(m)}00/${d}T${pad(end.getHours())}${pad(end.getMinutes())}00`,
    ctz: TZ,
    recur: "RRULE:FREQ=DAILY",
    details: `Revisão + fala do dia + uma conversa curta. ${url}`,
    })}`;
    window.open(link, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="panel p-6" aria-labelledby="lembrete">
      <h2 id="lembrete" className="flex items-center gap-2 font-display text-2xl font-bold">
        <BellRing size={22} className="text-atlantic" aria-hidden /> Lembrete diário
      </h2>
      <p className="mt-1 text-sm text-muted">
        Quem estuda no mesmo horário todo dia aprende mais rápido. O lembrete fica no calendário do seu celular e avisa na hora, todos os dias.
      </p>
      <div className="mt-4 flex flex-wrap items-end gap-3">
        <label className="block">
          <span className="text-sm font-bold">Horário</span>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value || "19:00")} className="field mt-1 w-32" />
        </label>
        <button type="button" onClick={openGoogle} className="btn bg-boarding text-boarding-ink">
          <CalendarPlus size={18} aria-hidden /> Google Agenda
        </button>
        <button type="button" onClick={download} className="btn-ghost">
          <Download size={18} aria-hidden /> iPhone / Outlook (.ics)
        </button>
      </div>
      <p className="mt-3 text-xs text-muted">No iPhone, abra o arquivo baixado e toque em “Adicionar todos”.</p>
    </section>
  );
}
