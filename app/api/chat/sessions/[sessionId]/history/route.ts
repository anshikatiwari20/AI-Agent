import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_URL =
  process.env.BACKEND_API_URL ||
  "https://ai-therapist-agent-backend.onrender.com";

const buildHeaders = (authHeader: string | null) => {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (authHeader) headers.Authorization = authHeader;
  return headers;
};

export async function GET(
  req: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const { sessionId } = params;
    const authHeader = req.headers.get("Authorization");
    console.log(`Getting chat history for session ${sessionId}`);

    const response = await fetch(
      `${BACKEND_API_URL}/chat/sessions/${sessionId}/history`,
      {
        method: "GET",
        headers: buildHeaders(authHeader),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("Failed to get chat history:", error);
      return NextResponse.json(
        { error: error.error || "Failed to get chat history" },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Chat history retrieved successfully:", data);

    // Format the response to match the frontend's expected format
    const formattedMessages = data.map((msg: any) => ({
      role: msg.role,
      content: msg.content,
      timestamp: msg.timestamp,
    }));

    return NextResponse.json(formattedMessages);
  } catch (error) {
    console.error("Error getting chat history:", error);
    return NextResponse.json(
      { error: "Failed to get chat history" },
      { status: 500 }
    );
  }
}
