import Project from "../models/projectModel.js";

async function handleCreateProject(req, res) {
  try {
    const { projectName, description } = req.body;

    if (!projectName || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingProject = await Project.findOne({ projectName });
    if (existingProject) {
      return res.status(409).json({ message: "Project already exists." });
    }

    const newProject = new Project({ projectName, description });
    await newProject.save();

    res.status(201).json({ message: "Project Saved successfully." });
  } catch (error) {
    console.error("❌ Error saving project:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

async function handleDisplayAllProjects(req, res) {
  try {
    const projects = await Project.find();

    if (!projects.length) {
      return res.status(404).json({ message: "No projects found." });
    }

    res.status(200).json({ projects });
  } catch (error) {
    console.error("❌ Error fetching projects:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

// DELETE a project by ID
async function handleDeleteProject(req, res) {
  try {
    const { id } = req.params;

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found." });
    }

    res.status(200).json({ message: "Project deleted successfully." });
  } catch (error) {
    console.error("❌ Error deleting project:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

export { handleCreateProject, handleDisplayAllProjects, handleDeleteProject };
