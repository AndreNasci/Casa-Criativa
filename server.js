// express cria e configura servidor
const express = require ('express')
const server = express()

const ideas = [
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
    title: "Cursos de Programação",
    category: "Estudo",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium numquam eum a alias",
    url: "https://github.com/"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729069.svg",
    title: "Exercícios",
    category: "Saúde",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium numquam eum a alias",
    url: "https://github.com/"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
    title: "Meditação",
    category: "Mentalidade",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium numquam eum a alias",
    url: "https://github.com/"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729017.svg",
    title: "Horta",
    category: "Jardim",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium numquam eum a alias",
    url: "https://github.com/"
  },
]

// Configuração de arquivos estáticos(css, scripts, img)
server.use(express.static("public"))
// vai entender que os arquivos dessa pasta estão na 
// pasta raiz


// Configuração do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
  // variável server faz o link com o express
  express: server,
  noCache: true, // para evitar erros de atualizações
})


// cria uma rota '/'
// captura o pedido do cliente para responder
server.get("/", function(req, res) {

  const reversedIdeas = [...ideas].reverse()
  
  let lastIdeas = []
  // for inverso
  for(idea of reversedIdeas) {
    if(lastIdeas.length < 2) {
      lastIdeas.push(idea)
    }
  }

  
  return res.render("index.html", { ideas: lastIdeas })
})

server.get("/ideias", function(req, res) {
  const reversedIdeas = [...ideas].reverse()

  return res.render("ideias.html", {ideas: reversedIdeas})
})

server.listen(3000);
