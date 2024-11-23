const Registration = require("../models/registration-model");

const enrollment = async (req, res, next) => {
  try {
    res.status(200).json({ msg: "Enrollment Form." });
  } catch (e) {
    console.log(e);
    // next(e);
  }
};

module.exports = { enrollment };
