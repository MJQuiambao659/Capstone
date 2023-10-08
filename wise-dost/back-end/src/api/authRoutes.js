const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../../config/database");
const { hashPassword, comparePasswords } = require("../utils/bcryptUtils");
require("dotenv").config();

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const results = await db.query("SELECT * FROM user_tbl WHERE email = ?", [
      email,
    ]);

    if (results.length === 0) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const user = results[0];
    const passwordMatch = await comparePasswords(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign(
        { userId: user.id, userType: user.user_type },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
    } else {
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router