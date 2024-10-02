'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('todo_app', 'user_id', {
      type: Sequelize.INTEGER
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('todo_app', 'user_id');
  }
};
