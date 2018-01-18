var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var Service = require('../app/services/service.js');

var jwtOptions = {jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
				secretOrKey:'newcrossSecret'}

var strategy = new JwtStrategy(jwtOptions, (jwt_payload, next)=> {
  console.log('payload received', jwt_payload);
  // mock users - here would be a db call:
  var user = Service.findUserById(jwt_payload.id);
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});


module.exports.strategy = strategy
module.exports.jwtOptions = jwtOptions;
