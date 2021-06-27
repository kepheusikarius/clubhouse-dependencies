export let config = {};

export function loadConfig() {
    config = {
        port: (process.env.SERVER_PORT) ? parseInt(process.env.SERVER_PORT) : 80,
        ch_url: process.env.CLUBHOUSE_URL ?? 'https://api.clubhouse.io/api',
        ch_api_key: process.env.CLUBHOUSE_TOKEN,
    };
};
