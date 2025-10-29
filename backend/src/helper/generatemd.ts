import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export const generateMarkdownWithGemini = async (
  company: any
): Promise<any> => {
  const prompt = `
  Draft a comprehensive Markdown summary for the company named '${company}'. The summary must be generated after performing a search on the company to gather up-to-date information. Format the output strictly as follows:

1.  Use the company name as the main heading (#).
2.  Include a subheading 'Description' (## Description) with a concise overview of what the company does, its sector, and global standing.
3.  Finally, include a subheading 'Key Offerings' (## Key Offerings) with a bulleted list of 3-5 of their main services, products, or business segments.

**Example of the desired output format:**

# [Example Company Name]
## Description
[Example Company] is a multinational corporation specializing in [Industry/Sector]. It is known globally for [Key characteristic] and operates in [Number] countries. Its primary focus is on [Main Business Area].

## Key Offerings
* [Main Product/Service 1]
* [Main Product/Service 2]
* [Main Product/Service 3]
* [Main Product/Service 4]
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
};
