'use strict';
const {
  Model, UUIDV4,
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
    }
  };

  Task.init({
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4(),
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    uuidUser:{
      type: DataTypes.UUID
    }

  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};