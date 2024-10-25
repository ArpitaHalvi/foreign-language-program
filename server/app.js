require("dotenv").config();

const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const userRoutes = require('./routes/user-router');
const url = 'mongodb://127.0.0.1:27017/french-web';
const uri = process.env.MONGODB_URL;

app.use(express.json());

mongoose.connect(url)
    .then(() => {
        console.log("CONNECTED TO DATABASE SUCCESSFULLY");
        app.listen(port, () => {
            console.log(`LISTENING TO PORT: ${port}`);
        })
    })
    .catch(e => {
        console.log("Error ocurred by connecting.", e);
    })


app.get('/', (req, res) => {
    res.send("HOME PAGE");
});

app.use(userRoutes);

