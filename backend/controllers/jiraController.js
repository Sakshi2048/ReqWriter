// controller/jiraController.js
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const apiToken =process.env.API_TOKEN;
const baseurl = process.env.BASE_URL;
const email = process.env.JIRA_EMAIL;

async function handleCreateProject(req, res) {
  const url = `https://${baseurl}/rest/api/2/project`;
  const { key, name } = req.body;

  const headers = {
    Authorization: `Basic ${Buffer.from(`${email}:${apiToken}`).toString(
      "base64"
    )}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const body = {
    key,
    name,
    projectTypeKey: "software",
    leadAccountId: "712020:029d4692-0015-492a-8874-9d844a65e397",
  };

  try {
    const response = await axios.post(url, body, { headers });
    console.log(`Project created: ${response.data.key}`);
    res
      .status(200)
      .json({ message: "Jira project created", data: response.data });
  } catch (err) {
    console.error("Error creating project:", err.response?.data || err.message);
    res
      .status(500)
      .json({
        error: "Failed to create Jira project",
        details: err.response?.data || err.message,
      });
  }
}

export { handleCreateProject };
