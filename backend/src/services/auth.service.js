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
    expiresIn: "7d"
  });
};

/* ---------------- SERVICES ---------------- */

// REGISTER USER
export const registerUser = async ({ email, password, storeCode }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    email,
    password: hashedPassword,
    storeCode
  });

  return {
    id: user._id,
    email: user.email,
    storeCode: user.storeCode
  };
};

// LOGIN USER
export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken({
    id: user._id,
    email: user.email,
    role: user.role,
    storeCode: user.storeCode
  });

  return token;
};
