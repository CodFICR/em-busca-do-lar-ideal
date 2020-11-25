'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class avaliacao extends Model {
    static associate(models) {

      avaliacao.belongsTo(models.pessoa, {
        foreignKey: 'codigo_pessoa',
      });

      avaliacao.belongsTo(models.instituicao, {
        foreignKey: 'codigo_instituicao',
      });

    }
  };
  avaliacao.init({
    codigo_nota: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nota: {
      type: DataTypes.INTEGER
    },
    tipo: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'avaliacao',
    freezeTableName: true
  });
  return avaliacao;
};