import express from 'express';
import { config } from './config.mjs';
import { getEpics, getEpic, getStoryDependenciesData } from './controllers/shortcut-controller.mjs';
const app = express();

app.set('view engine', 'hbs');
app.set('views', 'src/views');
app.use(express.static('src/static'));

app.get('/', async (req, res) => {
  const epics = await getEpics();
  res.render('index', { epics });
});

app.get('/epics/:epicId', async (req, res) => {
  const epicId = req.params.epicId;
  const cytoscapeData = await getStoryDependenciesData(epicId);
  const epicData = await getEpic(epicId);

  const cytoscapeConfig = {
    cytoscapeData: {
      elements: cytoscapeData,
      ...config.graph,
    },
    epicData,
  };

  res.render('epic', { cytoscapeConfig: JSON.stringify(cytoscapeConfig) });
});

export function start() {
  app.listen(config.port, () => {
    console.log(`App listening on port ${config.port}!`);
  });
}
