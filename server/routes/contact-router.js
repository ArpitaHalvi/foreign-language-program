const express = require("express");
const router = express.Router();
const { contact } = require("../controllers/contact-controller");
const { validate } = require("../middlewares/validate-middleware");
const { contactSchema } = require("../Validators/auth-validator");

router.route("/contact").post(validate(contactSchema), contact);

module.exports = router;
