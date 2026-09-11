# FresherAI 🎯

**An AI-powered, multi-agent career preparation platform** that helps freshers and job-seekers ace interviews, build stronger resumes, and plan their career path — all in one place.

FresherAI combines **LLM-driven multi-agent workflows**, a **microservices backend**, and a modern React frontend to deliver AI mock interviews, resume scoring, and personalized career roadmaps.

---

## ✨ Features

### 🤖 AI Mock Interviews
- Conduct realistic, role-specific mock interviews powered by **LangGraph**-orchestrated multi-agent workflows (interview agent → feedback agent → summary agent).
- Supports resume-based question generation — questions can be tailored using the candidate's uploaded resume.
- Includes a **live in-browser code editor (Monaco Editor)** for technical/coding rounds.
- Delivers structured feedback per answer and a final interview summary report.

### 📄 Resume Builder & Scoring
- Upload a resume PDF and get instant AI-powered analysis: parsed skills, ATS-style scoring, missing-skill detection, and improvement recommendations.
- Uses **pdf-parse** to extract resume text, which is then processed by an LLM agent.
- Results are cached in **Redis** for fast repeat access.

### 🗺️ Personalized Career Roadmap
- Generates a customized learning roadmap based on the user's target role, using a dedicated **LangGraph** agent pipeline (roadmap agent + resource agent).
- Suggests curated learning resources for each roadmap milestone.

### 💳 Subscription & Billing
- Integrated **Razorpay** payment gateway for subscription plans.
- Dedicated billing microservice to manage plans, payments, and subscription status.

### 🔐 Authentication
- Secure user authentication via **Firebase Authentication**.
- Centralized auth checks enforced at the API Gateway level before requests reach internal services.

---

## 🏗️ Architecture

FresherAI is built as a **microservices system** with 5 independent backend services, unified behind a custom **API Gateway**:

```
                         ┌─────────────────┐
                         │   React Frontend │
                         └────────┬─────────┘
                                  │
                         ┌────────▼─────────┐
                         │   API Gateway     │  (Express + express-http-proxy)
                         │  - Auth middleware │
                         │  - Request routing │
                         └───┬───┬───┬───┬───┘
                 ┌───────────┘   │   │   └───────────┐
                 │               │   │               │
          ┌──────▼─────┐ ┌───────▼───┐ ┌──▼────────┐ ┌▼─────────┐ ┌─────────────┐
          │   Auth     │ │  Billing  │ │ Interview │ │  Resume  │ │   Roadmap   │
          │  Service   │ │  Service  │ │  Service  │ │ Service  │ │   Service   │
          │ (Firebase) │ │(Razorpay) │ │(LangGraph)│ │(pdf-parse│ │ (LangGraph) │
          └────────────┘ └───────────┘ └───────────┘ │+ LangGraph)└─────────────┘
                                                       └──────────┘
```

Each service:
- Runs as an **independent Node.js/Express application**
- Has its own MongoDB models and business logic
- Is containerized via its own **Dockerfile**
- Is only reachable through the **API Gateway**, which handles auth verification and forwards authenticated requests with the necessary headers

---

## 🛠️ Tech Stack

**Frontend**
- React.js, React Router, Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
- Tailwind CSS
- Monaco Editor (`@monaco-editor/react`) — in-browser code editor for interviews
- Firebase (client SDK for auth)
- Recharts — data visualizations
- Framer Motion (`motion`) — animations
- Axios

**Backend (Microservices)**
- Node.js, Express.js
- **API Gateway** — `express-http-proxy`, custom auth middleware, request header forwarding
- MongoDB with Mongoose
- Redis — caching (resume analysis results)
- **LangChain** + **LangGraph** (`@langchain/core`, `@langchain/langgraph`, `@langchain/groq`) — multi-agent LLM orchestration
- **Groq** — LLM inference provider
- **Firebase Admin SDK** — server-side auth verification
- **Razorpay** — payment/subscription processing
- **pdf-parse** — resume text extraction
- **Multer** — file uploads

**DevOps**
- Docker (per-service Dockerfiles)
- Docker Compose (Redis service)

---

## 📂 Project Structure

```
fresherAI/
├── frontend/                  # React app
│   └── src/
├── backend/
│   ├── gateway/                # API Gateway (auth, routing, proxying)
│   ├── shared/                 # Shared utilities (e.g. Redis client)
│   ├── docker-compose.yml      # Redis service
│   └── services/
│       ├── auth/                # Firebase-based authentication service
│       ├── billing/             # Razorpay subscription/billing service
│       ├── interview/           # LangGraph multi-agent mock interview service
│       ├── resume/              # Resume parsing/scoring service
│       └── roadmap/             # LangGraph career roadmap generation service
```

---

## ⚙️ How It Works

1. **Auth** — User signs up/logs in via Firebase Authentication. The API Gateway verifies the Firebase token on every protected request and attaches the user's identity before forwarding it downstream.
2. **Resume Analysis** — User uploads a resume PDF → text is extracted (`pdf-parse`) → an LLM agent scores it and extracts skills/recommendations → results are stored in MongoDB and cached in Redis.
3. **Mock Interview** — User starts an interview for a chosen role/type → a LangGraph state machine routes between an **interview agent** (generates questions, optionally resume-aware), a **feedback agent** (evaluates each answer), and a **summary agent** (produces a final report) → coding questions are answered live in the Monaco code editor.
4. **Roadmap Generation** — User requests a roadmap for a target role → a LangGraph pipeline (roadmap agent + resource agent) generates a structured learning path with curated resources.
5. **Billing** — User subscribes to a plan → Razorpay handles payment → the billing service updates subscription status, which the gateway/other services can check.

---


## 📌 Live Demo

🔗 [Live Demo](https://freshers-ai-frontend.onrender.com/)

---

## 👤 Author

**Deepanshu Singh**
- GitHub: [@DeepanshuSingh04](https://github.com/DeepanshuSingh04)
- LinkedIn: [Deepanshu Singh](https://www.linkedin.com/in/deepanshu--singh/)

---

## 📄 License

This project is available for educational and portfolio purposes.
