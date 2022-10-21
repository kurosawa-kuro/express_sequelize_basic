'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Samples', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING,
        defaultValue: "https://loremflickr.com/640/480/fashion"
      },
      boolean: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      radioGroup: {
        type: Sequelize.STRING,
        defaultValue: "1"
      },
      checkbox: {
        type: Sequelize.STRING,
        defaultValue: "1,2"
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Samples');
  }
};