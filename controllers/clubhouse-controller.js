const axios = require('axios').default;

function convertStoriesToCytoscapeNodesAndEdges(stories) {
  console.log(stories);
  const nodes = [];
  const edges = [];

  stories.forEach(story => {
    nodes.push({
      id: story.id,
    })
        
    if(story.blocked) {
      story.story_links.forEach(link => {
        if (link.verb === 'blocks' && link.type === 'object') {
          edges.push({
            id: `${link.subject_id}-${story.id}`,
            source: link.subject_id,
            target: story.id,
          })
        }
      })
    }
  });
  
  return {
    nodes,
    edges,
  }
}

async function getClubhouseEpicStories(epicId) {
  const apiKey = process.env.CLUBHOUSE_API_KEY;
  const clubhouseUrl = process.env.CLUBHOUSE_URL;

  res = await axios.get(`${clubhouseUrl}/epics/${epicId}/stories`, {
    headers: {
      "Clubhouse-Token": apiKey
    }
  });
  const nodesAndEdges = convertStoriesToCytoscapeNodesAndEdges(res.data);
  return nodesAndEdges;
}

module.exports = {
  getClubhouseEpicStories,
}