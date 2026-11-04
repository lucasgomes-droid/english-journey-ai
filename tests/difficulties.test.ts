import { describe, expect, it } from "vitest";
import { CATEGORIES_INFO, categoryForGrammar, classifyCorrection } from "@/content/error-patterns";
import { gradeExercise } from "@/lib/grading";
import { lessonCategory } from "@/lib/difficulty-rules";
import { ALL_LESSONS } from "@/content/curriculum";

describe("padrões de dificuldade", () => {
  it("classifica correções pelas palavras que mudaram", () => {
    expect(classifyCorrection("I have 30 years", "I'm 30 years old")).toBe("to-be");
    expect(classifyCorrection("I go to home", "I go home")).toBe("prepositions");
    expect(classifyCorrection("Where you live?", "Where do you live?")).toBe("questions");
    expect(classifyCorrection("What you do?", "What do you do?")).toBe("questions");
    expect(classifyCorrection("I no like tea", "I don't like tea")).toBe("negatives");
    expect(classifyCorrection("I didn't went", "I didn't go")).toBe("past");
    expect(classifyCorrection("Yesterday I go to the beach", "Yesterday I went to the beach")).toBe("past");
    expect(classifyCorrection("I live here for 5 years", "I've lived here for 5 years")).toBe("perfect");
    expect(classifyCorrection("I'm doctor", "I'm a doctor")).toBe("articles");
    expect(classifyCorrection("I can to swim", "I can swim")).toBe("modals");
    expect(classifyCorrection("He go to work", "He goes to work")).toBe("present");
  });
  it("mapeia temas do currículo", () => {
    expect(categoryForGrammar("do/does, respostas curtas")).toBe("questions");
    expect(categoryForGrammar("preposições in/on/under/next to/between")).toBe("prepositions");
    expect(categoryForGrammar("present perfect com for/since")).toBe("perfect");
    expect(categoryForGrammar("am / is / are, negativa e pergunta")).toBe("to-be");
    expect(categoryForGrammar("going to")).toBe("future");
  });
  it("toda aula tem categoria e os exercícios das categorias são corrigíveis", () => {
    for (const l of ALL_LESSONS) expect(lessonCategory(l.id, "grammar"), l.id).toBeTruthy();
    expect(lessonCategory("a1-m1-l1", "listening")).toBe("listening");
    for (const c of CATEGORIES_INFO) {
      expect(c.explanation_pt.length).toBeGreaterThan(40);
      expect(c.examples.length).toBeGreaterThanOrEqual(3);
      for (const d of c.drills) {
        const ans =
          d.type === "multiple_choice" || (d.type === "listening" && d.options)
            ? { kind: "choice" as const, choice: d.answer! }
            : { kind: "text" as const, text: (d as { accepted: string[] }).accepted[0] };
        expect(gradeExercise(d, ans).correct, d.id).toBe(true);
      }
    }
  });
});
