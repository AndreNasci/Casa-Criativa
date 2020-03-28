// express cria e configura servidor
const express = require ('express')
const server = express()

// pega o que está sendo exportado
const db = require("./db")



// const ideas = [
//   {
//     img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
//     title: "Cursos de Programação",
//     category: "Estudo",
//     description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium numquam eum a alias",
//     url: "https://github.com/"
//   },
//   {
//     img: "https://image.flaticon.com/icons/svg/2729/2729069.svg",
//     title: "Exercícios",
//     category: "Saúde",
//     description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium numquam eum a alias",
//     url: "https://github.com/"
//   },
//   {
//     img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
//     title: "Meditação",
//     category: "Mentalidade",
//     description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium numquam eum a alias",
//     url: "https://github.com/"
//   },
//   {
//     img: "https://image.flaticon.com/icons/svg/2729/2729017.svg",
//     title: "Horta",
//     category: "Jardim",
//     description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium numquam eum a alias",
//     url: "https://github.com/"
//   },
// ]

// Configuração de arquivos estáticos(css, scripts, img)
server.use(express.static("public"))
// vai entender que os arquivos dessa pasta estão na 
// pasta raiz

// habilitar uso do req.body
server.use(express.urlencoded({ extended: true }))


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

  // Consultar dados na tabela
  db.all(`SELECT * FROM ideas`, function(err, rows) {
    if(err) {
      console.log(err)
      return res.send("Erro no banco de dados.")
    }
    const reversedIdeas = [...rows].reverse()
    
    let lastIdeas = []
    // for inverso
    for(idea of reversedIdeas) {
      if(lastIdeas.length < 2) {
        lastIdeas.push(idea)
      }
    }
  
    
    return res.render("index.html", { ideas: lastIdeas })
  })

})

server.get("/ideias", function(req, res) {

  db.all(`SELECT * FROM ideas`, function(err, rows) {
    if(err) {
      console.log(err)
      return res.send("Erro no banco de dados.")
    }
    const reversedIdeas = [...rows].reverse()

    return res.render("ideias.html", {ideas: reversedIdeas})
  })
})

server.post("/", function(req, res) {
  // Inserir dados na tabela
  const query = `
    INSERT INTO ideas(
      image,
      title,
      category,
      description,
      link
    )VALUES (?,?,?,?,?); 
  `
  // ? -> placeholders
  
  const values = [
    req.body.image,
    req.body.title,
    req.body.category,
    req.body.description,
    req.body.link,
  ]

  //cada dado do array valaues substituirá um '?'
  db.run(query, values, function(err) {
    if(err) {
      console.log(err)
      return res.send("Erro no banco de dados.")
    }

    //redireciona pra /ideiasa
    return res.redirect("/ideias")
  })

  console.log(req.body)
})

server.listen(3000);
