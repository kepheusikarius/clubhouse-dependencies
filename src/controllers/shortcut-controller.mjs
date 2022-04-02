import axios from 'axios';
import { convertStoriesToCytoscapeNodesAndEdges } from '../utils/cytoscapeUtils.mjs';
import { config } from '../config.mjs';

function _getHeaders() {
  return {
    'Shortcut-Token': config.sc_api_key,
  };
}

export async function getStoryDependenciesData(epicId) {
  const stories = await getEpicStories(epicId);
  const cytoscapeData = convertStoriesToCytoscapeNodesAndEdges(stories);

  return cytoscapeData;
}

export async function getEpics() {
  let res = await axios.get(`${config.sc_url}/v3/epics`, {
    headers: _getHeaders(),
  });

  return res.data;
}

export async function getEpicStories(epicId) {
  let res = await axios.get(`${config.sc_url}/v3/epics/${epicId}/stories`, {
    headers: _getHeaders(),
  });

  return res.data;
}

export async function getEpic(epicId) {
  let res = await axios.get(`${config.sc_url}/v3/epics/${epicId}`, {
    headers: _getHeaders(),
    description: {
      includes_description: true,
    },
  });

  return res.data;
}
