import Order from "../models/Order.model.js";
import User from "../models/user.model.js"; // ✅ use users collection

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

    // ✅ NEW: detect store from USERS collection
    let storeCode = null;
    let storeOwner = null;

    if (discountCode) {
      // Extract letters only: FIT15 -> FIT, HYD20 -> HYD
      const prefix = discountCode.replace(/[0-9]/g, "").toUpperCase();

      console.log("🧠 Looking for user with storeCode:", prefix);

      const user = await User.findOne({
        role: "store_owner",
        storeCode: prefix,
      });

      if (user) {
        storeCode = user.storeCode;
        storeOwner = user._id; // optional but recommended
      }
    }

    console.log("🧪 Discount:", discountCode, "=> Store:", storeCode);

    if (!storeCode) {
      return res.status(200).json({
        success: true,
        message: "Order received but store not identified",
      });
    }

    await Order.create({
      shopifyOrderId,
      customerName,
      discountCode,
      discountAmount,
      totalPrice,
      storeCode,
      storeOwner, // ✅ link order to user
    });

    res.status(200).send("Webhook processed");
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).send("Webhook failed");
  }
};
