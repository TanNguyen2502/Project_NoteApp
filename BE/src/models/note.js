'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    static associate(models) {
      Note.belongsTo(models.Folder, { foreignKey: 'folderId', targetKey: 'id', as: 'folderData'  })
      Note.belongsTo(models.User, { foreignKey: 'accountId', targetKey: 'id', as: 'accountData2'  })
    }
  };
  Note.init({
    nameNote: DataTypes.STRING,
    contentHTML: DataTypes.TEXT('long'),
    contentText: DataTypes.TEXT('long'),
    accountId: DataTypes.INTEGER,
    folderId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Note',
  });
  return Note;
};