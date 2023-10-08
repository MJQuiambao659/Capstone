const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../../config/database");
const registerForm = require("../middlewares/registerForm");
// Get for registration checking of email

// Post for registration form submission
router.post("/register", registerForm, async (req, res) => {
  try {
    const { firstName, lastName, email, password, program, school, course } =
    req.body;

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const query =
      "INSERT INTO user_tbl (first_name, last_name, email, password, program, school, course) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(
      query,
      [firstName, lastName, email, hashedPassword, program, school, course],
      (err, result) => {
        if (err) {
          console.error("Error during registration:", err);
          res.status(500).json({ message: "Registration failed" });
        } else {
          res.status(201).json({ message: "Registration successful" });
        }
      }
    );
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

module.exports = router;
