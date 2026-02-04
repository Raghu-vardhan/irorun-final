import express from "express";
import {protect} from "../middleware/auth.middleware.js";
import { dashboardData } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/", protect, dashboardData);

export default router;
