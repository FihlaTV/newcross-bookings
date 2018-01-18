/*Routes*/
var express = require('express');
var router = express.Router();
var passport = require("passport");
var Service = require('../services/service.js');


router.post("/login", (req, res) => {
    console.log("req.body");
  console.log(req.body);
  var user ;
  if(req.body.name && req.body.password){
    var name = req.body.name;
    var password = req.body.password;
    user = Service.findUserByName(name);

  }
  if( !user ){
    res.status(401).json({message:"user not found"});
  }

  if(user.password === req.body.password) {
    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
    var payload = {id: user.id};
    var token = Service.getJwtToken(payload);
    res.json({message: "success", token: token});
  } else {
    res.status(401).json({message:"passwords did not match"});
  }
});



router.get('/skills', passport.authenticate('jwt', { session: false }), (req, res) => {
    Service.getSkills(req, res);
});


module.exports = router;

