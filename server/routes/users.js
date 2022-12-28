const express = require("express");
const router = express.Router();

const userController = require("../controller/UserController");
const { verifyUser, verifyAdmin } = require("../utils/verifyToken");

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("hello user, you are now logged in");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("hello user, you are now logged in and you can delete you account");
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("hello user, you are now logged in and you can delete you accounts");
// });

// UPDATE
router.put("/:id", verifyUser, userController.updateUser);

// DELETE
router.delete("/:id", verifyUser, userController.deleteUser);

// GET
router.get("/:id", verifyUser, userController.getUser);

// GETALL

router.get("/", verifyAdmin, userController.getUsers);

module.exports = router;
