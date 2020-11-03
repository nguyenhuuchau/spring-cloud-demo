'use strict';
const Sequelize = require('sequelize');
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
        toJSON() {
            const userObj = Object.assign({}, this.dataValues);
            delete userObj.password;
            delete userObj.createdAt;
            delete userObj.updatedAt;
            return userObj
        }
    }

    User.init({
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        googleId: DataTypes.STRING,
        email: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};
