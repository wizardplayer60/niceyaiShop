const express = require('express');
const router = express.Router();

router.post('/', function (req, res) {
    res.clearCookie('token');
    // res.redirect('/login');
    res.status(200).json({
        success: true,
        message: 'ออกจากระบบสำเร็จ'
    })
});

module.exports = router;