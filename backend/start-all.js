import { spawn } from "node:child_process";

const services = [
  { name: "auth", directory: "services/auth", port: "6001", mongodbUrl: process.env.AUTH_MONGODB_URL },
  { name: "resume", directory: "services/resume", port: "6002", mongodbUrl: process.env.RESUME_MONGODB_URL },
  { name: "interview", directory: "services/interview", port: "6003", mongodbUrl: process.env.INTERVIEW_MONGODB_URL },
  { name: "roadmap", directory: "services/roadmap", port: "6004", mongodbUrl: process.env.ROADMAP_MONGODB_URL },
  { name: "billing", directory: "services/billing", port: "6005", mongodbUrl: process.env.BILLING_MONGODB_URL },
  { name: "gateway", directory: "gateway", port: process.env.PORT },
];

const children = services.map(({ name, directory, port, mongodbUrl }) => {
  const child = spawn("npm", ["start", "--prefix", directory], {
    env: { ...process.env, PORT: port, ...(mongodbUrl ? { MONGODB_URL: mongodbUrl } : {}) },
    stdio: "inherit",
  });

  child.on("exit", (code, signal) => {
    console.error(name + " exited (code: " + code + ", signal: " + signal + ")");
    if (name === "gateway") process.exit(code ?? 1);
  });

  return child;
});

const stop = (signal) => {
  for (const child of children) child.kill(signal);
  process.exit(0);
};

process.on("SIGINT", () => stop("SIGINT"));
process.on("SIGTERM", () => stop("SIGTERM"));
