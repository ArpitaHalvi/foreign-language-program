const Registration = require("../models/registration-model");
const User = require("../models/user-model");
const Course = require("../models/course-model");
const PaymentScreenshot = require("../models/paymentss-model");

const enrollment = async (req, res, next) => {
  try {
    const { email, courseName } = req.body;
    console.log("req.body", req.body);
    const user = await User.findOne({ email });
    const courseTitle = courseName.toLowerCase();
    const course = await Course.findOne({
      title: courseTitle,
    });
    console.log("user: ", user, "course: ", course);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    const existingRegistration = await Registration.findOne({
      userId: user._id,
      courseId: course._id,
    });
    console.log("Enrolled user: ", existingRegistration);

    if (existingRegistration) {
      const userPaymentDetails = await PaymentScreenshot.findOne({
        registeredUser: existingRegistration._id,
      });
      console.log("User Payment Details: ", userPaymentDetails);
      return res.status(400).json({
        message: "You have already enrolled in this course.",
        existingRegistration,
        userPaymentDetails,
      });
    }

    const newRegistration = await Registration.create({
      userId: user._id,
      courseId: course._id,
    });

    user.enrolledCourses.push(course._id);
    await course.save();
    await user.save();
    console.log("New registration: ", newRegistration);
    return res
      .status(200)
      .json({ message: "User registered successfully.", newRegistration });
  } catch (e) {
    console.error("Error from enrollment controller: ", e);
    next(e);
  }
};

module.exports = { enrollment };
