const express = require("express");
const router = express.Router();
const { register, login, user } = require("../controllers/user-controller");
const { validate } = require("../middlewares/validate-middleware");
const { authMiddleware } = require("../middlewares/auth-middleware");
const {
  signUpSchema,
  loginSchema,
  enrollmentSchema,
} = require("../Validators/auth-validator");
const { enrollment } = require("../controllers/enrollment-controller");
// const { fetchCourse } = require("../controllers/user-controller");

router.route("/register").post(validate(signUpSchema), register);

router.route("/login").post(validate(loginSchema), login);

router
  .route("/enroll")
  .post(authMiddleware, validate(enrollmentSchema), enrollment);

router.route("/user").get(authMiddleware, user);

// router.route("/user/:userId/courses").get(authMiddleware, fetchCourse);

module.exports = router;
