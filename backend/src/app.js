console.log("🔥 app.js loaded");

import express from "express";
import cors from "cors";
import router from "./routes/auth.routes.js";
import authRoutes from "./routes/auth.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import webhookRoutes from "./routes/webhook.routes.js";
import orderRoutes from "./routes/Orderroutes.js";

const app = express();

app.use(cors());

// ✅ Webhooks MUST come BEFORE express.json
app.use(
  "/api/webhooks",
  express.raw({ type: "application/json" }),
  webhookRoutes
);

// ❗ JSON middleware AFTER webhooks
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/orders", orderRoutes);

// 404 — MUST BE LAST

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

app.use((req, res) => {
  console.log("❌ 404 hit:", req.originalUrl);
  res.status(404).json({ message: "Route not found" });
});


export default app;
