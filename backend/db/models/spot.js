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
      Spot.hasMany(
        models.Booking,
        { foreignKey: 'spotId', onDelete: 'CASCADE' }
      )
      Spot.hasMany(
        models.Review,
        { foreignKey: 'spotId', onDelete: 'CASCADE' }
      )
      Spot.hasMany(
        models.Image,
        { foreignKey: 'spotId', onDelete: 'CASCADE' }
      )
    }
  }
  // TODO: add uniqueness check
  Spot.init({
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
          notEmpty: {
            msg: 'address is required.'
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
          notEmpty: {
            msg: 'City is required.'
        }
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
          notEmpty: {
            msg: 'State is required.'
        }
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
          notEmpty: {
            msg: 'Country is required.'
        }
      }
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: '',
      validate: {
          notEmpty: {
            msg: 'Lat is required.'
        }
      }
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: '',
      validate: {
          notEmpty: {
            msg: 'Lng is required.'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
          notEmpty: {
            msg: 'Name is required.'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '',
      validate: {
          notEmpty: {
            msg: 'Description is required.'
        }
      }
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: '',
      validate: {
          notEmpty: {
            msg: 'Price is required.'
        }
      },
      validate: {
       minVal(value) {
        if (value <= 0 ){
          throw new Error("Price needs to be above 0")
        }
       }
    }
    },
    previewImage: DataTypes.STRING,
    ownerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
