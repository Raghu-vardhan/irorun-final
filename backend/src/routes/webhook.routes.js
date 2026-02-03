import express from "express";

const router = express.Router();

router.post("/shopify/order-create", (req, res) => {
  console.log("🔥🔥 SHOPIFY WEBHOOK HIT 🔥🔥");

  // req.body is now a BUFFER
  const rawBody = req.body.toString("utf8");
  console.log("RAW BODY:", rawBody);

  res.status(200).send("OK");
});

export default router;
