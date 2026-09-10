import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { getCurrentUser } from "./controllers/user.controller.js";
import { isAuth } from "./middleware/isAuth.js";
import { proxyWithHeaders } from "./utils/proxyWithHeaders.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(morgan("dev"));
app.use(cookieParser());

const PORT = process.env.PORT || 6000;
const serviceUrl = (name) => {
  const value = process.env[name];
  if (!value) throw new Error("Missing required environment variable: " + name);
  return /^https?:\/\//i.test(value) ? value : "http://" + value;
};

app.get("/", (req, res) => res.send("Hello from Gateway"));
app.use("/api/auth", proxy(serviceUrl("AUTH_SERVICE_URL")));
app.use("/api/resume", isAuth, proxyWithHeaders(serviceUrl("RESUME_SERVICE_URL")));
app.use("/api/interview", isAuth, proxyWithHeaders(serviceUrl("INTERVIEW_SERVICE_URL")));
app.use("/api/roadmap", isAuth, proxyWithHeaders(serviceUrl("ROADMAP_SERVICE_URL")));
app.use("/api/billing", isAuth, proxyWithHeaders(serviceUrl("BILLING_SERVICE_URL")));
app.get("/api/me", isAuth, getCurrentUser);

app.listen(PORT, () => console.log("Gateway Started on " + PORT));
