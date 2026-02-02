import Order from "../models/Order.model.js";

// ✅ NAMED EXPORT
export const ordersCreate = async (req, res) => {
  try {
    const payload = JSON.parse(req.body.toString());

    const shopifyOrderId = payload.id.toString();

    // Prevent duplicate webhook inserts
    const exists = await Order.findOne({ shopifyOrderId });
    if (exists) {
      return res.status(200).send("Duplicate order ignored");
    }

    const customerName = payload.customer
      ? `${payload.customer.first_name || ""} ${payload.customer.last_name || ""}`.trim()
      : "";

    const discountCode = payload.discount_codes?.[0]?.code || null;
    const discountAmount = Number(payload.discount_codes?.[0]?.amount || 0);
    const totalPrice = Number(payload.total_price);

    // Example: HYD15 → HYD
    const storeCode = discountCode ? discountCode.slice(0, 3) : null;

    await Order.create({
      shopifyOrderId,
      customerName,
      discountCode,
      discountAmount,
      totalPrice,
      storeCode
    });

    res.status(200).send("Webhook processed");
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).send("Webhook failed");
  }
};
