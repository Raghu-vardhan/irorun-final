const STORE_CODES = ["HYD", "BLR", "CHE", "DEL", "MUM"];

export function getStoreCodeFromDiscount(discountCode) {
  if (!discountCode || typeof discountCode !== "string") {
    return null;
  }

  const code = discountCode.trim().toUpperCase();

  const matched = STORE_CODES.find(prefix => code.startsWith(prefix));

  return matched || null;
}
