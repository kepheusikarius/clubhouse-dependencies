const express = require('express');
const {getClubhouseEpicData} = require("./controllers/clubhouse-controller");
const { getStoryDependenciesData } = require('./controllers/clubhouse-controller');
require("dotenv").config();
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
        'text-wrap': 'wrap',
        'text-max-width': 80,
        'font-size': 10
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
    },
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
  const epicData = await getClubhouseEpicData(epicId);

  const config = {
    cytoscapeData:{
      elements: cytoscapeData,
      ...cytoscapeConfig,
    },
    epicData: epicData,
  }

  res.render('index', {
    cytoscapeConfig: config,
  });
});

app.get('/epics/:epicId/swimlanes', async (req, res) => {
  const epicId = req.params.epicId;

  const config = {
    something: 'something!',
  }

  res.render('swimlanes', {
    swimlanesConfig: config
  })
})

app.listen(process.env.SERVER_PORT, () => {
  console.log(`App listening on port ${process.env.SERVER_PORT}!`)
});
