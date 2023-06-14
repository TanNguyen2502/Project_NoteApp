'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Folder, { foreignKey: 'accountId', as: 'accountData' })
      User.hasMany(models.Note, { foreignKey: 'accountId', as: 'accountData2' })
      User.hasMany(models.OTP, { foreignKey: 'emailRecovery', as: 'recoveryData' })
    }
  };
  User.init({
    email: DataTypes.STRING,
    idSocial: DataTypes.STRING,
    password: DataTypes.STRING,
    nameLogin: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};