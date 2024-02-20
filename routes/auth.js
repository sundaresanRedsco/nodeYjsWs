const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");
const authenticate = require("../middleware/authenticate");

router.post("/register", AuthController.register);
router.post("/verifyotp", AuthController.verifyotp);
router.post("/login", AuthController.login);
router.put("/updateuser", authenticate, AuthController.updateuser);
router.post("/refresh-token", AuthController.refreshToken);

module.exports = router;
