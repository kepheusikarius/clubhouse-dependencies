export let config = {};

export function loadConfig() {
    config = {
        port: process.env.PORT || 3000,
        ch_url: process.env.CLUBHOUSE_URL || 'https://api.clubhouse.io/api',
        ch_api_key: process.env.CLUBHOUSE_TOKEN,
    };
};
