console.log("🔥 app.js loaded");

import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import webhookRoutes from "./routes/webhook.routes.js"; // ✅ KEEP ONLY THIS

const app = express();

app.use(cors());
app.use(express.json());

console.log("✅ Registering /api/auth");
app.use("/api/auth", authRoutes);

console.log("✅ Registering /api/dashboard");
app.use("/api/dashboard", dashboardRoutes);

console.log("✅ Registering /api/webhooks");
app.use("/api/webhooks", webhookRoutes);

// 404 — MUST BE LAST
app.use((req, res) => {
  console.log("❌ 404 hit:", req.originalUrl);
  res.status(404).json({ message: "Route not found" });
});

export default app;
