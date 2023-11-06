const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../config/database");
const jwtKey = require("../../config/auth");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    if (!password) {
      return res.status(401).json({ message: "Password is required" });
    }

    const sql = "SELECT * FROM user_tbl WHERE email = ?";
    db.query(sql, [email], async (error, results) => {
      if (error || results.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const user = results[0];
      if (!password) {
        return res.status(401).json({ message: "Password is required" });
      }

      const passwordMatch = await new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });

      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const tokenExpiration = "30d";
      const token = jwt.sign(
        { id: user.user_id, role: user.role_type },
        jwtKey.secretKey,
        { expiresIn: tokenExpiration }
      );
      res.status(200).json({ token });
      console.log(token)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { login };
