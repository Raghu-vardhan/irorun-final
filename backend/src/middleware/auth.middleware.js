import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  console.log("🚨 PROTECT MIDDLEWARE HIT");
  console.log("URL:", req.originalUrl);
  console.log("AUTH HEADER:", req.headers.authorization);

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalid" });
  }
};

export default protect;
