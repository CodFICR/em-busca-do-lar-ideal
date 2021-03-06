'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class adocao extends Model {
    
    static associate(models) {

      adocao.belongsTo(models.pessoa,{
        foreignKey:'codigo_pessoa',
        
      });
      
      adocao.belongsTo(models.animal,{
        foreignKey:'codigo_animal'
      });
    
      adocao.belongsTo(models.instituicao,{
        foreignKey:'codigo_instituicao'
      });
    }
  };
  adocao.init({
    
    codigo_adocao: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    situacao:{
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    dt_adocao: {
      type: DataTypes.DATE,
      defaultValue:sequelize.fn('NOW'), 
    },
    dt_devolucao:{
      type: DataTypes.DATE
    }

  }, {
    sequelize,
    modelName: 'adocao',
    freezeTableName: true,
  });
  return adocao;
};