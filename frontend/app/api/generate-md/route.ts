import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { data } = await req.json();

    const markdown = `# Markdown Generated\n\n**Input:** ${data}\n\n Backend processed successfully!`;

    return NextResponse.json({ markdown, status: "success" });
  } catch (error) {
    return NextResponse.json(
      { markdown: "", status: "error", message: "Invalid request format" },
      { status: 400 }
    );
  }
}
