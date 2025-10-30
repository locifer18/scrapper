import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export const generateMarkdownWithGemini = async (
  data: any
): Promise<string> => {
  const prompt = `
You are a technical writer.  
Generate a well-structured Markdown report from the following JSON data.

The JSON:
${JSON.stringify(data, null, 2)}

### Formatting Instructions:
- Start with a top-level title: **"Data Insights Report"**
- For each object in the JSON array:
  - Use the \`name\` as an **H2 heading** (\`##\`)
  - Add a short **summary paragraph**
  - Create a **"Highlights"** section as a bulleted list from the \`highlights\` array
  - Add a **Popularity** line in bold, e.g., \`**Popularity:** High\`
- Separate each item with a horizontal line (\`---\`)
- Use proper Markdown syntax (headings, lists, bold text)
- Output **only valid Markdown**, no explanations or extra text.

Example output format:

# Data Insights Report

## Example Name
**Popularity:** High

**Summary:**  
Short paragraph summarizing the content.

**Highlights:**
- Point 1
- Point 2
- Point 3

---

Return only the Markdown content.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  // Depending on SDK version, you may need: response.output_text or response.candidates[0].content.parts[0].text
  return response.text || "No content generated.";
};
