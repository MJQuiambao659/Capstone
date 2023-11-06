const db = require("../../config/database");

async function getSchoolData(req, res) {
  const query = "SELECT school_id, school_code, school_name FROM school_tbl";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data: " + err);
      res.status(500).json({ error: "Error fetching data" });
    } else {
      res.json(results);
    }
  });
}

async function addSchoolData(req, res) {
  const { school_code, school_name } = req.body;

  const sql = "INSERT INTO school_tbl (school_code, school_name) VALUES (?,?)";
  db.query(sql, [school_code, school_name], (err, result) => {
    if (err) {
      console.error("Error adding school: " + err);
      res.status(500).json({ error: "Error adding school" });
    } else {
      const newSchoolId = result.insertId; // Use insertId to get the new ID
      res
        .status(201)
        .json({ school_id: newSchoolId, school_code, school_name });
    }
  });
}

async function deleteSchoolData(req, res) {
  const schoolId = req.params.schoolId;

  const sql = "DELETE FROM school_tbl WHERE school_id =?";
  db.query(sql, [schoolId], (err, result) => {
    if (err) {
      console.error("Error deleting school: " + err);
      res.status(500).json({ error: "Error deleting school" });
    } else {
      res.status(200).json({ message: "School deleted successfully" });
    }
  });
}

async function editSchoolData(req, res) {
  const schoolId = req.params.schoolId;
  const { school_code, school_name } = req.body;

  const updateQuery =
    "UPDATE school_tbl SET school_code = ?, scholarship_name = ? WHERE scholarship_id = ?";

  db.query(updateQuery, [school_code, school_name, schoolId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error updating school");
    } else {
      res.status(200).send("School updated successfully");
    }
  });
}

module.exports = {
  getSchoolData,
  addSchoolData,
  deleteSchoolData,
  editSchoolData,
};
