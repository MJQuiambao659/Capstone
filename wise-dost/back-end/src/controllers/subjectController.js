const db = require("../../config/database");

async function getSubjectData(req, res) {
  const query =
    "SELECT subject_id, subject_code, subject_name FROM subject_tbl";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data: " + err);
      res.status(500).json({ error: "Error fetching data" });
    } else {
      res.json(results);
    }
  });
}

async function addSubjectData(req, res) {
  const { subject_code, subject_name } = req.body;

  const sql =
    "INSERT INTO subject_tbl (subject_code, subject_name) VALUES (?,?)";
  db.query(sql, [subject_code, subject_name], (err, result) => {
    if (err) {
      console.error("Error adding subject: " + err);
      res.status(500).json({ error: "Error adding subject" });
    } else {
      const newSubjectId = result.insertId; // Use insertId to get the new ID
      res
        .status(201)
        .json({ subject_id: newSubjectId, subject_code, subject_name });
    }
  });
}

async function deleteSubjectData(req, res) {
  const subjectId = req.params.subjectId;

  const sql = "DELETE FROM subject_tbl WHERE subject_id =?";
  db.query(sql, [subjectId], (err, result) => {
    if (err) {
      console.error("Error deleting subject: " + err);
      res.status(500).json({ error: "Error deleting subject" });
    } else {
      res.status(200).json({ message: "Subject deleted successfully" });
    }
  });
}

async function editSubjectData(req, res) {
  const subjectId = req.params.subjectId;
  const { subject_code, subject_name } = req.body;

  const updateQuery =
    "UPDATE subject_tbl SET subject_code = ?, scholarship_name = ? WHERE scholarship_id = ?";

  db.query(
    updateQuery,
    [subject_code, subject_name, subjectId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error updating subject");
      } else {
        res.status(200).send("Subject updated successfully");
      }
    }
  );
}

module.exports = {
  getSubjectData,
  addSubjectData,
  deleteSubjectData,
  editSubjectData,
};
