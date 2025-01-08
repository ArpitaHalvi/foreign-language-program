const Contact = require("../models/contact-model");

const contact = async (req, res, next) => {
  try {
    const response = req.body;
    if (!response.fullname || !response.email || !response.message) {
      return res.status(400).json({ message: "All fields are required." });
    }
    await Contact.create(response);
    return res.status(200).json({ message: "Message sent successfully." });
  } catch (e) {
    return res.status(500).json({ msg: "Message not delivered." });
    // next(e);
  }
};

module.exports = {
  contact,
};
