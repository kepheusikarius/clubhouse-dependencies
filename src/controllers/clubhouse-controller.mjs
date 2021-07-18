import axios from 'axios';
import { convertStoriesToCytoscapeNodesAndEdges } from '../utils/cytoscapeUtils.mjs';
import { config } from '../config.mjs';

export async function getStoryDependenciesData(epicId) {
  const stories = await getClubhouseEpicStories(epicId);
  const cytoscapeData = convertStoriesToCytoscapeNodesAndEdges(stories);

  return cytoscapeData;
}

export async function getClubhouseEpicStories(epicId) {
  let res = await axios.get(`${config.ch_url}/v3/epics/${epicId}/stories`, {
    headers: {
      'Clubhouse-Token': config.ch_api_key,
    },
  });

  return res.data;
}

export async function getClubhouseEpicData(epicId) {
  let res = await axios.get(`${config.ch_url}/v3/epics/${epicId}`, {
    headers: {
      'Clubhouse-Token': config.ch_api_key,
    },
    description: {
      includes_description: true,
    },
  });

  return res.data;
}
