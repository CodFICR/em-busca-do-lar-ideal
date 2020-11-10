'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class animal extends Model {
    
    static associate(models) {   
      animal.belongsTo(models.instituicao, {
        foreignKey: 'codigo_instituicao',                
      }),
      animal.belongsTo(models.raca, {
        foreignKey: 'codigo_raca',                
      });
    }
  };
  animal.init({
     
  codigo_animal:{   type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
  },
  nome: {
    type:DataTypes.STRING
  },
  peso: {
    type:DataTypes.DECIMAL
  },
  porte: {
    type:DataTypes.STRING
  },
  vacinacao: {
    type:DataTypes.STRING
  },
  castracao: {
    type:DataTypes.STRING
  },
  observacao: {
    type:DataTypes.STRING
  },
  foto:{
    type: DataTypes.STRING
  }

  }, {
    sequelize,
    modelName: 'animal',
    freezeTableName: true
  });
  return animal;
};