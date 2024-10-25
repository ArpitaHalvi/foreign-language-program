const express = require('express');
const router = express.Router();
const { loginForm, registerForm, register } = require('../controllers/user-controller');

router.route('/register')
    .get(registerForm)
    .post(register)

router.route('/login')
    .get(loginForm)
// .post(login)


module.exports = router;