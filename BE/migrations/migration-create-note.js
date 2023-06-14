'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Notes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nameNote: {
        allowNull: false,
        type: Sequelize.STRING
      },
      contentHTML: {
        allowNull: false,
        type: Sequelize.TEXT('long')
      },
      contentText: {
        allowNull: false,
        type: Sequelize.TEXT('long')
      },
      accountId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      folderId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Notes');
  }
};