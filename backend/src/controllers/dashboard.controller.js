import Order from "../models/Order.model.js";

// ✅ NAMED EXPORT
export const dashboardData = async (req, res) => {
  try {
    const storeCode = req.user.storeCode;

    const orders = await Order.find({ storeCode })
      .sort({ createdAt: -1 })
      .limit(50);

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce(
      (sum, o) => sum + (o.totalPrice || 0),
      0
    );
    const totalCouponAmount = orders.reduce(
      (sum, o) => sum + (o.discountAmount || 0),
      0
    );
    const totalCouponsUsed = orders.filter(
      (o) => o.discountCode
    ).length;

    res.json({
      stats: {
        totalOrders,
        totalRevenue,
        totalCouponsUsed,
        totalCouponAmount
      },
      orders
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ message: "Dashboard data error" });
  }
};
