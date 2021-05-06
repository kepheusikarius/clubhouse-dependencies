const axios = require('axios').default;

async function getClubhouseEpic() {
    const apiKey = process.env.CLUBHOUSE_API_KEY;
    const clubhouseUrl = process.env.CLUBHOUSE_URL;

    res = await axios.get(`${clubhouseUrl}/epics`, {
        headers: {
            "Clubhouse-Token": apiKey
        }
    });
    console.log(res);
    return res;
}

function getClubhouseStories() {
    return 'what a story!'
}

module.exports = {
    getClubhouseEpic,
    getClubhouseStories,
}