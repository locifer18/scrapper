import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { markdown } = await req.json();

    const output = `# Gemini AI Response\n\n Here's the analyzed version:\n\n${markdown}\n\n---\n✨ AI-generated summary here.`;

    return NextResponse.json({ output, status: "success" });
  } catch (error) {
    return NextResponse.json(
      { output: "", status: "error", message: "Invalid markdown input" },
      { status: 400 }
    );
  }
}
