'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class instituicao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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