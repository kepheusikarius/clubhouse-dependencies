const express = require('express');
require("dotenv").config();
const { getStoryDependenciesData } = require('./controllers/clubhouse-controller');
const app = express();

app.use(express.static(__dirname));

app.set('view engine', 'ejs');

const cytoscapeConfig = {
  layout: {
    name: 'dagre',
  },
  style: [ // the stylesheet for the graph
    {
      selector: 'node',
      style: {
        'background-color': '#063970',
        'label': 'data(name)',
      }
    },

    {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#76b5c5',
        'target-arrow-color': '#76b5c5',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier'
      }
    }
  ],
};

app.get('/', (req, res) => {
  res.render('index', {
    cytoscapeConfig,
  });
});

app.get('/epics/:epicId', async (req, res) => {
  const epicId = req.params.epicId;
  const cytoscapeData = await getStoryDependenciesData(epicId);

  const config = {
    elements: cytoscapeData,
    ...cytoscapeConfig,
  }
  
  res.render('index', {
    cytoscapeConfig: config,
  });
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`App listening on port ${process.env.SERVER_PORT}!`)
});
