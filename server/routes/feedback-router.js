const express = require("express");
const router = express.Router();
const { feedbacks, feedback } = require("../controllers/feedback-controller");
const { validate } = require("../middlewares/validate-middleware");
const { feedbackSchema } = require("../Validators/content-validator");
const { authMiddleware } = require("../middlewares/auth-middleware");

router
  .route("/:courseId/feedback")
  .get(feedbacks)
  .post(authMiddleware, validate(feedbackSchema), feedback);

module.exports = router;
