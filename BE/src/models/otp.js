'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class OTP extends Model {
        static associate(models) {
            OTP.belongsTo(models.User, { foreignKey: 'emailRecovery', targetKey: 'email', as: 'recoveryData'  })
        }
    };
    OTP.init({
        emailRecovery: DataTypes.STRING,
        otp: DataTypes.STRING,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'OTP',
    });
    return OTP;
};