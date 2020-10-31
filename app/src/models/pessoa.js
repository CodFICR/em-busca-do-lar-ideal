'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pessoa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
    freezeTableName: true,
    timestamps: false
  });
  return pessoa;
};