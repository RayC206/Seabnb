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
      Review.belongsTo(
        models.User,
          { foreignKey: 'userId', onDelete: 'CASCADE' }
      );

      Review.belongsTo(
        models.Spot,
          { foreignKey: 'spotId', onDelete: 'CASCADE' }
      );

      Review.hasMany(
        models.Image,
        { foreignKey: 'reviewId', onDelete: 'CASCADE' }
      );
    }
  }
  Review.init({
    userId: DataTypes.INTEGER,
    spotId: DataTypes.INTEGER,
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '',
      validate: {
          notEmpty: {
            msg: 'Review is required.'
        }
      }
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'Star rating is required.'
        },
      },
      validate: {
        minMaxStar(value) {
          if (value <= 0 || value > 5) {
            throw new Error("Star rating must be between 1 and 5")
          }
        },
        isNumeric: {
          msg: "Enter a numerical rating between 1 and 5."
        }
      },
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
