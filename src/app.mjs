import express from 'express';
import { config } from './config.mjs';
import { getClubhouseEpicData } from "./controllers/clubhouse-controller.mjs";
import { getStoryDependenciesData } from './controllers/clubhouse-controller.mjs';
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use(express.static('src/static'));

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

export function start() {
    app.listen(config.port, () => {
        console.log(`App listening on port ${config.port}!`)
    });
}