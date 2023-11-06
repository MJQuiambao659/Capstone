const db = require("../../config/database");

async function getCourseData(req, res) {
  const query = "SELECT course_id, course_code, course_name FROM course_tbl";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data: " + err);
      res.status(500).json({ error: "Error fetching data" });
    } else {
      res.json(results);
    }
  });
}

async function addCourseData(req, res) {
  const { course_code, course_name } = req.body;

  const sql = "INSERT INTO course_tbl (course_code, course_name) VALUES (?,?)";
  db.query(sql, [course_code, course_name], (err, result) => {
    if (err) {
      console.error("Error adding course: " + err);
      res.status(500).json({ error: "Error adding course" });
    } else {
      const newCourseId = result.insertId; // Use insertId to get the new ID
      res
        .status(201)
        .json({ course_id: newCourseId, course_code, course_name });
    }
  });
}

async function deleteCourseData(req, res) {
  const courseId = req.params.courseId;

  const sql = "DELETE FROM course_tbl WHERE course_id =?";
  db.query(sql, [courseId], (err, result) => {
    if (err) {
      console.error("Error deleting course: " + err);
      res.status(500).json({ error: "Error deleting course" });
    } else {
      res.status(200).json({ message: "Course deleted successfully" });
    }
  });
}

async function editCourseData(req, res) {
  const courseId = req.params.courseId;
  const { course_code, course_name } = req.body;

  const updateQuery =
    "UPDATE course_tbl SET course_code = ?, scholarship_name = ? WHERE scholarship_id = ?";

  db.query(updateQuery, [course_code, course_name, courseId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error updating course");
    } else {
      res.status(200).send("Course updated successfully");
    }
  });
}

module.exports = {
  getCourseData,
  addCourseData,
  deleteCourseData,
  editCourseData,
};
