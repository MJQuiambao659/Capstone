const express = require("express");
const subjectController = require("../controllers/subjectController");
const router = express.Router();

router.get("/data", subjectController.getSubjectData);
router.post("/add", subjectController.addSubjectData);
router.delete("/delete/:subjectId", subjectController.deleteSubjectData);
router.put("/edit/:subjectId", subjectController.editSubjectData);

module.exports = router;
