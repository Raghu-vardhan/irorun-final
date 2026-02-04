import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // Shopify identifiers
    shopifyOrderId: {
      type: String,
      required: true,
      unique: true
    },
    orderNumber: {
      type: Number
    },

    // Customer info
    customerEmail: {
      type: String,
      lowercase: true
    },
    customerName: {
      type: String
    },

    // Coupon info
    discountCode: {
      type: String,
      index: true
    },
    discountAmount: {
      type: Number,
      default: 0
    },

    // Order totals
    totalPrice: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: "INR"
    },
     storeCode: {
      type: String,
      index: true
    },
    // Shopify timestamps
    orderCreatedAt: {
      type: Date
    },

    // Meta
    source: {
      type: String,
      default: "shopify"
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
