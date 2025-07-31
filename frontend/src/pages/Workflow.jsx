import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const workflowSteps = [
  {
    title: "Register or Login ",
    emoji: "👩‍💻",
    description:
      "Start by creating an account or logging in. ",
  },
  {
    title: "Create a Project ",
    emoji: "📁",
    description:
      "Create a new project with a unique name to begin gathering requirements for a specific product or feature.",
  },
  {
    title: "Upload Requirement Documents ",
    emoji: "📄",
    description:
      "Upload PDFs or text files that include your system.",
  },
  {
    title: "Generate & Save Structured Requirements ",
    emoji: "🧠",
    description:
      "The AI parses your documents, extracts key requirements, and generates user stories and specifications.",
  },
  {
    title: "Integrate with JIRA & Confluence ",
    emoji: "🧩",
    description:
      "Push finalized requirements into JIRA tasks or Confluence documentation to kickstart implementation.",
  },
];

const Workflow = () => {
  return (
    <div className="bg-gradient-to-b from-[#0f172a] to-black text-white min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">
          How <span className="text-blue-500">ReqWriter</span> Works?
        </h2>

        <div>
          {workflowSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className="mb-10 flex items-start gap-x-4"
            >
              {/* Timeline Dot */}
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-800 border border-gray-600 flex items-center justify-center text-lg">
                {step.emoji}
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-yellow-300">{step.title}</h3>
                <p className="text-sm text-gray-300">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Workflow;
