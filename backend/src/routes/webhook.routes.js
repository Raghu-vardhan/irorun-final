import express from "express";

const router = express.Router();

router.post("/shopify/order-create", (req, res) => {
  console.log("🔥🔥 SHOPIFY WEBHOOK HIT 🔥🔥");
  console.log("BODY:", req.body);

  res.status(200).json({ success: true });
});

export default router;
