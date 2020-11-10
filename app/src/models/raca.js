'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class raca extends Model {
  
    static associate(models) {
      raca.hasMany(models.animal, { 
        foreignKey: 'codigo_raca', 
      }); 
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
    freezeTableName: true
  });
  return raca;
};