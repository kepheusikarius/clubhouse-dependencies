export let config = {
  graph: {
    layout: {
      name: 'dagre',
    },
    style: [
      {
        selector: 'node',
        style: {
          'background-color': '#063970',
          label: 'data(name)',
          'text-wrap': 'wrap',
          'text-max-width': 80,
          'font-size': 10,
        },
      },
      {
        selector: 'edge',
        style: {
          width: 2,
          'line-color': '#76b5c5',
          'target-arrow-color': '#76b5c5',
          'target-arrow-shape': 'triangle',
          'curve-style': 'bezier',
        },
      },
    ],
  },
};

export function loadConfig() {
  config['port'] = process.env.PORT || 3000;
  config['sc_url'] = process.env.SHORTCUT_URL || 'https://api.app.shortcut.com/api';
  config['sc_api_key'] = process.env.SHORTCUT_TOKEN;
}
