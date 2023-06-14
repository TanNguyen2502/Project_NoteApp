'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Folder extends Model {
    static associate(models) {
      Folder.belongsTo(models.User, { foreignKey: 'accountId', targetKey: 'id', as: 'accountData'  })
      Folder.hasMany(models.Note, { foreignKey: 'folderId', as: 'folderData' })
    }
  };
  Folder.init({
    folderName: DataTypes.STRING,
    accountId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Folder',
  });
  return Folder;
};