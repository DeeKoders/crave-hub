const express = require("express");
const router = express.Router({ mergeParams: true });
const userController = require("../controllers/users.js");

router.route("/registration").post(userController.registration);
router.route("/login").post(userController.login);

module.exports = router;
