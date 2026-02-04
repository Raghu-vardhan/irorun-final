console.log("🔥 app.js loaded");

import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import webhookRoutes from "./routes/webhook.routes.js";
import orderRoutes from "./routes/order.routes.js";

const app = express();

// ✅ CORS (only once)
app.use(cors({
  origin: "*", // or "https://irorun-management.netlify.app"
  credentials: true,
}));

// ✅ Webhooks MUST come BEFORE express.json
app.use(
  "/api/webhooks",
  express.raw({ type: "application/json" }),
  webhookRoutes
);

// ❗ JSON middleware AFTER webhooks
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/orders", orderRoutes);

// ✅ Health check
app.get("/", (req, res) => {
  res.status(200).json({
    message: "🚀 IroRun Backend API is running",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    db: "connected",
    time: new Date(),
  });
});

// ❌ 404 — MUST BE LAST
app.use((req, res) => {
  console.log("❌ 404 hit:", req.originalUrl);
  res.status(404).json({ message: "Route not found" });
});

export default app;
