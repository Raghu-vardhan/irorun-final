import express from "express";
import auth from "../middleware/auth.middleware.js";
import { dashboardData } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/", auth, dashboardData);

export default router;
