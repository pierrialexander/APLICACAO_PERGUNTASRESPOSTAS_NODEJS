const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const connections = require('./database/database')
const Pergunta = require('./database/Pergunta')
const Resposta = require('./database/Resposta')

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

// Rota da Index
app.get('/', (req, res) => {
  // Equivalente ao SELECT * ALL do SQL, passando apenas uma pesquisa crua
  Pergunta.findAll({ raw: true, order: [
    ['id','DESC'] // ASC = Crescente || DESC = Decrescente
  ] }).then((perguntas) => {
    res.render("index", {
      perguntas: perguntas
    })
  })
  
})


// Roda do Formulario de pergunta
app.get("/perguntar", (req, res) => {
  res.render("perguntar")
})


// ROTA que recebe os dados do formulario
app.post('/salvarpergunta', (req, res) => {
  var titulo = req.body.titulo
  var descricao = req.body.descricao


  // Pegamos o model e damos um CREATE (insert do sql)
  // Salvando perguntas no banco de dados
  Pergunta.create({
    titulo: titulo,
    descricao: descricao
  }).then(() => {
    res.redirect("/");
  })
})

app.get("/pergunta/:id", (req, res) => {
  var id = req.params.id
  Pergunta.findOne({ // igual o Select * where... do SQL
    where: {id: id}
  }).then((pergunta) => {
      if (pergunta != undefined) { // Pergunta encontrada
        res.render("pergunta", {
          pergunta: pergunta
        })
      }else{
        res.redirect("/")
      }
  })
})

app.listen(8081, () => {
  console.log('Server listening on port 8085')
})