import Order from "../models/Order.model.js";

export const dashboardData = async (req, res) => {
  try {
    let filter = {};

    // Store owner → only their store
    if (req.user.role === "store_owner") {
      filter.storeCode = req.user.storeCode;
    }
    // Admin → no filter = all stores

    const orders = await Order.find(filter).sort({ createdAt: -1 });

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((s, o) => s + (o.totalPrice || 0), 0);
    const couponRevenue = orders.reduce((s, o) => s + (o.discountAmount || 0), 0);

    res.json({
      stats: { totalOrders, totalRevenue, couponRevenue },
      orders
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ message: "Dashboard error" });
  }
};
