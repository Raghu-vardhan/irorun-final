import express from "express";
import bodyParser from "body-parser";
import verifyShopifyWebhook from "../middleware/verifyShopifyWebhook.js";
import { ordersCreate } from "../controllers/webhook.controller.js";

const router = express.Router();

router.post(
  "/orders-create",
  bodyParser.raw({ type: "application/json" }),
  verifyShopifyWebhook,
  ordersCreate
);

export default router;
