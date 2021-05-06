const express = require('express');
require("dotenv").config();
const cytoscape = require('cytoscape');
const { getClubhouseEpic } = require('./controllers/clubhouse-controller');
const app = express();

app.get('/', (req, res) => {
  res.send(indexRouter())
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`App listening on port ${process.env.SERVER_PORT}!`)
});

function indexRouter(){
  return 'Hello World!';
}