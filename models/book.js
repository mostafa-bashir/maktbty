'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.hasMany(models.Image, {
        foreignKey: 'bookId',
        as: 'images'
      })
      Book.hasMany(models.Rent, {
        foreignKey: 'bookId',
        as: 'rents'
      })
      Book.hasMany(models.Review, {
        foreignKey: 'bookId',
        as: 'reviews'
      })

    }
  }
  Book.init({
    bookName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};