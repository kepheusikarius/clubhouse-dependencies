const express = require('express');
require("dotenv").config();
const cytoscape = require('cytoscape');
const { getStoryDependenciesData } = require('./controllers/clubhouse-controller');
const app = express();
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname+'/index.html')
});

app.get('/epics/:epicId', async (req, res) => {
  const epicId = req.params.epicId;
  const cytoscapeData = await getStoryDependenciesData(epicId);
  
  res.json({ data: cytoscapeData })
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`App listening on port ${process.env.SERVER_PORT}!`)
});
