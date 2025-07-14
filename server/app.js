if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const errorMiddleware = require("./middlewares/error-middleware");
const userRoutes = require("./routes/user-router");
const contactRoutes = require("./routes/contact-router");
const courseRoutes = require("./routes/course-router");
const feedbackRoutes = require("./routes/feedback-router");
const adminRoutes = require("./routes/admin-router");
const mailRoutes = require("./routes/mail-router");
// const url = "mongodb://127.0.0.1:27017/french-web";
const URL = process.env.MONGODB_URL;

// HANDLING CORS POLICY
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: "GET, POST, DELETE, PUT, PATCH, HEAD",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

mongoose
  .connect(URL)
  .then(() => {
    console.log("CONNECTED TO DATABASE SUCCESSFULLY");
    app.listen(port, () => {
      console.log(`LISTENING TO PORT: ${port}`);
    });
  })
  .catch((e) => {
    console.log("Error ocurred while connecting to database.", e);
  });

// app.get("/", (req, res) => {
//   res.send("HOME PAGE");
// });

app.use("/api/auth", userRoutes); // USER ROUTES
app.use("/api/form", contactRoutes); // CONTACT FORM ROUTE
app.use("/api/courses", courseRoutes); // COURSE ROUTE
app.use("/api/course", feedbackRoutes); // FEEDBACK ROUTE
app.use("/api/admin", adminRoutes); // ADMIN ROUTE
app.use("/api/admin/send-mail", mailRoutes); // MAIL ROUTE
app.use(errorMiddleware);

// module.exports = instance;
