const { builtinModules } = require("module");

function convertStoriesToCytoscapeNodesAndEdges(stories) {
  const nodes = [];
  const edges = [];
  
  stories.forEach(story => {
    nodes.push({
      data: {
        id: story.id,
        name: story.name,
        href: story.app_url,
      }
    });
          
    if(story.blocked) {
      story.story_links.forEach(link => {
        if (link.verb === 'blocks' && link.type === 'object') {
          edges.push({
            data: {
              id: `${link.subject_id}-${story.id}`,
              source: link.subject_id,
              target: story.id,
            }
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

module.exports = {
  convertStoriesToCytoscapeNodesAndEdges
}