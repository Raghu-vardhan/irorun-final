import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "store_owner"],
      default: "store_owner",
      index: true,
    },

    storeCode: {
      type: String,
      required: function () {
        return this.role === "store_owner";
      },
      uppercase: true,
      trim: true,
      minlength: 2,
      maxlength: 10,
      unique: true, // each store code must be unique
      index: true,
    },

    // Optional future fields (you can add later)
    storeName: {
      type: String,
      trim: true,
      default: "",
    },

    mobile: {
      type: String,
      trim: true,
      default: "",
    },

    address: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
