require("dotenv").config();

const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const userRoutes = require("./routes/user-router");
const contactRoutes = require("./routes/contact-router");
const errorMiddleware = require("./middlewares/error-middleware");
const url = "mongodb://127.0.0.1:27017/french-web";
const URL = process.env.MONGODB_URL;

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

app.use(userRoutes);
app.use(contactRoutes);
app.use(errorMiddleware);
