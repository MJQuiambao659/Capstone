const db = require("../../config/database");

async function getProgramsData(req, res) {
  const query = "SELECT program_id, program_name FROM program_tbl";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data: " + err);
      res.status(500).json({ error: "Error fetching data" });
    } else {
      res.json(results);
    }
  });
}

async function addProgramsData(req, res) {
  const { program_name } = req.body;

  const sql = "INSERT INTO program_tbl (program_name) VALUES (?)";
  db.query(sql, [program_name], (err, result) => {
    if (err) {
      console.error("Error adding scholarship: " + err);
      res.status(500).json({ error: "Error adding scholarship" });
    } else {
      const newProgramId = result.insertId; // Use insertId to get the new ID
      res
        .status(201)
        .json({ program_id: newProgramId, program_name });
    }
  });
}

async function deleteProgramsData(req, res) {
  const programId = req.params.programId;

  const sql = "DELETE FROM program_tbl WHERE program_id =?";
  db.query(sql, [programId], (err, result) => {
    if (err) {
      console.error("Error deleting scholarship: " + err);
      res.status(500).json({ error: "Error deleting scholarship" });
    } else {
      res.status(200).json({ message: "Scholarship deleted successfully" });
    }
  });
}

async function editProgramsData(req, res) {
  const programId = req.params.programId;
  const { program_name } = req.body;

  const updateQuery =
    "UPDATE program_tbl SET program_name = ? WHERE program_id = ?";

  db.query(updateQuery, [program_name, programId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error updating scholarship");
    } else {
      res.status(200).send("Scholarship updated successfully");
    }
  });
}

module.exports = {
  getProgramsData,
  addProgramsData,
  deleteProgramsData,
  editProgramsData,
};
