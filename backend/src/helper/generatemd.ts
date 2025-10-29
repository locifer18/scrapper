import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const generateMarkdownWithGemini = async (data: any): Promise<string> => {
  const prompt = `
  Generate a clean, structured Markdown report based on this data:

  ${JSON.stringify(data, null, 2)}

  The Markdown should include:
  - A title with the company name
  - A short description or summary
  - Key sections like Industry, Founded, Headquarters, Website
  - Use **bold**, bullet points, and headings appropriately
  - Keep it readable and formatted properly for GitHub markdown
  `;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);

  return result.response.text();
};
