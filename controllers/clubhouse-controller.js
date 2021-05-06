const axios = require('axios').default;
const { convertStoriesToCytoscapeNodesAndEdges } = require('../utils/cytoscapeUtils');

async function getStoryDependenciesData(epicId) {
  const stories = await getClubhouseEpicStories(epicId);
  const cytoscapeData = convertStoriesToCytoscapeNodesAndEdges(stories);

  return cytoscapeData;
}

async function getClubhouseEpicStories(epicId) {
  const apiKey = process.env.CLUBHOUSE_API_KEY;
  const clubhouseUrl = process.env.CLUBHOUSE_URL;

  res = await axios.get(`${clubhouseUrl}/epics/${epicId}/stories`, {
    headers: {
      "Clubhouse-Token": apiKey
    }
  });

  return res.data;
}

module.exports = {
  getStoryDependenciesData,
}