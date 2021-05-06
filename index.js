const express = require('express');
require("dotenv").config();
const cytoscape = require('cytoscape');
const { getClubhouseEpic } = require('./controllers/clubhouse-controller');
const app = express();
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname+'/index.html')
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`App listening on port ${process.env.SERVER_PORT}!`)
});
