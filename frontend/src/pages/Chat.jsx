// Chat.jsx
import { useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import axios from "axios";
import {
  Search,
  Send,
  File as FileIcon,
  Image,
  Mail,
  Globe,
  X,
} from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useLocation } from "react-router-dom";

const Chat = () => {
  const { user, logout } = useAuth();
  const [input, setInput] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [popupText, setPopupText] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [scrapedData, setScrapedData] = useState({});
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const openPopup = (type = "text") => {
    setPopupType(type);
    setShowPopup(true);
  };

  const fetchWebContent = async (url) => {
    try {
      const res = await axios.post("http://localhost:5000/scraping/scrap", {
        url,
      });
      setScrapedData((prev) => ({ ...prev, [url]: res.data }));
    } catch (err) {
      console.error("Scraping failed:", err);
      setScrapedData((prev) => ({
        ...prev,
        [url]: { error: "Failed to fetch" },
      }));
    }
  };

  const closePopup = () => {
    if (popupText.trim()) {
      if (popupType === "web") {
        const url = popupText.trim();
        setUploadedFiles((prev) => [
          ...prev,
          { name: url, type: "url", content: null },
        ]);
        fetchWebContent(url);
      } else {
        setUploadedFiles((prev) => [
          ...prev,
          { name: popupText, type: "text" },
        ]);
      }
    }
    setShowPopup(false);
    setPopupText("");
  };

  const project = location.state?.projectDetails;


  const handleSendMessage = async () => {
    
    console.log("Hello", project);

    if (!input.trim() && uploadedFiles.length === 0) {
      alert("Please enter a message or upload files before sending.");
      return;
    }

    try {
      const formData = new FormData();

      // Merge input text + popup texts
      let combinedPrompt = input;
      const extraText = uploadedFiles
        .filter((f) => f.type === "text")
        .map((f) => f.name)
        .join("\n\n");
      if (extraText) {
        combinedPrompt = combinedPrompt
          ? `${combinedPrompt}\n\n${extraText}`
          : extraText;
      }

      formData.append("prompt", combinedPrompt);

      const scrapedForAPI = {};
      uploadedFiles.forEach((f) => {
        if (f.type === "url" && scrapedData[f.name]) {
          scrapedForAPI[f.name] = scrapedData[f.name];
        }
      });

      if (Object.keys(scrapedForAPI).length > 0) {
        formData.append("scrapdata", JSON.stringify(scrapedForAPI));
      }

      uploadedFiles.forEach((f) => {
        if (f.type !== "text" && f.type !== "url" && f?.name && f?.size) {
          formData.append("files", f);
        }
      });

      const res = await axios.post(
        "http://localhost:5000/gemini/analyze",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // ✅ Navigate to output page
      navigate("/output", {
        state: {
          generatedText: res.data.response,
          projectDetails: {
            name: project.name,
            description: project.description,
            createdAt: new Date().toISOString(),
            uploadedFiles: uploadedFiles.map((file) => file.name),
          },
        },
      });
    } catch (err) {
      console.error("Gemini request failed:", err);
      alert("Failed to send data. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center p-6 pt-10">
       {/* Header and Project Info */}
<div className="w-full max-w-6xl flex justify-center mt-10">
  <div className="flex flex-col">
   <h1 className="text-4xl font-bold leading-tight text-white mb-2 text-center">
  Transform Ideas into Clear <span className="text-blue-500"> Requirements</span>
</h1>
<p className="text-gray-400 text-lg font-light mt-2">Feed Reqwriter the context it needs -
  Upload documents, images, emails, or web links relevant to your project to get started.
</p>
   
  </div>

  {/* {project && (
    <div className="text-right max-w-sm bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-blue-400">{project.name}</h2>
      <p className="text-gray-300 text-sm mt-1">{project.description}</p>
    </div>
  )} */}
</div>

        {/* Upload Cards */}
        <div className="flex justify-center gap-8 mt-20 mb-6 w-full">
          {[
            {
              id: "file",
              ref: fileInputRef,
              icon: <FileIcon size={32} />,
              label: "File",
              desc: "Upload documents",
            },
            {
              id: "image",
              ref: imageInputRef,
              icon: <Image size={32} />,
              label: "Image",
              desc: "Upload PNG, JPG",
            },
            {
              id: "text",
              icon: <Mail size={32} />,
              label: "Mom/Email",
              desc: "Paste text",
              onClick: () => openPopup("text"),
            },
            {
              id: "web",
              icon: <Globe size={32} />,
              label: "Web Page",
              desc: "Paste URL",
              onClick: () => openPopup("web"),
            },
          ].map(({ id, ref, icon, label, desc, onClick }) => (
            <div
              key={id}
              className="flex flex-col items-center p-4 bg-gray-900 rounded-lg cursor-pointer hover:bg-gray-700 w-48 text-center"
              onClick={() => (onClick ? onClick() : ref?.current?.click())}
            >
              {icon}
              <span className="mt-2 font-semibold">{label}</span>
              <p className="text-sm text-gray-400 mt-1">{desc}</p>
            </div>
          ))}
        </div>

        {/* Hidden File Inputs */}
        <input
          type="file"
          ref={fileInputRef}
          multiple
          className="hidden"
          onChange={handleFileUpload}
        />
        <input
          type="file"
          ref={imageInputRef}
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileUpload}
        />

        {/* Text/URL Popup */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-lg w-1/3">
              <h2 className="text-lg font-bold mb-4">
                {popupType === "web" ? "Enter Webpage URL" : "Enter Text"}
              </h2>
              <textarea
                className="w-full p-2 bg-gray-900 text-white rounded-lg"
                rows="2"
                value={popupText}
                onChange={(e) => setPopupText(e.target.value)}
              />
              <div className="flex justify-end mt-4">
                <button
                  onClick={closePopup}
                  className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="my-4 flex flex-wrap gap-4 w-3/4 md:w-1/2">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="bg-gray-900 p-2 rounded-lg flex items-center gap-2 text-sm"
              >
                <span className="text-gray-300">
                  {file.type === "url" ? (
                    <a
                      href={file.name}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 underline"
                    >
                      {file.name}
                    </a>
                  ) : (
                    file.name
                  )}
                </span>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Prompt Input */}
        <div className="flex items-center bg-gray-900 p-2 rounded-lg mt-4 w-3/4 md:w-1/2">
          <button className="p-2">
            <Search className="text-gray-400" />
          </button>
          <input
            type="text"
            placeholder="Enter Prompt here....."
            className="flex-1 bg-transparent outline-none px-2 text-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button className="p-2" onClick={handleSendMessage}>
            <Send className="text-gray-400" />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Chat;
