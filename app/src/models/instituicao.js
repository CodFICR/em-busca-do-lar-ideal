'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class instituicao extends Model {
    
    static associate(models) {
      instituicao.hasMany(models.avaliacao, { 
       foreignKey: 'codigo_instituicao', 
      }) 
    }
  };
  instituicao.init({
    codigo_instituicao: {   type: DataTypes.INTEGER,
                            autoIncrement:true,
                            primaryKey:true
                        },
    email: {  type: DataTypes.STRING, 
              unique: true 
            },
    senha: DataTypes.STRING,
    situacao: DataTypes.STRING,
    telefone: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    endereco: DataTypes.STRING,
    nome_instituicao: DataTypes.STRING,
    nome_responsavel: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'instituicao',
    freezeTableName: true,
    timestamps: false
  });
  return instituicao;
};