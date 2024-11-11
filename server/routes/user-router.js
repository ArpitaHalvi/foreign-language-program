const express = require("express");
const router = express.Router();
const {
  loginForm,
  registerForm,
  register,
  login,
} = require("../controllers/user-controller");
const { validate } = require("../middlewares/validate-middleware");
const { signUpSchema, loginSchema } = require("../Validators/auth-validator");

router
  .route("/register")
  .get(registerForm)
  .post(validate(signUpSchema), register);

router.route("/login").get(loginForm).post(validate(loginSchema), login);

module.exports = router;
