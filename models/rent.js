"use strict";
const { Model } = require("sequelize");
const review = require("./review");
module.exports = (sequelize, DataTypes) => {
  class Rent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rent.belongsTo(models.User, {
        foreignKey: 'readerId',
        as: 'reader'
      })

      Rent.belongsTo(models.Book, {
        foreignKey: 'bookId',
        as: 'book'
      })

      Rent.hasOne(models.Review, {
        foreignKey: 'rentId',
        as: 'review'
      })
    }
  }
  Rent.init(
    {
      readerId: DataTypes.INTEGER,
      bookId: DataTypes.INTEGER,
      startDate: {
        type: DataTypes.DATE,
        allowNull: false, // Ensures startDate is required
      },
      endDate: {  
        type: DataTypes.DATE,
        allowNull: false, // Ensures endDate is required
      },
    },
    {
      sequelize,
      modelName: "Rent",
    }
  );
  return Rent;
};
