'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      readerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      bookId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Books',
          key: 'id'
        }
      },
      startDate: {
      type: Sequelize.DATE,
      allowNull: false,  // Ensures startDate is required
    },
    endDate: {
      type: Sequelize.DATE,
      allowNull: false,  // Ensures endDate is required
    },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rents');
  }
};