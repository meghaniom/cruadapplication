const jwt = require("jsonwebtoken");
const User = require("../modules/usermodel");
const tokenBlacklist = require("../controllers/tokenBlacklist");

const JWT_SECRET = "ommeghani";

const authMiddleWare = async (req, res, next) => { 
 
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  const token = authHeader.split(" ")[1];
   if (tokenBlacklist.has(token)) {
    return res.status(403).json({ message: "Token is blacklisted. Please login again." });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id || decoded._id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }
    req.user = user; 
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  } 
};
module.exports = authMiddleWare;