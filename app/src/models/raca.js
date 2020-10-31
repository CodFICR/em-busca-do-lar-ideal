'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class raca extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  raca.init({
    description: {type :DataTypes.STRING,
                  unique:true
                },
    codigo_raca: { type: DataTypes.INTEGER, 
                   autoIncrement: true, 
                   primaryKey:true 
                  },
  }, {
    sequelize,
    modelName: 'raca',
    freezeTableName: true,
    timestamps: false
  });
  return raca;
};