const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");
const userRoleRouteController = require("../controllers/userRoleRouteController");

router.get("/role", verifyToken, userRoleRouteController.roleRoute)
router.get("/admin", verifyToken, userRoleRouteController.adminRoute);
router.get("/moderator", verifyToken, userRoleRouteController.moderatorRoute);
router.get("/user", verifyToken, userRoleRouteController.userRoute);

module.exports = router;
