const express = require("express");
const router = express.Router();
const { contactForm, contact } = require("../controllers/contact-controller");
const { validate } = require("../models/user-model");
const { contactSchema } = require("../Validators/auth-validator");

router
  .route("/contact")
  .get(contactForm)
  //   .post(validate(contactSchema),contact);
  .post(contact);

module.exports = router;
