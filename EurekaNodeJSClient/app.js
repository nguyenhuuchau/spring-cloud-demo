const express = require('express');
const response = require('./templates/response');
const schedule = require('node-schedule');
const db = require('./models');
const app = express();
const apiRoute = express.Router();
const authRoute = express.Router();
const bodyParser = require('body-parser');
const passport = require('./security/passportConfig');
const authenticateRoute = require('./security/securityConfig');
const routeConfig = require('./routes');
const eurekaHelper = require('./eureka-helper');


app.use(express.static('public'));
app.use(passport.passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', authenticateRoute, apiRoute);
app.use('/auth', authRoute);
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).json(response(null, false, 'Internal server error!'))
});
routeConfig(apiRoute, '/api');
routeConfig(authRoute, '/auth');
//init database connect

db.sequelize
    .authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

let server = app.listen(3003, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("Application running at address: http://%s:%s", host, port)
});
eurekaHelper.registerWithEureka('user-service', 3003);
