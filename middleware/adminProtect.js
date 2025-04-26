const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const protectAdmin = async (req, res, next) => {
  if (!req.headers.authorization?.startsWith("Bearer")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await Admin.findById(decoded.id).select("-password");
    if (!req.user) return res.status(401).json({ message: "Admin not found" });

    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

module.exports = { protectAdmin };
