import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    shopifyOrderId: {
      type: String,
      required: true,
      unique: true, // prevents duplicate orders
      index: true,
    },

    customerName: {
      type: String,
      default: "",
      trim: true,
    },

    discountCode: {
      type: String,
      default: null,
      uppercase: true,
      trim: true,
    },

    discountAmount: {
      type: Number,
      default: 0,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    storeCode: {
      type: String,
      required: true, // even if "UNASSIGNED"
      uppercase: true,
      trim: true,
      index: true,
    },

    source: {
      type: String,
      default: "shopify",
    },

    orderCreatedAt: {
      type: Date,
      default: Date.now, // fallback if not provided
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

export default mongoose.model("Order", orderSchema);
