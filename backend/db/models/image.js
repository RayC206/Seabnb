'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.belongsTo(
        models.Review,
          { foreignKey: 'reviewId' }
      );

      Image.belongsTo(
        models.Spot,
          { foreignKey: 'spotId' }
      );
    }
  }
  Image.init({
    url: {
      type: DataTypes.STRING,
      validate : {
        validUrl(value) {
          const imageType = ['.jpg', '.jpeg', '.png', '.gif']
          if (!imageType.some(i => value.includes(i))) {
            throw new Error("Enter a valid image URL type (.jpg, .jpeg, .png, or .gif)")
          }
        }
      }

    },
    reviewId: DataTypes.INTEGER,
    spotId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
