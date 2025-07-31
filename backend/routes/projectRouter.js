import express from "express";
import { handleCreateProject, handleDisplayAllProjects,handleDeleteProject } from "../controllers/projectController.js";

const router = express.Router();

router.post("/create", handleCreateProject);
router.get("/display", handleDisplayAllProjects);
router.delete("/delete/:id", handleDeleteProject);

export default router;
