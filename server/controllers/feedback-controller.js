const Course = require("../models/course-model");
const Feedback = require("../models/feedback-model");
const Registration = require("../models/registration-model");

const feedbacks = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const reviews = await Feedback.find({ courseId: courseId }).populate(
      "userId",
      "fullname"
    );
    if (!reviews) {
      return res.status(404).json({ message: "Feedback not found." });
    }
    return res.status(200).json(reviews);
  } catch (e) {
    next(e);
  }
};

const feedback = async (req, res, next) => {
  try {
    const { rating, content } = req.body;
    const { courseId } = req.params;
    const userID = req.userId;
    const course = await Course.findOne({ _id: courseId });
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }
    const enrolledUser = await Registration.findOne({
      userId: userID,
      courseId: courseId,
    });
    // console.log("Enrolled User: ", enrolledUser);
    if (!enrolledUser) {
      return res
        .status(403)
        .json({ message: "You are not enrolled in this course." });
    }
    const review = await Feedback.create({
      courseId: courseId,
      userId: userID,
      rating,
      content,
    });
    // console.log("Review or the feedback: ", review);
    course.reviews.push(review._id);
    await course.save();
    if (!review) {
      return res.status(500).json({ message: "Review not posted." });
    }
    return res.status(201).json("Successfully posted the review.");
  } catch (e) {
    next(e);
  }
};

module.exports = {
  feedbacks,
  feedback,
};
