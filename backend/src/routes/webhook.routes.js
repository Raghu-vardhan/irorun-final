import express from "express";
import Order from "../models/Order.model.js";
import User from "../models/user.model.js"; // ✅ Correct model

const router = express.Router();

router.post("/order-create", async (req, res) => {
  try {
    console.log("🔥 SHOPIFY WEBHOOK HIT");

    const order = JSON.parse(req.body.toString("utf8"));

    /* ---------------- DISCOUNT DETECTION ---------------- */

    let discountCode = null;

    if (order.discount_codes?.length > 0) {
      discountCode = order.discount_codes[0].code?.toUpperCase().trim();
    }

    if (!discountCode && order.discount_applications?.length > 0) {
      discountCode =
        order.discount_applications[0]?.title?.toUpperCase().trim() || null;
    }

    console.log("📦 Detected discountCode:", discountCode);

    /* ---------------- EXTRACT STORE CODE ---------------- */
    // Example: FITNESS15 -> FITNESS
    let storeCode = null;

    if (discountCode) {
      // take letters from start until number
      const match = discountCode.match(/^[A-Z]+/);
      if (match) {
        storeCode = match[0];
      }
    }

    console.log("🏷️ Extracted storeCode:", storeCode);

    /* ---------------- USER LOOKUP ---------------- */

    let finalStoreCode = "UNASSIGNED";

    if (storeCode) {
      const user = await User.findOne({ storeCode });

      if (user) {
        finalStoreCode = user.storeCode;
        console.log("👤 Store owner found for:", finalStoreCode);
      } else {
        console.log("❌ No user found with storeCode:", storeCode);
      }
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
