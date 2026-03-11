import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_URL =
  process.env.BACKEND_API_URL ||
  "https://ai-therapist-agent-backend.onrender.com";

// Optional auth to avoid blocking unauthenticated chat during testing/demo.
const buildHeaders = (authHeader: string | null) => {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (authHeader) headers.Authorization = authHeader;
  return headers;
};

export async function GET(req: NextRequest) {
  try {
    console.log("Fetching all chat sessions...");
    const authHeader = req.headers.get("Authorization");

    const response = await fetch(`${BACKEND_API_URL}/chat/sessions`, {
      method: "GET",
      headers: buildHeaders(authHeader),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Failed to fetch chat sessions:", error);
      // Return empty list instead of failing the UI
      return NextResponse.json([]);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching chat sessions:", error);
    // Keep UI usable even if backend is down
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log("Creating new chat session...");
    const authHeader = req.headers.get("Authorization");

    const response = await fetch(`${BACKEND_API_URL}/chat/sessions`, {
      method: "POST",
      headers: buildHeaders(authHeader),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Failed to create chat session:", error);
      return NextResponse.json(
        { error: error.error || "Failed to create chat session" },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Chat session created:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating chat session:", error);
    return NextResponse.json(
      { error: "Failed to create chat session" },
      { status: 500 }
    );
  }
}
