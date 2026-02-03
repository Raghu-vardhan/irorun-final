import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  console.log("🚨 PROTECT MIDDLEWARE HIT");
  console.log("URL:", req.originalUrl);
  console.log("AUTH HEADER:", req.headers.authorization);

  const authHeader = req.headers.authorization || "";

  if (!authHeader) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  let token = "";

  if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
    token = authHeader.slice(7).trim();
  } else if (typeof authHeader === "string") {
    token = authHeader.trim();
  }

  console.log("Raw token extracted:", token, "type:", typeof token);

  if (token === "[object Object]") {
    token = req.headers["x-access-token"] || req.headers["authorization-token"] || (req.cookies && req.cookies.token) || null;
    console.log("Recovered token from alt header/cookie:", token);
  }

  if (token && typeof token === "string" && (token.startsWith("{") || token.startsWith("["))) {
    try {
      const parsed = JSON.parse(token);
      token = parsed.token || parsed.accessToken || parsed.jwt || parsed;
      console.log("Token parsed from JSON:", token);
    } catch (e) {
      console.log("Token string is not valid JSON");
    }
  }

  if (!token || typeof token !== "string") {
    return res.status(401).json({ message: "Not authorized, invalid token format" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT verify error:", error && error.message ? error.message : error);
    return res.status(401).json({ message: "Token invalid" });
  }
};

export default protect;
