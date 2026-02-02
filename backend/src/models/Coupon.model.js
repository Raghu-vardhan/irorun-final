import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true
    },

    totalOrders: {
      type: Number,
      default: 0
    },

    totalRevenue: {
      type: Number,
      default: 0
    },

    totalDiscount: {
      type: Number,
      default: 0
    },

    uniqueCustomers: {
      type: Number,
      default: 0
    },

    lastUsedAt: {
      type: Date
    }
  },
  { timestamps: true }
);

const Coupon = mongoose.model("Coupon", couponSchema);
export default Coupon;
