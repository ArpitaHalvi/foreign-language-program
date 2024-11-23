const User = require("../models/user-model");

// REGISTERING THE USER
const register = async (req, res, next) => {
  try {
    // res.send(req.body);
    const { fullname, email, username, password, gender } = req.body;
    // CHECKING IF THE USER ALREADY EXISTS
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).send("Email already exists.");
    } else {
      const user = await User.create({
        fullname,
        email,
        username,
        password,
        gender,
      });
      console.log(user);
      res.status(201).json({
        msg: "Registered successfully",
        token: user.generateToken(),
        userId: user._id.toString(),
      });
    }
  } catch (e) {
    // console.log("Sorry cannot register. Something went wrong.", e);
    next(e);
  }
};

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
          msg: "Logged in successfully.",
          token: userExist.generateToken(),
          userId: userExist._id.toString(),
        });
      } else {
        res.status(401).json({ msg: "Invalid Email or password." });
      }
    } else {
      res.status(400).json("Invalid credentials.");
    }
  } catch (e) {
    // res.status(500).json("Internal server error.");
    console.log(e);
    next(e);
  }
};

module.exports = {
  register,
  login,
};
