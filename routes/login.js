var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.post('/', function (req, res, next) {
    try {
        let userData = [
            {
                username: "john",
                password: "0000",
                fullname: "John Doe"
            },
            {
                username: "doe",
                password: "0000",
                fullname: "Doe John"
            }
        ]

        let body = req.body
        if (!body.username || !body.password) {
            throw new Error("username and password is required.!")
        }

        let userNameIsValid = false
        let passWordIsValid = false
        for (let user of userData) {
            if (body.username == user.username) {
                userNameIsValid = true
            }
            if (body.password == user.password) {
                passWordIsValid = true
            }
        }
        if (!userNameIsValid || !passWordIsValid) {
            throw new Error("username or password invalid.!")
        }

        let token = jwt.sign({ username: body.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 3600000 });
        res.status(200).json({
            success: true,
            message: "Login Success.",
            token: token
        })
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
});

module.exports = router;