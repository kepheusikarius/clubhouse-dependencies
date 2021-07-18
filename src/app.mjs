import express from 'express';
import { config } from './config.mjs';
import { getClubhouseEpicData } from "./controllers/clubhouse-controller.mjs";
import { getStoryDependenciesData } from './controllers/clubhouse-controller.mjs';
const app = express();

app.set('view engine', 'hbs');
app.set('views', 'src/views');
app.use(express.static('src/static'));

const cytoscapeConfig = {
  cytoscapeData: {
    ...config.graph,
  }
};

app.get('/', (req, res) => {
  res.render('index', { cytoscapeConfig: JSON.stringify(cytoscapeConfig), });
});

app.get('/epics/:epicId', async (req, res) => {
  const epicId = req.params.epicId;
  const cytoscapeData = await getStoryDependenciesData(epicId);
  const epicData = await getClubhouseEpicData(epicId);

  const cytoscapeConfig = {
    cytoscapeData: {
      elements: cytoscapeData,
      ...config.graph,
    },
    epicData,
  };

  res.render('index', { cytoscapeConfig: JSON.stringify(cytoscapeConfig), });
});

export function start() {
  app.listen(config.port, () => {
    console.log(`App listening on port ${config.port}!`)
  });
}
