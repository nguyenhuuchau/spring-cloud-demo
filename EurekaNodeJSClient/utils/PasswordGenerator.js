'use strict';
const bcrypt = require('bcrypt');
module.exports= {
    hash: function (plainText) {
        return bcrypt.hashSync(plainText, 10);
    },
    compare: function (plainText, hash) {
        return bcrypt.compareSync(plainText, hash)
    }
};
