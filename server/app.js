require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const userRoutes = require("./routes/user-router");
const contactRoutes = require("./routes/contact-router");
const courseRoutes = require("./routes/course-router");
const feedbackRoutes = require("./routes/feedback-router");
const adminRoutes = require("./routes/admin-router");
const errorMiddleware = require("./middlewares/error-middleware");
const url = "mongodb://127.0.0.1:27017/french-web";
const URL = process.env.MONGODB_URL;

// HANDLING CORS POLICY
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, DELETE, PUT, PATCH, HEAD",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

mongoose
  .connect(url)
  .then(() => {
    console.log("CONNECTED TO DATABASE SUCCESSFULLY");
    app.listen(port, () => {
      console.log(`LISTENING TO PORT: ${port}`);
    });
  })
  .catch((e) => {
    console.log("Error ocurred while connecting to database.", e);
  });

app.get("/", (req, res) => {
  res.send("HOME PAGE");
});

app.use("/api/auth", userRoutes); // USER ROUTES
app.use("/api/form", contactRoutes); // CONTACT FORM ROUTE
app.use("/api/courses", courseRoutes); // COURSE ROUTE
app.use("/api/courses/:id/feedback", feedbackRoutes); // FEEDBACK ROUTE
app.use("/api/admin", adminRoutes); // ADMIN ROUTE
app.use(errorMiddleware);
