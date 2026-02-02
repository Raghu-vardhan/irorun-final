import express from "express";
import auth from "../middleware/auth.middleware.js";
import { createTestOrder } from "../controllers/dev.controller.js";

const router = express.Router();

/**
 * DEV ONLY
 * POST /api/dev/test-order
 */
router.post("/test-order", auth, createTestOrder);

export default router;
