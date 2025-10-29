import { Request, Response } from "express";
import { generateMarkdownWithGemini } from "../helper/generatemd";

export const generatemd = async (req: Request, res: Response) => {
  try {
    const { company } = req.body;
    if (!company)
      return res.status(400).json({ error: "company field required" });

    const mdContent = await generateMarkdownWithGemini(company);

    res.status(200).json({
      message: "Markdown generated successfully",
      markdown: mdContent,
    });
  } catch (error) {
    console.error("Error generating markdown:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
