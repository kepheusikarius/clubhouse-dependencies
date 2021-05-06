const express = require('express');
require("dotenv").config();
const cytoscape = require('cytoscape');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send(indexRouter())
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
});

function indexRouter(){
  return 'Hello World!';
}