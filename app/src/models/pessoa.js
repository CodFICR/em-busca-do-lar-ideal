'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pessoa extends Model {
    static associate(models) {
      pessoa.hasMany(models.avaliacao, { 
        foreignKey: 'codigo_pessoa', 
      });
    }
  };
  pessoa.init({
    codigo_pessoa: { type: DataTypes.INTEGER,
                     autoIncrement:true,
                     primaryKey:true } , 
    nome: DataTypes.STRING,
    sobrenome: DataTypes.STRING,
    telefone: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    senha: DataTypes.STRING,
    dt_nascimento: DataTypes.STRING,
    genero: DataTypes.STRING,
    endereco: DataTypes.STRING,
    tipo: DataTypes.STRING,
    foto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'pessoa',
    freezeTableName: true
  });
  return pessoa;
};