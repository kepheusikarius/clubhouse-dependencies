export function convertStoriesToCytoscapeNodesAndEdges(stories) {
  const nodeMap = new Map();
  const edgeMap = new Map();
  
  stories.forEach(story => {
    nodeMap.set(story.id, _makeNode(story));
    
    if (story.blocked) {
      story.story_links.forEach(link => {
        const edge = _makeEdge(story, link);
        if (edge) {
          edgeMap.set(edge.data.id, edge);
        }
      })
    }
  });

  const nodes = Array.from(nodeMap.values());
  const edges = Array.from(edgeMap.values())
                     .filter(e => nodeMap.has(e.data.source) && nodeMap.has(e.data.target));

  return {
    nodes,
    edges,
  }
}

function _makeNode(story) {
  let colour = '#063970';

  if(story.completed) {
    colour = 'green';
  } else if(story.blocker) {
    colour = 'red';
  } else if(story.started) {
    colour = 'blue';
  }

  return {
    data: {
      id: story.id,
      name: story.name,
      link: story.app_url,
    },
    style: {
      backgroundColor: colour,
    },
  };
}

function _makeEdge(story, link) {
  const sourceId = link.subject_id;
  const targetId = story.id;

  if (link.verb !== 'blocks' || link.type !== 'object') {
    return null;
  }

  return {
    data: {
      id: `${sourceId}-${targetId}`,
      source: sourceId,
      target: targetId,
    }
  };
}