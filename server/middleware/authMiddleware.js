import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protect = async (req, res, next) => {
  let token;

  console.log("AUTH HEADER:", req.headers.authorization);
  console.log("JWT SECRET:", process.env.JWT_SECRET);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("TOKEN RECEIVED:", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("DECODED TOKEN:", decoded);

      req.user = await User.findById(decoded.id).select("-password");
      console.log("USER FOUND:", req.user);

      next();
    } catch (error) {
      console.error("JWT VERIFY ERROR:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};
