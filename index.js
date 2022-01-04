const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const connections = require('./database/database')

// Database 
connections
  .authenticate()
      .then(() => {
          console.log('Conexão feita com o banco de dados!')
      }).catch((msgErro) => {
          console.log('Falha na conexão com o banco de dados! '+ msgErro)
      })

// Estou dizendo para o Express usar o EJS como view engine. Renderizador HTML.
app.set('view engine', 'ejs');
// Dizemos para o Express usar a pasta static que é a Public
app.use(express.static('public'));

// Faz com que o BodyParser colete e traduza os dados enviados 
// pelo formulário para JS.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()); // permite ler dados enviados via JSON (API)

//---------- ROTAS

app.get('/', (req, res) => {
  res.render("index")
})

app.get("/perguntar", (req, res) => {
  res.render("perguntar")
})

app.post('/salvarpergunta', (req, res) => {
  var titulo = req.body.titulo
  var descricao = req.body.descricao
  res.send(`Dados Recebidos!<br>
  -------------------------------<br>
  Titulo: ${titulo}<br>
  -------------------------------<br>
  Descricao: ${descricao}<br>
  `)
})

app.listen(8081, () => {
  console.log('Server listening on port 8085')
})