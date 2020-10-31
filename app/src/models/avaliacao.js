'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class avaliacao extends Model {
   
    static associate(models) {
      avaliacao.belongsTo(models.pessoa, {
        foreignKey: 'codigo_pessoa',                
      }),
      avaliacao.belongsTo(models.instituicao, {
        foreignKey: 'codigo_instituicao',                
      })
    }
  };
  avaliacao.init({
    codigo_nota: {   type: DataTypes.INTEGER,
                     autoIncrement:true,
                     primaryKey:true
  },
    nota: DataTypes.INTEGER,
    tipo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'avaliacao',
    freezeTableName: true,
    timestamps: false
  });
  return avaliacao;
};