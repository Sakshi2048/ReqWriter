import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";


// Routers
import authRouter from "./routes/authRouter.js";
import projectRouter from "./routes/projectRouter.js";
import geminiRouter from "./routes/geminiRouter.js";
import confluenceRouter from "./routes/confluenceRouter.js";
import jiraRouter from "./routes/jiraRouter.js";
import s3Router from "./routes/s3Router.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  });

// Routes
app.use("/authenticate", authRouter);
app.use("/project", projectRouter);
app.use("/gemini", geminiRouter);
app.use("/confluence", confluenceRouter);
app.use("/jira", jiraRouter);
app.use("/s3", s3Router);

// Test Route
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.listen(5000,()=>{
    console.log("server listening on port ",5000);

});

export default app;
