import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import Navbar from "../components/Navbar.jsx";

export default function Hero() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
  });

  // Lock scroll when popup is shown
  useEffect(() => {
    const html = document.querySelector("html");
    if (showPopup) {
      html.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      html.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      html.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [showPopup]);

  // Form field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const BACKEND_URL = "http://localhost:5000";

  // Create project handler
const handleCreateProject = async () => {
  if (!formData.projectName || !formData.description) {
    alert("Please fill all fields.");
    return;
  }

  try {
    const response = await axios.post(`${BACKEND_URL}/project/create`, formData);
    alert(response.data.message);

    const projectDetails = {
      name: formData.projectName,
      description: formData.description,
      createdAt: new Date().toISOString(),
    };

    setShowPopup(false);
    // navigate("/chat", { state: { projectDetails } });
    navigate("/projects");
  } catch (error) {
    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert("❌ Network error. Please try again.");
    }
  }
};

  // Check login before showing form
  const handleExperienceClick = () => {
    if (!user) {
      alert("Please login to continue.");
      navigate("/login");
      return;
    }
    setShowPopup(true);
  };

  return (
    <div className="relative">
      {/* Background content */}
      <div
        className={`min-h-screen bg-gradient-to-b from-gray-900 to-black text-white transition-all duration-300 ${
          showPopup ? "blur-sm pointer-events-none select-none" : ""
        }`}
      >
        <Navbar />

        {/* Hero Section */}
        <main className="flex flex-col items-center text-center mt-32 px-6">
          <h2 className="text-4xl md:text-6xl font-bold">
            Revolutionize Your{" "}
            <span className="text-blue-400">Requirements</span> <br /> with AI
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl">
            Tired of tedious requirement gathering? Our platform harnesses the
            power of Generative AI to automatically transform your textual and
            visual inputs into structured, actionable requirements.
          </p>
          <div className="mt-6 flex space-x-4">
            <button
              className="bg-blue-600 px-6 p-3 rounded-full text-lg font-medium hover:bg-blue-500 transition cursor-pointer"
              onClick={handleExperienceClick}
            >
              Experience AI Automation
            </button>

            {user ? (
              <button
                className="bg-gray-700 px-6 py-3 rounded-full text-lg font-medium hover:bg-gray-600 transition cursor-pointer"
                onClick={() => navigate("/projects")}
              >
                View Previous Projects
              </button>
            ) : (
              <button
                className="bg-gray-700 px-6 py-3 rounded-full text-lg font-medium hover:bg-gray-600 transition"
                onClick={() => navigate("/login")}
              >
                Discover How It Works
              </button>
            )}
          </div>
        </main>
      </div>

      {/* Popup Modal for Creating Project */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white text-black p-8 rounded-xl shadow-xl w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
            <input
              type="text"
              name="projectName"
              placeholder="Project Name"
              value={formData.projectName}
              onChange={handleChange}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              rows="4"
            ></textarea>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
