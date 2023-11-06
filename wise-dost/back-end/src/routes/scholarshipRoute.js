const express = require("express");
const scholarshipController = require("../controllers/scholarshipsController");
const router = express.Router();

router.get("/data", scholarshipController.getScholarshipsData);
router.post("/add", scholarshipController.addScholarshipsData);
router.delete(
  "/delete/:scholarshipId",
  scholarshipController.deleteScholarshipData
);
router.put("/edit/:scholarshipId", scholarshipController.editScholarshipsData);

module.exports = router;
