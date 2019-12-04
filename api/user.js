const passport = require('passport');
const User = require("./database/userModel");
const config = require("../config/passport");

function createUser(req, res) {
    console.log(req.body);
  let user = new User({
    email: req.body.email,
    userType: req.body.userType,
    name: req.body.name
  });

  user.setPassword(req.body.password);

  user.save(function(err) {
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      token: token
    });
  });
}

function loginUser(req, res) {
    passport.authenticate('local', function(err, user, info){
        var token;
    
        // If Passport throws/catches an error
        if (err) {
          res.status(404).json(err);
          return;
        }
    
        // If a user is found
        if(user){
          token = user.generateJwt();
          res.status(200);
          res.json({
            "token" : token
          });
        } else {
          // If user is not found
          res.status(401).json(info);
        }
      })(req, res);
}

module.exports = {
    createUser : createUser,
    loginUser : loginUser
};
