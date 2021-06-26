# clubhouse-dependencies
App for creating dependency visualizations for Clubhouse epics

## Running the server

1. Run `npm install`
2. Set these env vars:
  - `SERVER_PORT` - default: `3000`
  - `CLUBHOUSE_URL` - default: `https://api.clubhouse.io/api`
  - `CLUBHOUSE_API_KEY` - create an [api key in clubhouse](https://app.clubhouse.io/dashhudson/settings/account/api-tokens)
3. Run `npm start`
4. Visit `http://localhost:<SERVER_PORT>/epics/<epic_id>`
