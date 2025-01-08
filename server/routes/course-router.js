const express = require("express");
const { eachCourse, courses } = require("../controllers/course-controller");
const router = express.Router();

router.route("/").get(courses);
router.route("/:id").get(eachCourse);

module.exports = router;
