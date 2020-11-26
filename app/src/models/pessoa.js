'use strict';
const bcrypt = require('bcryptjs');
<<<<<<< HEAD
=======

>>>>>>> 6d924f083f8437effe00b321d02f6e58c5870790
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pessoa extends Model {

    static associate(models) {

      pessoa.hasMany(models.avaliacao, {
        foreignKey: 'codigo_pessoa',
      });

      pessoa.hasMany(models.adocao,{
        foreignKey:'codigo_pessoa'
      })
      
    }

    checkoutPassword(password){
      return bcrypt.compare(password, this.senha);  
    }

  };
  pessoa.init({
    codigo_pessoa: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING
    },
    sobrenome: {
      type: DataTypes.STRING
    },
    telefone: {
      type: DataTypes.STRING
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
    dt_nascimento: {
      type: DataTypes.DATE,  
=======
    dt_nascimento: {
      type: DataTypes.STRING
>>>>>>> 6d924f083f8437effe00b321d02f6e58c5870790
    },
    genero: {
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
    tipo: {
      type: DataTypes.STRING,
      defaultValue:"Pessoa"
    },
    foto: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'pessoa',
    freezeTableName: true
  });

  

  return pessoa;
};