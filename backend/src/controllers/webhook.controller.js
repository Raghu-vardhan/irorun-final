import Order from "../models/Order.model.js";
import { getStoreCodeFromDiscount } from "../utils/storeCode.js";

// ✅ NAMED EXPORT
export const ordersCreate = async (req, res) => {
  try {
    // If you are using express.raw for webhooks
    const payload = JSON.parse(req.body.toString());

    const shopifyOrderId = payload.id.toString();

    // ✅ Prevent duplicate webhook inserts
    const exists = await Order.findOne({ shopifyOrderId });
    if (exists) {
      return res.status(200).send("Duplicate order ignored");
    }

    const customerName = payload.customer
      ? `${payload.customer.first_name || ""} ${payload.customer.last_name || ""}`.trim()
      : "";

    const discountCode = payload.discount_codes?.[0]?.code || null;
    const discountAmount = Number(payload.discount_codes?.[0]?.amount || 0);
    const totalPrice = Number(payload.total_price || 0);

    // ✅ Use helper to detect store code safely
    const storeCode = getStoreCodeFromDiscount(discountCode);

    console.log("🧪 Discount:", discountCode, "=> Store:", storeCode);

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

console.log(getStoreCodeFromDiscount("HYD15"));      // HYD
console.log(getStoreCodeFromDiscount("blr_offer")); // BLR
console.log(getStoreCodeFromDiscount("XYZ10"));     // null
