const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  fullname: {
    type: String,
    required: [true, "Enter you fullname."],
  },
  email: {
    type: String,
    required: [true, "Enter your email first."],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Enter your username first."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password required."],
    unique: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other", "prefer not to say"],
    required: true,
  },
  enrolledCourses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course", // Referencing to the Course Model
    },
  ],
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  // this -  here, this contains the recent user who is being saved
  // console.log(this);
  const user = this;
  if (!user.isModified("password")) {
    next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);
    user.password = hashPassword;
  } catch (e) {
    next(e);
  }
});

// JSON WEB TOKEN
userSchema.methods.generateToken = function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

// COMPARING PASSWORDS
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Model acts as a higher-level abstraction that interacts with the database based on the defined schema.

const User = mongoose.model("User", userSchema);
module.exports = User;
