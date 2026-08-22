// Starts the production preview and confirms it is reachable.
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const port = process.env.OPS_PORT || "4173";
const server = spawn("npm", ["run", "dev", "--", "--host", "127.0.0.1", "--port", port], {
  stdio: "inherit",
  env: { ...process.env, OPS_PORT: port },
});

const stop = () => {
  if (!server.killed) server.kill("SIGTERM");
};
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
server.on("exit", (code, signal) => process.exit(code ?? (signal ? 1 : 0)));

await delay(1500);
const health = spawn(process.execPath, ["scripts/ops-check.mjs"], {
  stdio: "inherit",
  env: { ...process.env, OPS_PORT: port },
});
health.on("exit", (code) => {
  if (code !== 0) {
    stop();
    process.exit(code ?? 1);
  }
  console.log(`Operational preview is running at http://127.0.0.1:${port}`);
});
