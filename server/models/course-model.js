const { Schema, model } = require("mongoose");

const courseSchema = new Schema({
  title: {
    type: String,
    // enum: ["olympiad", "fast-track course", "delf junior", "delf tcf-tef"],
    required: true,
  },
  fee: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  enrolledUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User", // Referencing to the user model
      default: [],
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Feedback", // Referencing to the Feedback model
      default: [],
    },
  ],
});

const Course = model("Course", courseSchema);
module.exports = Course;
