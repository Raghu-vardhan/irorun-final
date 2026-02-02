import Order from "../models/Order.model.js";

export const createTestOrder = async (req, res) => {
  try {
    const { storeCode } = req.user;

    // Fake data (like Shopify)
    const fakeOrder = {
      shopifyOrderId: "TEST-" + Date.now(),
      customerName: "Test Customer",
      discountCode: storeCode + "15",     // HYD15 / BLR15
      discountAmount: 150,
      totalPrice: 1000,
      storeCode
    };

    const order = await Order.create(fakeOrder);

    res.status(201).json({
      message: "Test order created",
      order
    });
  } catch (error) {
    res.status(500).json({ message: "Test order failed" });
  }
};
