import React, { useState } from "react";

function Steps() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "User Input & Data Collection",
      content: (
        <>
          <ul className="mt-2 list-disc list-inside text-left">
            <li>✅ Users upload/input requirements</li>
            <li>Manual Entry: Users type requirements directly.</li>
            <li>
              File Upload: Supports PDFs, Word, Excel, usernames, Meeting Notes.
            </li>
            <li>Web Page Scraping: Extracts regulatory data.</li>
            <li>✅ File Handling & Preprocessing</li>
            <li>
              Extract Text: (Apache Tika for PDFs, docx for Word, pandas for
              Excel).
            </li>
            <li>Metadata Storage: (MongoDB stores document metadata).</li>
          </ul>
        </>
      ),
    },
    {
      title: "RAG Pipeline for Requirement Extraction",
      content: (
        <>
          <ul className="mt-2 list-disc list-inside text-left">
            <li>✅ Text Embedding & Retrieval</li>
            <li>
              Convert extracted text into embeddings using Hugging Face models
              (BERT, SBERT).
            </li>
            <li>Store embeddings in FAISS/ChromaDB for fast retrieval.</li>
            <li>✅ Contextual Analysis & Classification</li>
            <li>Query database using LangChain RAG.</li>
            <li>
              Use GPT-4 or Llama-3 to extract, structure, and classify
              Functional Requirements (FR) and Non-Functional Requirements
              (NFR).
            </li>
            <li>✅ Real-Time Questioning for Clarifications</li>
            <li>
              AI detects missing/incomplete information and prompts user for
              additional details.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Requirement Processing & Prioritization",
      content: (
        <>
          <ul className="mt-2 list-disc list-inside text-left">
            <li>✅ Categorization & Prioritization</li>
            <li>
              Apply MoSCoW prioritization (Must-have, Should-have, Could-have,
              Won’t-have).
            </li>
            <li>AI assigns priority scores (1-10).</li>
            <li>✅ Standardized Requirement Document Generation</li>
            <li>Structure requirements into a consistent 2-3 page format.</li>
            <li>Generate a Word Document (python-docx).</li>
            <li>
              Extract User Stories in Excel (pandas) for Jira backlog updates.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Jira & Confluence Integration",
      content: (
        <>
          <ul className="mt-2 list-disc list-inside text-left">
            <li>✅ Jira Integration (User Story Creation)</li>
            <li>AI-generated User Stories pushed to Jira via REST API.</li>
            <li>Auto-assign priorities (Critical, High, Medium, Low).</li>
            <li>
              ✅ Confluence Integration (Requirement Documentation Storage)
            </li>
            <li>AI-published documents stored in Confluence using REST API.</li>
            <li>Version-controlled inventory maintained.</li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <div className="bg-black p-6 px-24 text-white">
      <ul className="flex items-center gap-4">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <li
              className="flex flex-col items-center text-center cursor-pointer flex-1"
              onClick={() => setActiveStep(index)}
            >
              <div
                className={`size-10 flex items-center justify-center rounded-full text-lg font-bold transition-all duration-200 ${
                  index <= activeStep ? "bg-blue-500" : "bg-gray-700 text-white"
                }`}
              >
                {index + 1}
              </div>
              <span className="mt-2 text-sm font-medium text-gray-300">
                {step.title}
              </span>
            </li>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 transition-all duration-200 ${
                  index < activeStep ? "bg-blue-500" : "bg-gray-700"
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </ul>
      <div className="mt-6 p-4 bg-gray-800 rounded-lg text-gray-300 text-center">
        {steps[activeStep].content}
      </div>
    </div>
  );
}

export default Steps;
