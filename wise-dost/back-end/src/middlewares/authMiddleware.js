const jwt = require("jsonwebtoken");
const jwtKey = require("../../config/auth");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, jwtKey.secretKey, (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err);
      return res.status(401).json({ message: "Failed to authenticate token" });
    }
    req.user = decoded;
    console.log(req.user)
    next();
  });
};

module.exports = verifyToken;