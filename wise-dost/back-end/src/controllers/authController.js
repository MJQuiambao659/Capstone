const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../config/database");
const jwtKey = require("../../config/auth");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const sql = "SELECT * FROM user_tbl WHERE username = ?";
    db.query(sql, [email], async (error, results) => {
      if (error || results.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const user = results[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const tokenExpiration = "30d";
      const token = jwt.sign(
        { id: user.user_id, role: user.role_type },
        jwtKey.secretKey,
        { expiresIn: tokenExpiration }
      );
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { login }