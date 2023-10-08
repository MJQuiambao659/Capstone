const db = require("../../config/database");

const registerForm = (req, res, next) => {
  const { firstName, lastName, email, password, program, school, course } =
    req.body;

  // Form Validation
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !program ||
    !school ||
    !course
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Password Validation
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }

  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    return res.status(400).json({
      message: "Password must contain both lowercase and uppercase letters",
    });
  }

  // Email Verification
  const queryCheckEmail = "SELECT * FROM user_tbl WHERE email = ?";
  db.query(queryCheckEmail, [email], (err, result) => {
    if (err) {
      console.error("Error checking email:", err);
      return res.status(500).json({ message: "Error during registration" });
    }

    if (result.length > 0) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    next();
  });
};

module.exports = registerForm;
