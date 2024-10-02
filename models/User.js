'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
   
    static associate(models) {
      User.hasMany(models.TodoApp, {
        foreignKey: 'user_id'
      });
    }
  }
  User.init({
    first_name: {type:DataTypes.STRING,allowNull:false},
    last_name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.BOOLEAN,defaultValue:true}
  }, {
    sequelize,
    modelName: 'User',
    tableName:'Users'
  });
  return User;
};

