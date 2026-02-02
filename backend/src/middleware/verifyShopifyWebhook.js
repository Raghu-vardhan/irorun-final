import crypto from "crypto";

const verifyShopifyWebhook = (req, res, next) => {
  const hmacHeader = req.headers["x-shopify-hmac-sha256"];
  const rawBody = req.body;

  const generatedHmac = crypto
    .createHmac("sha256", process.env.SHOPIFY_WEBHOOK_SECRET)
    .update(rawBody, "utf8")
    .digest("base64");

  if (generatedHmac !== hmacHeader) {
    return res.status(401).json({ message: "Invalid webhook signature" });
  }

  next();
};

export default verifyShopifyWebhook;
