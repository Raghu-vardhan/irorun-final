import express from "express";
import Order from "../models/Order.model.js";
import Store from "../models/Store-model.js";

const router = express.Router();

router.post("/order-create", async (req, res) => {
  try {
    const order = req.body;

    const discountCode =
      order.discount_codes?.[0]?.code?.toUpperCase() || null;

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
      return res.status(400).json({
        success: false,
        message: "Store not identified from coupon",
      });
    }

    const savedOrder = await Order.create({
      shopifyOrderId: order.id.toString(),
      customerName: `${order.customer?.first_name || ""} ${order.customer?.last_name || ""}`.trim(),
      discountCode: discountCode,
      discountAmount: Number(order.total_discounts || 0),
      totalPrice: Number(order.total_price),
      storeCode: storeCode,
      source: "shopify",
    });

    return res.status(201).json({
      success: true,
      message: "Shopify order saved",
      data: {
        shopifyOrderId: savedOrder.shopifyOrderId,
        storeCode: savedOrder.storeCode,
      },
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(500).json({
      success: false,
      message: "Webhook failed",
    });
  }
});

export default router;
