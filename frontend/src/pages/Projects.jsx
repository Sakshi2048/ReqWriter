import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ projectName: "", description: "" });

  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/project/display");
      if (response.data && Array.isArray(response.data.projects)) {
        setProjects(response.data.projects);
      } else {
        setProjects([]);
        setError("Invalid response format from server.");
      }
    } catch (err) {
      console.error("❌ Error fetching projects:", err);
      setError("Failed to load projects.");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/project/delete/${id}`);
      setProjects((prev) => prev.filter((project) => project._id !== id));
    } catch (err) {
      console.error("❌ Error deleting project:", err);
      alert("Failed to delete project.");
    }
  };

  const handleContinueChat = (project) => {
    const projectDetails = {
      name: project.projectName,
      description: project.description,
      createdAt: project.createdAt || new Date().toISOString(),
    };

    navigate("/chat", { state: { projectDetails } });
  };

  const handleCreateProject = async () => {
    if (!formData.projectName || !formData.description) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/project/create", formData);
      setProjects([...projects, response.data.project]);
      setFormData({ projectName: "", description: "" });
      setShowForm(false);
      fetchProjects();
    } catch (err) {
      console.error("❌ Error creating project:", err);
      alert("Project creation failed. Try a different name.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center px-4 sm:px-8">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <h1 className="text-3xl font-semibold text-center mb-10">Your Projects</h1>

          {loading ? (
            <p className="text-center text-gray-400">Loading projects...</p>
          ) : error ? (
            <p className="text-center text-red-400">{error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-blue-600/30 transition duration-300"
                >
                  <h2 className="text-xl font-semibold text-blue-400 mb-2">
                    {project.projectName}
                  </h2>
                  <p className="text-sm text-gray-300 mb-3">{project.description}</p>
                  <span className="text-xs text-gray-400 block mb-2">
                    Created at:{" "}
                    {project.createdAt
                      ? new Date(project.createdAt).toLocaleString()
                      : "N/A"}
                  </span>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <button
                      onClick={() => handleContinueChat(project)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm text-white"
                    >
                      Chat
                    </button>

                    <button
                      onClick={() => alert("🔍 View Uploaded Documents - Feature coming soon!")}
                      className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm text-white"
                    >
                      View Uploaded Docs
                    </button>

                    <button
                      onClick={() => handleDelete(project._id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              {/* Add New Project Card */}
              <div
                onClick={() => setShowForm(true)}
                className="cursor-pointer bg-gray-800 hover:bg-gray-700 border-2 border-dashed border-gray-600 flex items-center justify-center rounded-2xl p-6 shadow-md transition duration-300"
              >
                <span className="text-4xl text-gray-400 font-bold">+</span>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Popup Modal/Form for New Project */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white text-black p-8 rounded-xl shadow-xl w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
            <input
              type="text"
              placeholder="Project Name"
              value={formData.projectName}
              onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              rows="4"
            ></textarea>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowForm(false)}
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

      <Footer />
    </div>
  );
};

export default Projects;
