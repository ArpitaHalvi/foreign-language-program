const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course", // Referencing to the Course model
    required: true,
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "User", // Referencing to the User model (Student giving the feedback)
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Feedback = model("Feedback", feedbackSchema);
module.exports = Feedback;
