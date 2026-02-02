import express from "express";
const router = express.Router();

router.post("/shopify/order-create", express.json({ type: '*/*' }), (req, res) => {
  const order = req.body;

  console.log("🔥 Shopify Order Webhook Received");
  console.log("Order ID:", order.id);
  console.log("Customer:", order.customer?.email);

  // TODO: Save to DB / send email / analytics

  res.status(200).send("Webhook received");
});

export default router;
