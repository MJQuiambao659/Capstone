const express = require("express");
const schoolController = require("../controllers/schoolController");
const router = express.Router();

router.get("/data", schoolController.getSchoolData);
router.post("/add", schoolController.addSchoolData);
router.delete("/delete/:schoolId", schoolController.deleteSchoolData);
router.put("/edit/:schoolId", schoolController.editSchoolData);

module.exports = router;
