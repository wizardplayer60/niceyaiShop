let jwt = require("jsonwebtoken")

function tokenVerify(req, res, next) {
    try {
        const TOKEN = req.cookies.token;
        if (!TOKEN) {
            console.log("Token is required.")
            throw new Error("Token is required.")
        }
        let tokenData = jwt.verify(TOKEN, process.env.JWT_SECRET)
        console.log(tokenData)
        next()
    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }
}

module.exports = tokenVerify