const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/user-controller");
const { validate } = require("../middlewares/validate-middleware");
const {
  signUpSchema,
  loginSchema,
  enrollmentSchema,
} = require("../Validators/auth-validator");
const { enrollment } = require("../controllers/enrollment-controller");

router.route("/register").post(validate(signUpSchema), register);

router.route("/login").post(validate(loginSchema), login);

router.route("/enroll").post(validate(enrollmentSchema), enrollment);

module.exports = router;
