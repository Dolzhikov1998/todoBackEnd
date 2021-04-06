'use strict';
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db = {};

const sequelize = new Sequelize('postgres://fnholjatfgwlvu:65e9f77f66fbe1354efa916f8ee68b7ca032d05bbc8a80d1e1da8cc153bf3764@ec2-54-155-87-214.eu-west-1.compute.amazonaws.com:5432/d6k84om0ofqveo');



fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}); 

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
