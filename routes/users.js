var express = require('express');
var router = express.Router();
var createUser = require('../api/user').createUser;
var loginUser = require('../api/user').loginUser;

router.get('/', function(req, res, next) {
  res.send("NEED TO BE CHECKED");
});

router.post('/createUser', createUser);

router.post('/login', loginUser);

module.exports = router;
