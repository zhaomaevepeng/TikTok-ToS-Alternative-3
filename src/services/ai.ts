import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function askTosQuestion(question: string, tosText: string) {
  const prompt = `
You are a legal assistant helping a user understand a Terms of Service document.
The user asked: "${question}"

Here is the text of the Terms of Service:
---
${tosText}
---

Provide a one-sentence answer to the user's question based on the ToS.
Also, identify the section ID (e.g., "1", "3.2", "3.5", "3.8", "5.1") that is most relevant to the answer.
If the answer is not in the text, say "I couldn't find the answer to that in the provided Terms of Service." and return null for the sectionId.

Return the result as a JSON object with the following schema:
{
  "answer": "The one sentence answer.",
  "sectionId": "The section ID, or null"
}
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return { answer: "Sorry, I encountered an error while searching the ToS.", sectionId: null };
  }
}
