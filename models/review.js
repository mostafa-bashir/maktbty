'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.Book, {
        foreignKey: 'bookId',
        as: 'book'
      })
      Review.belongsTo(models.User, {
        foreignKey: 'readerId',
        as: 'reader'
      })
      Review.belongsTo(models.Rent, {
        foreignKey: 'rentId',
        as: 'rent'
      })
    }
  }
  Review.init({
    readerId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    rentId: DataTypes.INTEGER,
    review: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};