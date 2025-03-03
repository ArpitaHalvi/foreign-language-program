const Course = require("../models/course-model");

const courses = async (req, res, next) => {
  try {
    const course = await Course.find().skip(1);
    if (!course) {
      return res.status(404).json({ message: "No Courses found." });
    } else {
      res.status(200).json(course);
    }
  } catch (e) {
    next(e);
  }
};

const olympiad = async (req, res, next) => {
  try {
    const course = await Course.find().limit(1);
    if (!course) {
      return res.status(404).json({ message: "No Courses found." });
    } else {
      res.status(200).json(course);
    }
  } catch (e) {
    next(e);
  }
};

const eachCourse = async (req, res, next) => {
  const { id } = req.params;
  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course Not Found." });
    } else {
      res.status(200).json(course);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { courses, eachCourse, olympiad };
