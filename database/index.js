const Sequelize = require('sequelize');
const connection = require('./database');

const Pergunta = connection.define('pergunta', {
    titulo: {
      type: Sequelize.STRING,
      allowNull: false
    },
    descricao: {
      type: Sequelize.TEXT,
      allowNull: false
    }
})

// caso a tabela já exita ele NÃO IRÁ FORÇAR a criação dela novamente.
Pergunta.sync({force: false})

