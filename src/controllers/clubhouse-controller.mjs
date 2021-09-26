import axios from 'axios';
import { convertStoriesToCytoscapeNodesAndEdges } from '../utils/cytoscapeUtils.mjs';
import { config } from '../config.mjs';

function _getHeaders() {
  return {
    'Shortcut-Token': config.ch_api_key,
  };
}

export async function getStoryDependenciesData(epicId) {
  const stories = await getClubhouseEpicStories(epicId);
  const cytoscapeData = convertStoriesToCytoscapeNodesAndEdges(stories);

  return cytoscapeData;
}

export async function getClubhouseEpics() {
  let res = await axios.get(`${config.ch_url}/v3/epics`, {
    headers: _getHeaders(),
  });

  return res.data;
}

export async function getClubhouseEpicStories(epicId) {
  let res = await axios.get(`${config.ch_url}/v3/epics/${epicId}/stories`, {
    headers: _getHeaders(),
  });

  return res.data;
}

export async function getClubhouseEpicData(epicId) {
  let res = await axios.get(`${config.ch_url}/v3/epics/${epicId}`, {
    headers: _getHeaders(),
    description: {
      includes_description: true,
    },
  });

  return res.data;
}
