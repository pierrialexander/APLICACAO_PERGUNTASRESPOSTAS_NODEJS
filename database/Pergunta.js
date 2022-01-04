// MODEL

const Sequelize = require('sequelize');
const connection = require('./database');


const Pergunta = connection.define('perguntas', {
    titulo: {
      type: Sequelize.STRING,
      allowNull: false
    },
    descricao: {
      type: Sequelize.TEXT,
      allowNull: false
    }
})

// Aqui passamos a tabela para que seja criada no banco
// caso a tabela já exita ele NÃO IRÁ FORÇAR a criação dela novamente.
Pergunta.sync({force: false}).then(() => {})

module.exports = Pergunta;

