import dotenv from "dotenv";
dotenv.config();

import multer from "multer";
import { unlinkSync, existsSync } from "fs";
import { extname } from "path";
import xlsx from "xlsx";
const { readFile, utils } = xlsx;

import { Router } from "express";
const router = Router();
import { GoogleGenAI, createPartFromUri, createUserContent } from "@google/genai";

// Multer setup for multiple file uploads
const upload = multer({ dest: "uploads/" });

const genAI = new GoogleGenAI(process.env.GOOGLE_API_KEY);
const customPrompt =`Given the input files analyze and extract the functional requirements. Ensure that each requirement is explicitly stated, well-defined, and categorized by its respective functionality. Additionally, reference any applicable regulations, compliance standards, or industry best practices (e.g., ISO 9001, GDPR, HIPAA, IEEE standards) that are relevant to the requirements. and categorize and prioritize them using:

The MoSCoW Method (Must-have, Should-have, Could-have, Wont-have)

A Numerical Priority Score (on a scale of 1-10, where 10 is the highest priority based on criticality, impact, and feasibility) Ensure the prioritization is justified with reasoning for each requirement.
   extract all non-functional requirements (NFRs). Categorize them under key areas such as performance, scalability, security, usability, compliance, and maintainability. Clearly mention which regulations, security policies, and compliance standards (e.g., ISO 27001, OWASP Security Principles, SOC 2, NIST) apply to each NFR and categorize and prioritize them using:

The MoSCoW Method (Must-have, Should-have, Could-have, Wont-have)

A Numerical Priority Score (on a scale of 1-10, where 10 is the highest priority based on criticality, impact, and feasibility) Ensure the prioritization is justified with reasoning for each requirement.
  Convert the extracted functional requirements into Agile user stories formatted for Jira backlog management. Follow the "As a [role], I want [feature], so that [benefit]" format. Additionally, include:

Acceptance criteria

Priority (High/Medium/Low)

Dependencies (if any)

Linked functional requirement ID (traceability) and the userstories should be in table format with cloumns
  Based on the extracted functional requirements , generate a high-level code implementation or system architecture that aligns with these requirements. The output should follow best practices for maintainability and scalability.
  Using the extracted functional requirements , generate test cases that validate the correct implementation of these requirements. For each test case, include:

Test ID

Test Objective

Pre-conditions

Steps to Execute

Expected Outcome

Priority (Critical, High, Medium, Low)
  Analyze the given input files and identify any gaps, ambiguities, or missing details in the requirements. Highlight areas where additional information is necessary for clarity. Provide a structured list of questions that should be asked to the stakeholders to refine the requirements further
  Based on the selected teams Devops ,Backend,frontend and finance and the provided input files  extract functional requirements specific to each team. Clearly define the role of each team in implementing or maintaining these requirements and reference any relevant regulations or industry standards
  Generate Agile user stories specific to the selected teams Devops ,Backend,frontend and finance from the extracted functional requirements. Format them as:

"As a [team], I want [feature], so that [benefit]."
Include acceptance criteria, priority, and dependencies.
add 2-3 lines after each table and each main point end`

async function handleAnalyze (req, res)  {
  try {
    const parts = [];
    const promptText = req.body.prompt;
    const scrapdata = req.body.scrapdata;
    
    console.log("Prompt text:", promptText);
    console.log("Scrapdata:", scrapdata);
    console.log("Files uploaded:", req.files?.length || 0);

    // Validate API key
    if (!process.env.GOOGLE_API_KEY) {
      return res.status(500).json({ error: "Google API key is not configured" });
    }

    // Handle scraped data
    if (scrapdata && scrapdata !== "undefined") {
      try {
        const parsedScrapdata = JSON.parse(scrapdata);
        for (const [url, content] of Object.entries(parsedScrapdata)) {
          if (content && (content.text || content)) {
            parts.push({
              text: `Scraped content from URL (${url}):\n${
                content?.text || JSON.stringify(content)
              }`,
            });
          }
        }
      } catch (e) {
        console.error("Failed to parse scrapdata:", e);
      }
    }

    // Include user-provided text input (if any)
    if (promptText && promptText.trim().length > 0 && promptText !== "undefined") {
      parts.push({ text: `User input:\n${promptText}` });
    }

    // Handle uploaded files
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        try {
          const filePath = file.path;
          const fileName = file.originalname;
          const fileExt = extname(fileName).toLowerCase();
          const mimeType = file.mimetype;

          console.log(`Processing file: ${fileName} (${fileExt})`);

          if (fileExt === ".xls" || fileExt === ".xlsx") {
            const workbook = readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const csv = utils.sheet_to_csv(sheet);
            parts.push({ text: `Contents of Excel file "${fileName}":\n${csv}` });
          } else {
            // Upload file to Gemini
            const myfile = await genAI.files.upload({
              file: filePath,
              config: { mimeType },
            });

            console.log(`File uploaded to Gemini: ${myfile.uri}`);

            const part = await createPartFromUri(myfile.uri, myfile.mimeType);
            parts.push(part);
          }

          // Clean up uploaded file
          unlinkSync(filePath);
        } catch (fileError) {
          console.error(`Error processing file ${file.originalname}:`, fileError);
          // Clean up file even if processing failed
          if (existsSync(file.path)) {
            unlinkSync(file.path);
          }
        }
      }
    }

    // Check if we have any content to process
    if (parts.length === 0) {
      return res.status(400).json({ 
        error: "No valid content provided. Please provide text input, files, or scraped data." 
      });
    }

    console.log(`Processing ${parts.length} parts with Gemini`);

    // Create user content with custom prompt and parts
    const userInput = createUserContent([{ text: customPrompt }, ...parts]);

    // Generate content using Gemini
    const result = await genAI.models.generateContent({
      model: "gemini-2.0-flash-exp", // Updated to use a more stable model
      contents: [userInput],
      generationConfig: {
        maxOutputTokens: 8192,
        temperature: 0.1,
      },
    });

    console.log("Gemini content generation completed", result.result);
    const response = await result.text;

    console.log("Gemini response generated successfully");
    res.json({ response });

  } catch (err) {
    console.error("Error in /analyze route:", err);
    
    // Clean up any uploaded files in case of error
    if (req.files) {
      req.files.forEach(file => {
        if (existsSync(file.path)) {
          unlinkSync(file.path);
        }
      });
    }

    // Provide more specific error messages
    if (err.message?.includes("API key")) {
      return res.status(500).json({ error: "Invalid or missing Google API key" });
    }
    
    if (err.status === 400) {
      return res.status(400).json({ 
        error: "Invalid request format. Please check your input data and try again." 
      });
    }
    
    if (err.status === 429) {
      return res.status(429).json({ 
        error: "Rate limit exceeded. Please try again later." 
      });
    }

    res.status(500).json({ 
      error: "Something went wrong while processing your request.",
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

export {handleAnalyze}