'use strict';
const passport = require('./passportConfig').passport;
const authenticationWhiteList = [
    'POST /auth/login',
    'POST /auth/register',
];



module.exports = function Authenticate (request, response, next) {
    // console.log(request);
    let route = `${request.method} ${request.baseUrl}${request.url}`;
    console.debug("REQUEST", route);
    if (authenticationWhiteList.indexOf(route) !== -1) {
        next()
    } else {
        passport.authenticate('jwt', { session: false })(request, response, next)
    }
};
