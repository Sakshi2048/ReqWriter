// controllers/s3Controller.js
import {
  PutObjectCommand,
  GetObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

import multer from "multer";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
dotenv.config();

// Use memory storage so files stay in buffer
const upload = multer({ storage: multer.memoryStorage() });

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadToS3 = async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const uploadResults = [];

    for (const file of files) {
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `uploads/${Date.now()}-${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      const command = new PutObjectCommand(params);
      await s3Client.send(command);

      uploadResults.push({
        filename: file.originalname,
        s3Key: params.Key,
        message: "Uploaded successfully",
      });
    }

    res.json({ uploadedFiles: uploadResults });
  } catch (err) {
    console.error("S3 Upload Error:", err);
    res.status(500).json({ error: "Failed to upload files to S3" });
  }
};

const getSignedS3Url = async (req, res) => {
  try {
    const { key } = req.params;

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    });

    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });

    res.json({ signedUrl });
  } catch (err) {
    console.error("Error getting signed URL:", err);
    res.status(500).json({ error: "Could not generate signed URL" });
  }
};

export { uploadToS3, getSignedS3Url, upload };
