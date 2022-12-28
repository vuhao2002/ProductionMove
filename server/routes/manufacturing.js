const express = require("express");
const router = express.Router();
const manufacturingController = require("../controller/ManufactureFactory");
const { verifyUser } = require("../utils/verifyToken");

// tạo productLine
router.post("/productLine", manufacturingController.createProductLine);
router.post("/createProduct/:agentId", manufacturingController.createProduct);

module.exports = router;
