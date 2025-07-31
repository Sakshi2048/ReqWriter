import express from "express";
import multer from "multer";
import { handleAnalyze } from "../controllers/geminiController.js";

const router = express.Router();

// Setup multer
const upload = multer({ dest: "uploads/" });

// Use multer middleware before handleAnalyze
router.post("/analyze", upload.array("files"), handleAnalyze);

export default router;
