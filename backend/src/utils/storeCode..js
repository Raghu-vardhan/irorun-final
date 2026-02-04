const STORE_CODES = users
  .filter(u => u.storeCode)
  .map(u => u.storeCode.toUpperCase()); ;

export function getStoreCodeFromDiscount(discountCode) {
  if (!discountCode || typeof discountCode !== "string") {
    return null;
  }

  const code = discountCode.trim().toUpperCase();

  const matched = STORE_CODES.find(prefix => code.startsWith(prefix));

  return matched || null;
}
