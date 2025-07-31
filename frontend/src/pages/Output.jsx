// Output.jsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, Send, Plus, FileDown, X } from "lucide-react";
import { FaJira } from "react-icons/fa";
import { SiConfluence } from "react-icons/si";
import { AiOutlineFileText } from "react-icons/ai";
import { marked } from "marked";
import { useAuth } from "../context/AuthContext.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import axios from "axios";

export default function Output() {
  const { user, logout } = useAuth();
  const [input, setInput] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [pageName, setPageName] = useState("");
  const [content, setContent] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const project = location.state?.projectDetails;

  useEffect(() => {
    const rawGenerated = location.state?.generatedText;

    if (!rawGenerated) {
      navigate("/"); // 🔁 fallback for refresh
      return;
    }

    const generated =
      typeof rawGenerated === "string"
        ? rawGenerated
        : rawGenerated?.text ?? "";

    setContent(generated);
  }, [location.state, navigate]);

  const handleDownload = () => {
    if (!content) return;
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "generated-requirements.md";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleAddJira = async () => {
    console.log(content);
    console.log(project);

    if (!project?.name || !content) {
      alert("Project or content missing.");
      return;
    }

    const BackendURL = "http://localhost:5000";

    // 🔑 Generate a random 3-letter key (uppercase)
    const randomKey = `PRJ${Math.floor(100 + Math.random() * 900)}`;
    console.log("Generated Jira Project Key:", randomKey);

    try {
      const res = await axios.post(`${BackendURL}/jira/create-project`, {
        key: randomKey,
        name: project.name,
      });

      alert("JIRA project created successfully.");
      console.log("Jira Project Created:", res.data);
    } catch (error) {
      console.error("Error creating JIRA project:", error);
      alert("Failed to create JIRA project.");
    }
  };

const handleCreatePage = async () => {
  if (!pageName || !content || !project?.name) {
    alert("Missing page name, content, or project name.");
    return;
  }

  const BackendURL = "http://localhost:5000";

  try {
    await axios.post(`${BackendURL}/confluence/create-page`, {
      name: project.name,  
      title: pageName,
      content
    });

    alert("Page saved in Confluence.");
  } catch (error) {
    console.error("Error creating Confluence page:", error.response?.data || error.message);
    alert("Failed to save page in Confluence.");
  }
};



  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-[#0b0b0b] text-white flex flex-col items-center px-4 py-6">
        <div className="w-full max-w-7xl flex flex-col md:flex-row gap-4">
          {/* LEFT SIDEBAR */}
          <aside className="md:w-1/5 bg-[#1b1b1b] p-5 rounded-xl shadow-md space-y-4">
            <h2 className="text-xl font-bold text-blue-400">
              {project?.name || "Untitled Project"}
            </h2>
            <p className="text-sm text-gray-300">{project?.description}</p>
            <p className="text-xs text-gray-500">
              Created on:{" "}
              {project?.createdAt
                ? new Date(project.createdAt).toLocaleString()
                : ""}
            </p>
            <hr className="border-gray-600" />
            <h3 className="text-sm font-semibold text-gray-400 mb-2">
              📎 Uploaded Files
            </h3>
            <ul className="list-disc pl-5 text-sm text-gray-200 space-y-1">
              {project?.uploadedFiles?.length > 0 ? (
                project.uploadedFiles.map((file, idx) => (
                  <li key={idx}>{file}</li>
                ))
              ) : (
                <li>No files uploaded</li>
              )}
            </ul>
          </aside>

          {/* MAIN CONTENT */}
          <div className="md:w-4/5 bg-[#1e1e1e] rounded-xl shadow-xl flex flex-col overflow-hidden">
            <header className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
              <h1 className="text-xl font-semibold flex items-center text-blue-400">
                <AiOutlineFileText className="mr-2 text-2xl" />
                Generated Output
              </h1>
              <button
                onClick={handleDownload}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium flex items-center"
              >
                <FileDown className="mr-2" /> Download
              </button>
            </header>

            <section className="h-[480px] overflow-y-auto px-8 py-6 text-gray-100 prose prose-invert scrollbar-thin scrollbar-thumb-gray-700">
              {content?.trim() ? (
                <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
              ) : (
                <div className="text-center text-gray-400">
                  Loading content...
                </div>
              )}
            </section>

            <footer className="bg-[#111] px-6 py-4 flex flex-col md:flex-row items-center justify-between border-t border-gray-700 gap-3">
              <div className="flex items-center w-full md:w-2/3 bg-[#2a2a2a] rounded-lg px-3 py-2">
                <Plus className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Ask a follow-up or refine the requirements..."
                  className="flex-1 bg-transparent px-3 py-1 outline-none text-white placeholder-gray-400"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button className="p-2 hover:text-blue-500 transition">
                  <Send className="text-gray-400" />
                </button>
              </div>
              <div className="flex gap-2 mt-3 md:mt-0">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-2 rounded-md font-medium flex items-center"
                  onClick={handleAddJira}
                >
                  Create a Jira Project
                </button>
                <button
                  onClick={() => setIsPopupOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-2 rounded-md font-medium flex items-center"
                >
                  Store in Confluence
                </button>
              </div>
            </footer>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="bg-[#1f1f1f] w-[90%] max-w-md p-6 rounded-lg shadow-2xl relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              onClick={() => setIsPopupOpen(false)}
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-semibold mb-4 text-white text-center">
              📄 Save to Confluence
            </h2>
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Page Name"
              value={pageName}
              onChange={(e) => setPageName(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-5">
              <button
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md text-white"
                onClick={() => setIsPopupOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white"
                onClick={() => {
                  setIsPopupOpen(false);
                  handleCreatePage();
                }}
              >
                Save Page
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
