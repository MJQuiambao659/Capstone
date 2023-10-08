const mysql = require("mysql");
const db = require("../../config/database");

const emailValidation = (req, res, next) => {
  const { email } = req.body;
  const query = "SELECT * FROM user_tbl WHERE email = ?";
  console.log(email)

  db.query(query, [email], (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      res.status(500).json({ message: "Database error" });
    } else {
      if (result.length > 0) {
        res.status(200).json({ exists: true });
      } else {
        req.emailExists = false;
        next();
      }
    }
  });
};

module.exports = emailValidation;
