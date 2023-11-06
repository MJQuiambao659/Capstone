const express = require("express");
const programController = require("../controllers/programController");
const router = express.Router();

router.get("/data", programController.getProgramsData);
router.post("/add", programController.addProgramsData);
router.delete(
  "/delete/:programId",
  programController.deleteProgramsData
);
router.put("/edit/:programId", programController.editProgramsData);

module.exports = router;
