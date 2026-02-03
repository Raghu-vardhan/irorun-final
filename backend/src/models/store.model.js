import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    storeCode: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    storeName: String,
    coupons: [
      {
        type: String,
        uppercase: true,
        trim: true,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: "stores", // 🔥 FORCE EXACT COLLECTION
    timestamps: true,
  }
);

export default mongoose.model("Store", storeSchema);
