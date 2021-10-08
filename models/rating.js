'use strict';
const { Model } = require('sequelize');
const RatingSchema = require('./schema/rating')

module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Rating.User = this.belongsTo(models.User)
      Rating.Burger = this.belongsTo(models.Burger)
    }
  };
  const { tableAttributes } = RatingSchema(sequelize, DataTypes)

  Rating.init(tableAttributes, {
    sequelize,
    modelName: 'Rating',
  });
  return Rating;
};
