// routes/s3Routes.js
import express from "express";
import { uploadToS3, getSignedS3Url} from "../controllers/s3Controller.js";
import multer from "multer";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.array("files"), uploadToS3);
router.get("/file/:key", getSignedS3Url); 

export default router;
