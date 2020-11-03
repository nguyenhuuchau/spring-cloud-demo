const db = require('../../models');
const response = require('../../templates/response');;
const passwordGenerator = require('../../utils/PasswordGenerator');
const jwt = require('jsonwebtoken');
const jwtOptions = require('../../security/passportConfig').jwtOptions;
const passport = require('../../security/passportConfig').passport;
User=db['User'];
module.exports = function (router) {
    router.post('/login', async function (req, res, next) {
        const { email, password } = req.body;
        if (email && password) {
            let user = await User.findOne({where: {email: email}});
            if (!user) {
                res.status(401).json(response(null, false, "email or password is incorrect"));
            }
            if (passwordGenerator.compare(password, user.password)) {
                let payload = { id: user.id };
                let token = jwt.sign(payload, jwtOptions.secretOrKey);
                res.json(response(token));
            } else {
                res.status(401).json(response(null, false, "email or password is incorrect"));
            }
        } else {
            res.status(401).json(response(null, false, "email or password is incorrect"));
        }
    });

    router.post('/register', function (req, res, next) {
        // throw "error";
        const {email, password} = req.body;
        let passwordEncrypt = passwordGenerator.hash(password);
        console.log(passwordEncrypt);
        User.create({username: email.substr(0, email.indexOf('@')), password: passwordEncrypt, email: email})
            .then((value) => {
                console.log(value);
                res.json(response(null));
            }, (err) => {
                next(err)
            });
    });

    router.get('/google',
        passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.email']}));

    router.get('/google/callback',
        passport.authenticate('google', { session: false}),
        function(req, res) {
            let payload = { id: req.user.id };
            let token = jwt.sign(payload, jwtOptions.secretOrKey);
            res.json(response(token));
        });


    router.get('/test', function (req, res, next){
        console.log(JSON.stringify(req.headers));
        res.status(200);
        res.write('hello');
        next('route')
    })
};
