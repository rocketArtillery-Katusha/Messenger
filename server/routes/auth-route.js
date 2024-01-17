const { Router } = require("express");
const authController = require("../controllers/auth-controller.js");
const { loginValidation, registerValidation } = require("../middleware/authValidatuon.js");
const checkAuth = require("../middleware/checkAuth.js");

const router = Router();

router.post("/register", registerValidation, authController.registerUser);
router.post("/login", loginValidation, authController.loginUser);
router.get("/get-me", checkAuth, authController.getMe);

module.exports = router;
