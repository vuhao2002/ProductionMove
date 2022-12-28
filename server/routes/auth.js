const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const { verifyUser } = require("../utils/verifyToken");

router.post("/register", authController.register);
router.post("/login", verifyUser, authController.login);

module.exports = router;
