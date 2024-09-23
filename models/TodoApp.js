'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TodoApp extends Model {
    static associate(models) {
      // Define associations here if needed in the future
    }
  }

  TodoApp.init({
    todo_message: {
      type: DataTypes.STRING
    },
    is_marked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false // Default value instead of `default`
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'TodoApp', // PascalCase model name for your app
    tableName: 'todo_app' // This ensures Sequelize maps to the 'todo_app' table
  });

  return TodoApp;
};
