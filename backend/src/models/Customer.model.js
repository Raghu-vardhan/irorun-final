import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
    },

    name: {
      type: String
    },

    totalOrders: {
      type: Number,
      default: 0
    },

    totalSpent: {
      type: Number,
      default: 0
    },

    usedCoupons: [
      {
        type: String
      }
    ]
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
