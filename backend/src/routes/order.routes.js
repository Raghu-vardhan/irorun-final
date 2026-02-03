import express from "express";
import Order from "../models/Order.model.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// ✅ CREATE ORDER (FINAL)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const order = await Order.create({
      shopifyOrderId: req.body.shopifyOrderId,
      customerName: req.body.customerName,
      discountCode: req.body.discountCode,
      discountAmount: req.body.discountAmount,
      totalPrice: req.body.totalPrice,

      // 🔐 IMPORTANT: storeCode ALWAYS from JWT
      storeCode: req.user.storeCode,
    });

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: {
        _id: order._id,
        shopifyOrderId: order.shopifyOrderId,
        customerName: order.customerName,
        discountCode: order.discountCode,
        discountAmount: order.discountAmount,
        totalPrice: order.totalPrice,
        storeCode: order.storeCode,
        createdAt: order.createdAt,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Order already exists",
      });
    }

    console.error("Order save failed:", error);
    return res.status(500).json({
      success: false,
      message: "Order not saved",
    });
  }
});

export default router;
