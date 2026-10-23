import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(request: Request) {
try {
const body = await request.json();
const message = body.message;

console.log("Message received:", message);

const response = await ai.models.generateContent({
model: "gemini-3.5-flash-lite",
contents: message,
});

console.log("Gemini response:", response.text);

return NextResponse.json({
reply: response.text,
});
} catch (error) {
console.error("GEMINI ERROR:", error);

return NextResponse.json(
{
error: error instanceof Error ? error.message : "Unknown error",
},
{ status: 500 }
);
}
}