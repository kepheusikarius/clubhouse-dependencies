const { builtinModules } = require("module");

function convertStoriesToCytoscapeNodesAndEdges(stories) {
  const nodes = [];
  const edges = [];
  
  stories.forEach(story => {
    let colour = '#e3cbb6'
    if(story.completed){
      colour = 'green';
    }

    nodes.push({
      data: {
        id: story.id,
        name: story.name,
        link: story.app_url,
      },
      style: {
        backgroundColor: colour,
      },
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