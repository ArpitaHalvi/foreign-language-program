const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");
const mailSender = require("../controllers/mail-controller");

router.route("/").post(authMiddleware, adminMiddleware, mailSender);

module.exports = router;
