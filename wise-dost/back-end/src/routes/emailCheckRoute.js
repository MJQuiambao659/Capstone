const express = require("express");
const router = express.Router();
const db = require("../../config/database");
const emailValidation = require('../middlewares/emailValidation')
const mysql = require("mysql");

router.post("/email-validation", (req,res) =>  {
  const { email } = req.body;
  const query = "SELECT * FROM user_tbl WHERE email = ?";

  db.query(query, [email], (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      res.status(500).json({ message: "Database error" });
    } else {
      if (result.length > 0) {
        res.status(200).json({ exists: true });
      } else {
        res.status(200).json({ exists: false })
      }
    }
  });
}
);

module.exports = router;