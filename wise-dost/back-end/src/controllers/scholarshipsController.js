const db = require("../../config/database");

async function getScholarshipsData(req, res) {
  const query = "SELECT scholarship_id, scholarship_name FROM scholarship_tbl";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data: " + err);
      res.status(500).json({ error: "Error fetching data" });
    } else {
      res.json(results);
    }
  });
}

async function addScholarshipsData(req, res) {
  const { scholarship_name } = req.body;

  const sql = "INSERT INTO scholarship_tbl (scholarship_name) VALUES (?)";
  db.query(sql, [scholarship_name], (err, result) => {
    if (err) {
      console.error("Error adding scholarship: " + err);
      res.status(500).json({ error: "Error adding scholarship" });
    } else {
      const newScholarshipId = result.insertId; // Use insertId to get the new ID
      res
        .status(201)
        .json({ scholarship_id: newScholarshipId, scholarship_name });
    }
  });
}

async function deleteScholarshipData(req, res) {
  const scholarshipId = req.params.scholarshipId;

  const sql = "DELETE FROM scholarship_tbl WHERE scholarship_id =?";
  db.query(sql, [scholarshipId], (err, result) => {
    if (err) {
      console.error("Error deleting scholarship: " + err);
      res.status(500).json({ error: "Error deleting scholarship" });
    } else {
      res.status(200).json({ message: "Scholarship deleted successfully" });
    }
  });
}

async function editScholarshipsData(req, res) {
  const scholarshipId = req.params.scholarshipId;
  const { scholarship_name } = req.body;

  const updateQuery =
    "UPDATE scholarship_tbl SET scholarship_name = ? WHERE scholarship_id = ?";

  db.query(updateQuery, [scholarship_name, scholarshipId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error updating scholarship");
    } else {
      res.status(200).send("Scholarship updated successfully");
    }
  });
}

module.exports = {
  getScholarshipsData,
  addScholarshipsData,
  deleteScholarshipData,
  editScholarshipsData,
};
