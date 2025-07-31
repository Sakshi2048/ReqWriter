
# 🧠 ReqWriter – AI-Powered Requirements Writing Platform

ReqWriter is an AI-driven system that automates the **extraction, validation, prioritization, and documentation** of functional and non-functional software requirements from text, images, and voice inputs. It supports seamless integration with **JIRA** and **Confluence**, offering version-controlled documentation and team collaboration using a scalable AWS and GenAI-backend architecture.

---

## 📌 Key Features

- 📄 **Multi-format Input Support:** PDF, Images, Voice, Web Pages  
- ✅ **Requirement Classification:** Functional & Non-Functional  
- 🚦 **Prioritization:** MoSCoW and Numeric Scoring  
- 📤 **Standardized Output:** Downloadable in Word, Excel, PDF  
- 🔁 **Tool Integration:** Export user stories to JIRA and docs to Confluence  
- 📚 **Version Control:** Manage historical requirement changes  


---

## ⚙️ Tech Stack

| Layer        | Technologies Used                                          | Purpose                                    |
|--------------|------------------------------------------------------------|--------------------------------------------|
| Frontend     | React.js, Tailwind CSS                                     | Dynamic, responsive UI                     |
| Backend      | Node.js (API)                                              | Node handles logic; Flask manages AI tasks |
| AI Models    | Gemini API                 | Intelligent requirement parsing            |
| Storage      | AWS S3                                                     | Scalable and secure file storage           |
| Integrations | JIRA, Confluence                                           | Project management and documentation       |



---

## 🏗️ Folder Structure

```
ReqWriter/
│
├── backend/
│   ├── controllers/         # Business logic
│   ├── models/              # MongoDB models
│   ├── routes/              # Express routes
│   ├── index.js             # Entry point for backend server
│   ├── package.json         # Backend dependencies
│   └── package-lock.json
│
├── frontend/
│   ├── src/                 # React components & logic
│   ├── index.html
│   ├── vite.config.js       # Vite config for React
│   ├── eslint.config.js     
│   ├── package.json         # Frontend dependencies
│   ├── package-lock.json
│   └── README.md
│
├── .gitignore              
```

---

## 🚀 How to Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/Sakshi2048/ReqWriter.git .
cd ReqWriter
```

### 2. Run the Backend
```bash
cd backend
npm install
nodemon index.js
```

### 3. Run the Frontend
```bash
cd ../frontend
npm install
npm run dev
```

---

## 📊 Impact Highlights

- ⏱️ **60% reduction** in requirement drafting time  
- 📈 Achieved **70–90% accuracy** in auto-extracted structured requirements  
- 🛠️ Turned raw unstructured inputs into **JIRA-ready user stories**  
- 📘 Ensured **traceability** via Confluence version-controlled documentation  

---

## 🔮 Future Scope

- UML/Flowchart generation from requirements  
- Integration with Slack/MS Teams  
- Multi-language support  
- Gemini fine-tuning with org-specific docs  

---

## 🤖 Why Gemini?

- **Gemini**: Ideal for factually accurate generation of software system based requirements. 

---
## 📬 Contact

For feedback, issues, or contributions, feel free to reach out or raise a PR/Issue on GitHub.

---
