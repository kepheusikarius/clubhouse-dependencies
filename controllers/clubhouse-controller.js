const axios = require('axios').default;

export async function getClubhouseEpic() {
    const apiKey = process.env.CLUBHOUSE_API_KEY;
    return 'epic dude'
}

export function getClubhouseStories() {
    return 'what a story!'
}

export default {
    getClubhouseEpic,
    getClubhouseStories
}