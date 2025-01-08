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
  //   paymentMethod: {
  //     type: String,
  //     enum: ["credit_card", "paypal", "bank_transfer"],
  //   },
  //   transactionId: {
  //     type: String,
  //     required: function () {
  //       return this.paymentStatus === "completed";
  //     },
  //   },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  isCompleted: {
    type: Boolean,
    default: false, // Indicates whether the user has completed the course or not.s
  },
});

const Registration = model("Registration", registrationSchema);
module.exports = Registration;
