const nodemailer = require("nodemailer");
const PaymentScreenshot = require("../models/paymentss-model");
const fs = require("fs");
const path = require("path");
const { Resend } = require("resend");

const mailSender = async (req, res, next) => {
  try {
    const { emailPerson } = req.body;
    console.log("Req.body: ", req.body);
    const payment = await PaymentScreenshot.findById(emailPerson).populate({
      path: "registeredUser",
      populate: {
        path: "userId",
        select: "email",
      },
    });
    console.log("Payment: ", payment);
    if (!payment || !payment.registeredUser || !payment.registeredUser.userId) {
      console.error("Error: User not found.");
      return res.status(404).json({ message: "User not found!" });
    }
    const userEmail = payment.registeredUser.userId.email;
    console.log("User Email:", userEmail);

    const emailTemplatePath = path.join(
      __dirname,
      "../email_templates/payment-approval.html"
    );
    const emailHTML = fs.readFileSync(emailTemplatePath, "utf-8");

    // const auth = nodemailer.createTransport({

    //   service: "gmail",
    //   secure: true,
    //   port: 465,
    //   auth: {
    //     user: "arpitaa0311@gmail.com",
    //     pass: process.env.EMAIL_PASSWORD,
    //   },
    // });

    // const receiver = {
    //   from: "arpitaa0311@gmail.com",
    //   to: userEmail,
    //   // to: "arpitahalvi@gmail.com",
    //   subject: "Payment Approved - Foreign Language Programme",
    //   // text: "Greetings from Foreign Language Program.\nHello, Your payment has been approved you can go the course page to access your class link.\nThank You! Happy Learning! <br> Foreign Language Program.",
    //   html: emailHTML,
    // };
    // auth.sendMail(receiver, (error, emailResponse) => {
    //   if (error) {
    //     console.error("Email sending error: ", error);
    //     return;
    //   }
    //   console.log("EMAIL SENT!");
    //   // console.log("Email response: ", emailResponse);
    //   return res.status(200).json({ message: "Email sent successfully!" });
    // });

    const resend = new Resend(process.env.RESEND_API_KEY);

    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: userEmail,
      subject: "Test Email - FLP Payment Confirmation",
      html: emailHTML,
    });
    console.log("Result: ", result);
    return res.status(200).json({ message: "Email sent successfully!" });
  } catch (e) {
    console.error("Error while sending mail: ", e);
    return next(e);
  }
};

module.exports = mailSender;
