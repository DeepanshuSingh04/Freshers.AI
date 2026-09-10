import { spawn } from "node:child_process";

const services = [
  { name: "auth", directory: "services/auth", port: "6001" },
  { name: "resume", directory: "services/resume", port: "6002" },
  { name: "interview", directory: "services/interview", port: "6003" },
  { name: "roadmap", directory: "services/roadmap", port: "6004" },
  { name: "billing", directory: "services/billing", port: "6005" },
  { name: "gateway", directory: "gateway", port: process.env.PORT },
];

const children = services.map(({ name, directory, port }) => {
  const child = spawn("npm", ["start", "--prefix", directory], {
    env: { ...process.env, PORT: port },
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
