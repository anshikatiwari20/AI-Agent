import { ChatOpenAI } from "@langchain/openai";
import { getMockTherapistResponse } from "./mock-therapist";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const USE_MOCK_AI = process.env.USE_MOCK_AI === "true" || false;

export async function getFallbackTherapistResponse(
  message: string
): Promise<string> {
  // If mock AI is enabled or no OpenAI key, use mock
  if (USE_MOCK_AI || !OPENAI_API_KEY) {
    console.log("Using mock AI therapist...");
    const mockResponse = getMockTherapistResponse(message);
    return mockResponse.response;
  }

  try {
    const model = new ChatOpenAI({
      modelName: "gpt-3.5-turbo",
      temperature: 0.7,
      openAIApiKey: OPENAI_API_KEY,
    });

    const systemPrompt = `You are SamatvaSetu, a compassionate and professional AI therapist. Your role is to:
- Listen actively and empathetically to the user's concerns
- Provide supportive, evidence-based therapeutic guidance
- Use techniques from CBT, mindfulness, and positive psychology
- Never diagnose medical conditions
- Encourage professional help when appropriate
- Maintain a warm, non-judgmental tone
- Keep responses concise but meaningful (2-4 sentences)

Remember: You're here to support, not replace professional therapy.`;

    const response = await model.invoke([
      { role: "system", content: systemPrompt },
      { role: "user", content: message },
    ]);

    return response.content as string;
  } catch (error) {
    console.error("OpenAI fallback failed, using mock AI:", error);
    // If OpenAI fails, fall back to mock
    const mockResponse = getMockTherapistResponse(message);
    return mockResponse.response;
  }
}
