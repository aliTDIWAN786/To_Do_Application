var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const Account = require("../models/accounts");
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET || "task-management-application";
passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    let response = await Account.findOne({
      _id: jwt_payload.user._id,
    }).lean();
    if (response) {
      return done(null, response);
    } else {
      return done(err, false);
    }
  })
);
