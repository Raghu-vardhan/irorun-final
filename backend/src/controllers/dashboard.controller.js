import Order from "../models/Order.model.js";

export const dashboardData = async (req, res) => {
  console.log("🔍 Backend fetch using storeCode:", req.user.storeCode);
  try {
    const storeCode = req.user.storeCode.toUpperCase().trim();

    const orders = await Order.find({ storeCode })
      .sort({ createdAt: -1 });

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce(
      (sum, o) => sum + (o.totalPrice || 0),
      0
    );

    res.json({
      stats: {
        totalOrders,
        totalRevenue,
      },
      orders
    });
  } catch (err) {
    res.status(500).json({ message: "Dashboard error" });
  }
};
