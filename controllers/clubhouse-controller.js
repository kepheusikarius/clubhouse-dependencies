const axios = require('axios').default;

async function getClubhouseEpic(epicId) {
  const apiKey = process.env.CLUBHOUSE_API_KEY;
  const clubhouseUrl = process.env.CLUBHOUSE_URL;

  res = await axios.get(`${clubhouseUrl}/epics/${epicId}`, {
    headers: {
      "Clubhouse-Token": apiKey
    }
  });
  return res;
}

function getClubhouseStories() {
  return 'what a story!'
}

module.exports = {
  getClubhouseEpic,
  getClubhouseStories,
}