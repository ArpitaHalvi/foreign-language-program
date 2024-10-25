const User = require("../models/user-model");

const registerForm = (req, res) => {
    res.send("REGISTERATION FORM");
}

const register = async (req, res) => {
    try {
        // res.send(req.body);
        const { email, username, password } = req.body;
        // CHECKING IF THE USER ALREADY EXISTS 
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).send("Email already exists.");
        }
        else {
            const user = await User.create({ email, username, password });
            console.log(user);
            res.json({ msg: "Registered successfully", token: user.generateToken(), userId: user._id.toString() });

        }
    } catch (e) {
        console.log("Sorry cannot register. Something went wrong.", e);
    }
}

const loginForm = (req, res) => {
    res.send("LOGIN FORM..");
}

module.exports = {
    registerForm,
    register,
    loginForm,
}