import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: "store_owner"
    },
    storeCode: {
      type: String,
      required: true   // HYD, BLR, CHN
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
