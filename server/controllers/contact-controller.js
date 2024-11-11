const Contact = require("../models/contact-model");

const contactForm = (req, res) => {
  res.send("Contact form");
};

const contact = async (req, res, next) => {
  try {
    const response = req.body;
    await new Contact.create(response);
    return res.status(200).json({ msg: "Message sent successfully." });
  } catch (e) {
    // return res.status(500).json({ msg: "Message not delivered." });
    next(e);
  }
};

module.exports = {
  contactForm,
  contact,
};
