const Course = require("../models/course-model");
const Feedback = require("../models/feedback-model");

const feedbacks = async (req, res, next) => {
  try {
    const reviews = await Feedback.find();
    if (!reviews) {
      return res.status(404).json({ message: "Feedback not found." });
    }
  } catch (e) {
    next(e);
  }
};

const feedback = async (req, res, next) => {
  try {
    const { rating, content } = req.body;
    const courseId = req.params.id;
    const userID = req.userId;
    console.log("Course and User ID: ", courseId, userID);
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }
    const enrolledUser = course.enrolledUsers.find(
      (id) => id.toString() === userID.toString()
    );
    console.log(enrolledUser);
    if (enrolledUser) {
      const review = await Feedback.create({
        courseId,
        userID,
        rating,
        content,
      });
      console.log(review);
      course.reviews.push(review._id);
      await course.save();
    }
    if (!review) {
      return res.status(422).json({ message: "Feedback not posted." });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  feedbacks,
  feedback,
};
