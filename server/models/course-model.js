const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const feedbackSchema = require("./feedback-model");

const courseSchema = new Schema({
  title: {
    type: String,
    enum: ["olympiad", "fast-track course", "delf junior", "delf tcf-tef"],
    required: true,
  },
  enrolledUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User", // Referencing to the user model
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Feedback", // Referencing to the Feedback model
    },
  ],
});

const Course = model("Course", courseSchema);
module.exports = Course;
