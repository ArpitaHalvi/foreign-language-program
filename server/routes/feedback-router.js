const express = require("express");
const { feedbacks, feedback } = require("../controllers/feedback-controller");
const { validate } = require("../middlewares/validate-middleware");
const { feedbackSchema } = require("../Validators/auth-validator");
const { authMiddleware } = require("../middlewares/auth-middleware");
const router = express.Router();

router
  .route("/")
  .get(feedbacks)
  .post(authMiddleware, validate(feedbackSchema), feedback);

module.exports = router;
