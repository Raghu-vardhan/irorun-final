import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    storeCode: {
      type: String, // "BNG", "HYD"
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    storeName: {
      type: String,
      required: true,
    },
    coupons: [
      {
        type: String, // "BNG10", "BNG15"
        uppercase: true,
        trim: true,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Store", storeSchema);
