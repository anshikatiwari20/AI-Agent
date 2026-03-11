import { NextRequest, NextResponse } from "next/server";
import { getFallbackTherapistResponse } from "@/lib/ai/fallback-therapist";

const BACKEND_API_URL =
  process.env.BACKEND_API_URL ||
  "https://ai-therapist-agent-backend.onrender.com";
const USE_FALLBACK_AI = process.env.USE_FALLBACK_AI === "true";

const buildHeaders = (authHeader: string | null) => {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (authHeader) headers.Authorization = authHeader;
  return headers;
};

export async function POST(
  req: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const { sessionId } = params;
    const body = await req.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const authHeader = req.headers.get("Authorization");
    console.log(`Sending message to session ${sessionId}:`, message);
    // Try backend first
    try {
      const response = await fetch(
        `${BACKEND_API_URL}/chat/sessions/${sessionId}/messages`,
        {
          method: "POST",
          headers: buildHeaders(authHeader),
          body: JSON.stringify({ message }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Message sent successfully:", data);
        return NextResponse.json(data);
      }

      const errorText = await response.text();
      console.error("Backend message send failed", response.status, errorText);
    } catch (backendError) {
      console.error("Backend unreachable for chat message:", backendError);
    }

    // Fallback path (mock/OpenAI) when backend fails or is unavailable
    if (USE_FALLBACK_AI) {
      console.log("Using fallback therapist response...");
      const fallbackResponse = await getFallbackTherapistResponse(message);
      return NextResponse.json({
        response: fallbackResponse,
        message: fallbackResponse,
        analysis: {
          emotionalState: "neutral",
          themes: [],
          riskLevel: 0,
          recommendedApproach: "supportive",
          progressIndicators: [],
        },
        metadata: {
          technique: "supportive",
          currentGoal: "Provide support",
          progress: {
            emotionalState: "neutral",
            riskLevel: 0,
          },
        },
        _fallback: true,
      });
    }

    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
