const express = require('express');
const morgan = require('morgan')
const favicon = require('serve-favicon')
const sequelize = require('./src/db/sequelize')
const bodyParser = require('body-parser');


const app = express()
const port = 3000


app
  .use(favicon(__dirname + '/favicon.ico'))
  .use(morgan('dev'))
  .use(bodyParser.json())
  .use(express.static(__dirname + '/public'));
  //.use(express.json())

sequelize.initDb()

// Here we'll place our future endpoints.
// Ici nous placerons nos futures points de terminaisons.

require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')

app.get('/accueil', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

