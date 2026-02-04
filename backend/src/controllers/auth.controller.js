import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// 👑 Admin Login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Admin only" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, storeCode: user.storeCode },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        storeCode: user.storeCode
      }
    });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
};

// 🏪 Create Store Owner (Admin Access Code Required)
export const registerStoreOwner = async (req, res) => {
  try {
    const { email, password, adminAccessCode, storeCode } = req.body;

    if (adminAccessCode !== process.env.ADMIN_ACCESS_CODE) {
      return res.status(403).json({ message: "Invalid admin access code" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashed,
      role: "store_owner",
      storeCode: storeCode?.toUpperCase() || null
    });

    res.json({ message: "Store owner created", userId: user._id });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Register failed" });
  }
};

// 🔑 Store Owner Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role, storeCode: user.storeCode },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        storeCode: user.storeCode
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
};


export const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      email,
      password: hashedPassword,
      role: "admin"
    });

    res.json({ message: "Admin created successfully", admin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating admin" });
  }
};

// fetch users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json({ total: users.length, users });
  } catch (err) {
    console.error("Get users error:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const getStoreCodes = async (req, res) => {
  try {
    const stores = await User.find(
      { role: "store_owner", storeCode: { $exists: true, $ne: "" } },
      { storeCode: 1, _id: 0 }
    );

    const codes = [...new Set(stores.map(s => s.storeCode.toUpperCase()))];

    res.json({ codes });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch store codes" });
  }
};