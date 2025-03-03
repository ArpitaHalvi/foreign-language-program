const express = require("express");
const {
  eachCourse,
  courses,
  olympiad,
} = require("../controllers/course-controller");
const router = express.Router();

router.route("/").get(courses);
router.route("/olympiad").get(olympiad);
router.route("/:id").get(eachCourse);

module.exports = router;
