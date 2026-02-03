import express from "express";
import Order from "../models/Order.model.js";
import Store from "../models/Store-model.js";

const router = express.Router();

router.post("/order-create", async (req, res) => {
  try {
    console.log("🔥 SHOPIFY WEBHOOK HIT");

    // 1️⃣ Get Shopify order payload
    const order = req.body;

    // 2️⃣ 🔑 FINAL DISCOUNT DETECTION LOGIC (ADD HERE)
    let discountCode = null;

    // Manual coupon entered at checkout
    if (order.discount_codes && order.discount_codes.length > 0) {
      discountCode = order.discount_codes[0].code.toUpperCase();
    }

    // COD / automatic / app discounts
    if (!discountCode && order.discount_applications?.length > 0) {
      discountCode =
        order.discount_applications[0]?.title?.toUpperCase() || null;
    }

    console.log("📦 Detected discount:", discountCode);

    // 3️⃣ Find store using mapping collection
    let storeCode = null;

    if (discountCode) {
      const store = await Store.findOne({
        coupons: discountCode,
        isActive: true,
      });

      if (store) {
        storeCode = store.storeCode;
      }
    }

    if (!storeCode) {
      console.log("❌ Store not identified for discount:", discountCode);
      return res.status(200).json({
        success: true,
        message: "Order received but store not identified",
      });
    }

    // 4️⃣ Save order
    const savedOrder = await Order.create({
      shopifyOrderId: order.id.toString(),
      customerName: `${order.customer?.first_name || ""} ${order.customer?.last_name || ""}`.trim(),
      discountCode: discountCode,
      discountAmount: Number(order.total_discounts || 0),
      totalPrice: Number(order.total_price),
      storeCode: storeCode,
      source: "shopify",
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
