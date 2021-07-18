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
      });
    }
  });

  const nodes = Array.from(nodeMap.values());
  const edges = Array.from(edgeMap.values()).filter(e => nodeMap.has(e.data.source) && nodeMap.has(e.data.target));

  return {
    nodes,
    edges,
  };
}

function _makeNode(story) {
  let colour = '#063970';
  let state = 'ready';

  if (story.completed) {
    colour = 'green';
    state = 'done';
  } else if (story.started) {
    colour = 'blue';
    state = 'started';
  } else if (story.blocker) {
    colour = 'red';
  } else if (story.project_id === 36662) {
    colour = 'purple';
  }

  return {
    data: {
      id: story.id,
      name: story.name,
      link: story.app_url,
      state,
      type: story.project_id === 36662 ? 'user_story' : story.story_type,
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
    },
  };
}
