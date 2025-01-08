const Registration = require("../models/registration-model");
const User = require("../models/user-model");
const Course = require("../models/course-model");

const enrollment = async (req, res, next) => {
  try {
    const { email, enrolledCourses } = req.body;
    const user = await User.findOne({ email });
    const course = await Course.findOne({ title: enrolledCourses });
    if (!course) {
      res.status(404).json({ message: "Course not found." });
    }
    if (user) {
      const registeredUser = await Registration.create({
        userId: user._id,
        courseId: course._id,
      });
      course.enrolledUsers.push(user._id);
      user.enrolledCourses.push(course._id);
      await course.save();
      await user.save();
      res
        .status(200)
        .json({ message: "User registered successfully.", registeredUser });
      console.log(registeredUser);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (e) {
    // console.log(e);
    next(e);
  }
};

module.exports = { enrollment };
