const { Schema, model } = require("mongoose");

const registrationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", // Referencing to the User model
    required: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course", // Referencing to the Course model
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  isCompleted: {
    type: Boolean,
    default: false, // Indicates whether the user has completed the course or not
  },
});

const Registration = model("Registration", registrationSchema);
module.exports = Registration;
