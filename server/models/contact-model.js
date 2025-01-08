const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  fullname: {
    type: String,
    required: [true, "Enter your Fullname."],
  },
  email: {
    type: String,
    required: [true, "Must enter your email id."],
  },
  message: {
    type: String,
    required: [true, "Enter your message or query."],
  },
});

const Contact = model("Contact", contactSchema);
module.exports = Contact;
