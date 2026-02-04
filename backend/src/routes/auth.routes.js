import express from "express";
import { adminLogin, registerStoreOwner, login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/admin/login", adminLogin);
router.post("/register-store-owner", registerStoreOwner);
router.post("/login", login);

export default router;
