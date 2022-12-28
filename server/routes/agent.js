const express = require("express");
const router = express.Router();
const agent = require("../controller/DistributionAgent");
const { verifyUser } = require("../utils/verifyToken");

router.post("/createTransaction/:productId", agent.createTransaction);

module.exports = router;
