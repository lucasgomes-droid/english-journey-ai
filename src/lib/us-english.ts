/** O aluno aprende só inglês americano: vale para todas as chamadas de texto da IA. */
export const US_ENGLISH_RULE =
  "LANGUAGE VARIETY: use ONLY American English in everything you write in English — US spelling (color, favorite, center, organize, traveled, canceled, neighbor) and US vocabulary (last name not surname, apartment not flat, vacation not holiday, movie not film, cell phone not mobile, elevator not lift, line not queue, check not bill at a restaurant, fall not autumn, pants not trousers, sneakers not trainers, trash not rubbish, gas not petrol, subway not underground, first floor not ground floor, on the weekend not at the weekend, Mr. with a period). If the student uses a British form, understand it, do not count it as an error, but model the American form.";

export function withUsEnglish<M extends { role: string; content: string }>(messages: M[]): M[] {
  const i = messages.findIndex((m) => m.role === "system");
  if (i < 0) return [{ role: "system", content: US_ENGLISH_RULE } as M, ...messages];
  return messages.map((m, k) => (k === i ? { ...m, content: `${m.content}\n\n${US_ENGLISH_RULE}` } : m));
}

