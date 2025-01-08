const { Schema, model } = require("mongoose");

const feedbackSchema = new Schema({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course", // Referencing to the Course model
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", // Referencing to the User model (Student giving the feedback)
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Feedback = model("Feedback", feedbackSchema);
module.exports = Feedback;
