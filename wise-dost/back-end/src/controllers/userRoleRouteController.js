const verifyToken = require("../middlewares/authMiddleware");

const adminRoute = (req, res) => {
  if (req.user.role === "Admin") {
    res.json({ message: "Admin access granted" });
  } else {
    res.status(403).json({ message: "Access denied" });
  }
};

const moderatorRoute = (req, res) => {
  if (req.user.role === "Moderator") {
    res.json({ message: "Moderator access granted" });
  } else {
    res.status(403).json({ message: "Access denied" });
  }
};

const userRoute = (req, res) => {
  if (req.user.role === "User") {
    res.json({ message: "User access granted" });
  } else {
    res.status(403).json({ message: "Access denied" });
  }
};

const roleRoute = (req, res) => {
  const userRole = req.user.role;
  const userId = req.user.id;
  const expiresIn = req.user.exp;

  res.json({ id: userId, role: userRole, expiresIn: expiresIn });
};
module.exports = { adminRoute, moderatorRoute, userRoute, roleRoute };
