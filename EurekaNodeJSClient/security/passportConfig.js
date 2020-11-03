'use strict';
const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'wowwow';
const User = require('../models')['User'];
// lets create our strategy for web token
let jwtStrategy = new JwtStrategy(jwtOptions, async function (jwt_payload, next) {
    let user = await User.findOne({where: {id: jwt_payload.id}});
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});
let googleStragety = new GoogleStrategy({
        clientID: "592426081574-l9tdvnjp5qdeh9mv5952n7bl7dsm7l0f.apps.googleusercontent.com",
        clientSecret: 'oYQ8c-3O3MisYAbWW1ZbXsYX',
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    async function(token, tokenSecret, profile, next) {
        let user = await User.findOne({where: {googleId: profile.id}});
        if (user) {
            console.log(user);
            next(null, user);
        } else {
            console.log(profile._json.email);
            User.create({username: profile.displayName, googleId: profile.id , email: profile._json.email}).then(
                (value) => {
                    next(null, value);
                },
                (err) => {
                    next(null, false);
                }
            );
        }
    }
);
// use the strategy
passport.use(jwtStrategy);
passport.use(googleStragety);

module.exports = {
    passport: passport,
    jwtOptions: jwtOptions
};
