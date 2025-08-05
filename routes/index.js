var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
/* GET home page. */
function validateLogin(req, res, next) {
  if (!req.cookies.token) {
    return res.redirect('/login')
  }
  try {
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
    if (decoded) {
      req.user = decoded
      next()
      // console.log({ decoded: decoded.username })
    } else {
      res.redirect('/login')
    }
  } catch (error) {
    res.redirect('/login')
  }
}
router.get('/', validateLogin, function (req, res) {
  console.log({ routes: req.user })
  // console.log("Get routes")
  res.render('index', { title: 'Express', username: req.user.username });
});
router.get('/login', function (req, res) {
  if (req.cookies.token) {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (decoded) {
      res.redirect('/')
    }
  }
  res.render('login', { title: 'Login' });
});

module.exports = router;
