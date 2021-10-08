'use strict';
const { Model } = require('sequelize');
const BurgerSchema = require('./schema/burger')

module.exports = (sequelize, DataTypes) => {
  class Burger extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Burger.User = this.belongsTo(models.User)
      Burger.Ratings = this.hasMany(models.Rating)
      Burger.RatedUsers = this.belongsToMany(models.User, { through: 'Rating' })
    }
  };
  const { tableAttributes } = BurgerSchema(sequelize, DataTypes)
  Burger.init(tableAttributes, {
    sequelize,
    modelName: 'Burger',
  });
  return Burger;
};
