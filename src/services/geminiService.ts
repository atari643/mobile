import { GoogleGenAI, Type } from "@google/genai";
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey });

export interface NoteItem {
  id: string;
  text: string;
  context: string;
  tags?: string[];
}

export async function defineTerm(term: string, context: string = "") {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Explique brièvement le terme technique suivant dans le contexte des réseaux mobiles (GPRS/UMTS/LTE/5G) : "${term}". ${context ? `Contexte supplémentaire : ${context}` : ""}. Réponds en français de manière concise et pédagogique.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Désolé, je n'ai pas pu obtenir de définition pour ce terme.";
  }
}

export async function summarizeNotes(notes: NoteItem[]) {
  try {
    const notesText = notes.map(n => `[Contexte: ${n.context}] ${n.text}`).join("\n");
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Voici une liste de notes prises par un étudiant sur les réseaux mobiles :
      ${notesText}
      
      Organise ces notes sous forme d'une fiche de révision structurée, claire et professionnelle pour une évaluation. Regroupe les idées par thématiques (Concepts de base, Protocoles, Sécurité, etc.). Utilise du Markdown pour la mise en forme. Réponds en français.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Désolé, je n'ai pas pu générer la fiche de révision.";
  }
}

export async function generateFlashcards(notes: NoteItem[]) {
  try {
    const notesText = notes.map(n => `[Contexte: ${n.context}] ${n.text}`).join("\n");
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Crée des flashcards (cartes mémoire) à partir de ces notes sur les réseaux mobiles.
      Notes:
      ${notesText}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              front: { type: Type.STRING, description: "La question ou le concept à deviner" },
              back: { type: Type.STRING, description: "La réponse ou la définition détaillée" }
            },
            required: ["front", "back"]
          }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Gemini API Error:", error);
    return [];
  }
}

export async function generateTags(note: NoteItem) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Génère 2 à 4 tags (mots-clés courts) pertinents pour cette note sur les réseaux mobiles.
      Contexte: ${note.context}
      Note: ${note.text}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Tableau de tags (ex: ['LTE', 'QoS', 'Radio'])"
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Gemini API Error:", error);
    return [];
  }
}

export async function generateQuiz(notes: NoteItem[]) {
  try {
    const notesText = notes.map(n => `[Contexte: ${n.context}] ${n.text}`).join("\n");
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Crée un QCM (Quiz) difficile et pertinent à partir de ces notes sur les réseaux mobiles.
      Notes:
      ${notesText}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING, description: "La question du QCM" },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "4 choix de réponses possibles"
              },
              answer: { type: Type.INTEGER, description: "L'index (0 à 3) de la bonne réponse dans le tableau options" },
              explanation: { type: Type.STRING, description: "Une explication courte de la bonne réponse" }
            },
            required: ["question", "options", "answer", "explanation"]
          }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Gemini API Error:", error);
    return [];
  }
}
