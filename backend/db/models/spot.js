'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(
        models.User,
          { foreignKey: 'ownerId', onDelete: 'CASCADE'}
      );
    }
  }
  // TODO: add uniqueness check
  Spot.init({
    address: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    previewImage: DataTypes.STRING,
    ownerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
