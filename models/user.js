'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Rent, {
        foreignKey: 'readerId',
        as: 'rents'
      })
      User.hasMany(models.Review, {
        foreignKey: 'readerId',
        as: 'reviews'
      })
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    type: {
      type: DataTypes.ENUM('librarian', 'reader'),
      allowNull: false,  // Ensures the type is not null
      defaultValue: 'reader', // Optional: default value
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};