'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TodoApp extends Model {
    static associate(models) {
      // Define associations here if needed in the future
      TodoApp.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
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
    },
    user_id:{
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:'Users',
        key:'id'
      },
      onUpdate:'CASCADE',
      onDelete:'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'TodoApp', // PascalCase model name for your app
    tableName: 'todo_app' // This ensures Sequelize maps to the 'todo_app' table
  });

  return TodoApp;
};
