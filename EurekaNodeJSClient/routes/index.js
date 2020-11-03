'use strict';
const fs = require('fs');
const path = require('path');

module.exports = function (route, location) {
    const basename = path.basename(path.join(__filename, location));
    fs.readdirSync(path.join(__dirname, location))
        .filter(file => {
            return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
        })
        .forEach(file => {
            require(path.join(__dirname, location, file))(route);
        });
};
