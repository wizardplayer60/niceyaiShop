var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
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
  res.status(200).json({
    data: userData
  })
});

router.get('/me', function (req, res) {
  res.status(200).json({
    message: "Success"
  })
})

module.exports = router;
