var DataTypes = require("sequelize").DataTypes;
var _Burger = require("./burger");
var _Rating = require("./rating");
var _SequelizeMetum = require("./sequelize_metum");
var _User = require("./user");

function initModels(sequelize) {
  var Burger = _Burger(sequelize, DataTypes);
  var Rating = _Rating(sequelize, DataTypes);
  var SequelizeMetum = _SequelizeMetum(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);


  return {
    Burger,
    Rating,
    SequelizeMetum,
    User,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
