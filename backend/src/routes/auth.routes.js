import express from "express";
import { adminLogin, registerStoreOwner, login, registerAdmin, getAllUsers,getStoreCodes } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/admin.middleware.js";

const router = express.Router();

router.post("/admin/login", adminLogin);
router.post("/admin/register", registerAdmin);
router.post("/register-store-owner", registerStoreOwner);
router.post("/login", login);

// ✅ Admin users list
router.get("/admin/users", protect, adminOnly, getAllUsers);
// routes/auth.routes.js (or admin routes)
router.get("/admin/store-codes", protect, adminOnly, getStoreCodes);


export default router;
