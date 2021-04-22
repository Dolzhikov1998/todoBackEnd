require('dotenv').config();
const mongoose = require('mongoose');


// 'use strict';
// const {
//   Model, UUIDV4
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   User.init({
//     uuid: {
//       type: DataTypes.UUID,
//       primaryKey: true,
//       defaultValue: UUIDV4(),
//     },
//     login: {
//       type: DataTypes.STRING,
//       unique: true
//     },
//     email: {
//       type: DataTypes.STRING,
//       unique: true
//     },
//     password: {
//       type: DataTypes.STRING,
//     }
//   }, {
//     sequelize,
//     modelName: 'User',
//   });
//   return User;
// };


const userSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  login: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
})

const UserModel = mongoose.model('UserModel', userSchema)

module.exports = UserModel