'use strict';

const bcrypt = require('bcryptjs');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class instituicao extends Model {

    static associate(models) {

      instituicao.hasMany(models.avaliacao, {
        foreignKey: 'codigo_instituicao',
      });
      instituicao.hasMany(models.animal,{
        foreignKey:'codigo_instituicao'
      });
    }

    checkoutPassword(password){
      return bcrypt.compare(password,this.senha);
    }
    
  };
  instituicao.init({
    codigo_instituicao: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    senha: {
      type: DataTypes.STRING
    },
    password:{
      type: DataTypes.VIRTUAL,
    },
<<<<<<< HEAD
    confirmPassword:{
      type: DataTypes.VIRTUAL
    },
=======
>>>>>>> 6d924f083f8437effe00b321d02f6e58c5870790
    situacao: {
      type: DataTypes.STRING,
      defaultValue:"APROVADO"
    },
    telefone: {
      type: DataTypes.STRING
    },
    foto: {
      type: DataTypes.STRING
    },
    cnpj: {
      type: DataTypes.STRING
    },
    bairro: {
      type: DataTypes.STRING
    },
    cidade: {
      type: DataTypes.STRING
    },
    estado: {
      type: DataTypes.STRING
    },
    nome_instituicao: {
      type: DataTypes.STRING
    },
    nome_responsavel: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'instituicao',
    freezeTableName: true
  });
  return instituicao;
};