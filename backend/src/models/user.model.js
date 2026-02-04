import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["admin", "store_owner"],
      default: "store_owner"
    },

    // null for admin, "HYD" / "BLR" for store owners
    storeCode: {
      type: String,
      uppercase: true,
      trim: true,
      default: null
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
