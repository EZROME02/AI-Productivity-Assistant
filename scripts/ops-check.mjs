// Operational health check for the AI project.
import { request } from "node:http";

const port = Number(process.env.OPS_PORT || 4173);
const path = process.env.OPS_CHECK_PATH || "/";
const timeoutMs = 5000;

const req = request(
  { hostname: "127.0.0.1", port, path, method: "GET", timeout: timeoutMs },
  (res) => {
    const ok = res.statusCode >= 200 && res.statusCode < 400;
    console.log(
      JSON.stringify({ ok, url: `http://127.0.0.1:${port}${path}`, status: res.statusCode }),
    );
    res.resume();
    res.on("end", () => process.exit(ok ? 0 : 1));
  },
);

req.on("timeout", () => req.destroy(new Error("health check timed out")));
req.on("error", (error) => {
  console.error(
    JSON.stringify({ ok: false, url: `http://127.0.0.1:${port}${path}`, error: error.message }),
  );
  process.exit(1);
});
req.end();
