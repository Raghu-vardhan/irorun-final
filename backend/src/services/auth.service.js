import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* ---------------- HELPERS ---------------- */

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

/* ---------------- SERVICES ---------------- */

// REGISTER USER
export const registerUser = async ({ email, password, storeCode }) => {
  if (!email || !password || !storeCode) {
    throw new Error("Email, password and storeCode are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // ✅ Normalize storeCode (CRITICAL FIX)
  const normalizedStoreCode = storeCode.toUpperCase().trim();

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    email,
    password: hashedPassword,
    storeCode: normalizedStoreCode,
  });

  return {
    id: user._id,
    email: user.email,
    storeCode: user.storeCode,
  };
};

// LOGIN USER
export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

 const normalizedEmail = email.toLowerCase().trim();
const user = await User.findOne({ email: normalizedEmail });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  // ✅ Normalize storeCode again (IMPORTANT FOR OLD USERS)
  const normalizedStoreCode = user.storeCode.toUpperCase().trim();

  const token = generateToken({
    id: user._id,
    email: user.email,
    role: user.role || "store",
    storeCode: normalizedStoreCode,
  });

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      storeCode: normalizedStoreCode,
    },
  };
};
