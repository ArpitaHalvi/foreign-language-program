const Course = require("../models/course-model");
const User = require("../models/user-model");

// REGISTERING THE USER
async function register(req, res, next) {
  try {
    // res.send(req.body);
    const { fullname, email, phoneNumber, password, gender } = req.body;
    // CHECKING IF THE USER ALREADY EXISTS
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    } else {
      const user = await User.create({
        fullname,
        email,
        phoneNumber,
        password,
        gender,
      });
      // console.log(user);
      res.status(201).json({
        message: "Registered successfully",
        token: user.generateToken(),
        userId: user._id.toString(),
      });
    }
  } catch (e) {
    // console.log("Sorry cannot register. Something went wrong.", e);
    next(e);
  }
}

// LOGGING IN THE USER
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Finding if the user exist with that email
    const userExist = await User.findOne({ email });
    if (userExist) {
      // Comparing the passwords
      const user = await userExist.comparePassword(password);
      if (user) {
        res.status(200).json({
          message: "Logged in successfully.",
          token: userExist.generateToken(),
          userId: userExist._id.toString(),
        });
        // console.log("Token: ", userExist.generateToken());
      } else {
        res.status(401).json({ message: "Invalid Email or password." });
      }
    } else {
      res.status(400).json({ message: "Invalid credentials." });
    }
  } catch (e) {
    // console.log(e);
    next(e);
  }
};

// To send the user data
const user = async (req, res, next) => {
  try {
    const userData = req.user;
    // console.log("User data from user route: ", userData);
    return res.status(200).json({ userData });
  } catch (e) {
    next(e);
  }
};

const fetchCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(500).json({ message: "Course Id is not provided." });
    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: "Course Not Found." });
    return res.status(200).json({ course });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  register,
  login,
  user,
  fetchCourse,
};
