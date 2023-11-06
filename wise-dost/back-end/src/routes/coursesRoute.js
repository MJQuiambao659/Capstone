const express = require("express");
const courseController = require("../controllers/courseController");
const router = express.Router();

router.get("/data", courseController.getCourseData);
router.post("/add", courseController.addCourseData);
router.delete("/delete/:courseId", courseController.deleteCourseData);
router.put("/edit/:courseId", courseController.editCourseData);

module.exports = router;
