'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class animal extends Model {

    static associate(models) {
      animal.belongsTo(models.instituicao, {
        foreignKey: 'codigo_instituicao',
      });

      animal.belongsTo(models.raca, {
        foreignKey: 'codigo_raca',
        defaultValue:1
      });
      
      animal.hasMany(models.adocao,{
        foreignKey:'codigo_animal'
      });
    }
  };
  animal.init({

    codigo_animal: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING
    },
    genero:{
      type: DataTypes.STRING
    },
    porte: {
      type: DataTypes.ENUM,
      values:['MINI','P','M','G','GG']
    },
    situacao:{
      type: DataTypes.BOOLEAN,
      defaultValue:false,
    },
    vacinacao: {
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    castracao: {
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    observacao: {
      type: DataTypes.STRING
    },
    foto: {
      type: DataTypes.STRING,
    },
    
  }, {
    sequelize,
    modelName: 'animal',
    freezeTableName: true
  });
  return animal;
};