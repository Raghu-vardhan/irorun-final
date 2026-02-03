import express from "express";
import Order from "../models/Order.model.js";
import Store from "../models/store.model.js";

const router = express.Router();

router.post("/order-create", async (req, res) => {
  try {
    console.log("🔥 SHOPIFY WEBHOOK HIT");

    // ✅ 1. Parse RAW Shopify payload
    if (!req.body || !Buffer.isBuffer(req.body)) {
      console.log("❌ Invalid webhook body");
      return res.status(400).send("Invalid payload");
    }

    const order = JSON.parse(req.body.toString("utf8"));

    /* ---------------- DISCOUNT DETECTION ---------------- */

    let discountCode = null;

    // Manual coupon at checkout
    if (order.discount_codes?.length > 0) {
      discountCode = order.discount_codes[0].code?.toUpperCase().trim();
    }

    // COD / automatic / app discounts
    if (!discountCode && order.discount_applications?.length > 0) {
      discountCode =
        order.discount_applications[0]?.title?.toUpperCase().trim() || null;
    }

    console.log("📦 Detected discountCode:", discountCode);

    /* ---------------- STORE LOOKUP ---------------- */

    let storeCode = null;

    if (discountCode) {
      console.log("🧠 Store model collection:", Store.collection.name);

      const store = await Store.findOne({
        coupons: { $in: [discountCode] },
      });

      if (store) {
        storeCode = store.storeCode.toUpperCase().trim();
        console.log("🏪 Store resolved:", storeCode);
      }
    }

    /* ---------------- FALLBACK (IMPORTANT) ---------------- */

    // 🚑 Prevent silent UI failure
    const finalStoreCode = storeCode || "UNASSIGNED";

    if (!storeCode) {
      console.log("⚠️ Store not identified. Marking order as UNASSIGNED");
    }

    /* ---------------- IDEMPOTENCY CHECK ---------------- */

    const existingOrder = await Order.findOne({
      shopifyOrderId: order.id.toString(),
    });

    if (existingOrder) {
      console.log("🔁 Duplicate webhook ignored:", order.id);
      return res.status(200).json({ success: true });
    }

    /* ---------------- SAVE ORDER ---------------- */

    const savedOrder = await Order.create({
      shopifyOrderId: order.id.toString(),
      customerName: `${order.customer?.first_name || ""} ${order.customer?.last_name || ""}`.trim(),
      discountCode,
      discountAmount: Number(order.total_discounts || 0),
      totalPrice: Number(order.total_price),
      storeCode: finalStoreCode,
      source: "shopify",
      orderCreatedAt: new Date(order.created_at),
    });

    console.log("✅ Shopify order saved:", savedOrder.shopifyOrderId);

    return res.status(201).json({
      success: true,
      message: "Shopify order saved",
      data: {
        shopifyOrderId: savedOrder.shopifyOrderId,
        storeCode: savedOrder.storeCode,
      },
    });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return res.status(500).json({
      success: false,
      message: "Webhook failed",
    });
  }
});

export default router;