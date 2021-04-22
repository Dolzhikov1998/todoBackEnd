require('dotenv').config();
const mongoose = require('mongoose');

// 'use strict';
// const {
//   Model, UUIDV4,
// } = require('sequelize');


// module.exports = (sequelize, DataTypes) => {
//   class Task extends Model {
//     static associate(models) {
//     }
//   };

//   Task.init({
//     uuid: {
//       type: DataTypes.UUID,
//       primaryKey: true,
//       defaultValue: UUIDV4(),
//     },
//     name: {
//       type: DataTypes.STRING,
//     },
//     done: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false,
//     },
//     uuidUser:{
//       type: DataTypes.UUID
//     }
//   }, {
//     sequelize,
//     modelName: 'Task',
//   });
//   return Task;
// };


const TaskSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String
  },
  done: {
    type: String
  },
  uuidUser: {
    type: mongoose.Schema.Types.ObjectId,
  },
  created: {
    type: Date,
    default: Date.now
  }
})

const TaskModel = mongoose.model('TaskModel', TaskSchema)

module.exports = TaskModel