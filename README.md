# clubhouse-dependencies
App for creating dependency visualizations for Clubhouse epics

## Running the server

1. Run `npm install`
2. Set these env vars:
  - `SERVER_PORT` - `3000` is a good default
  - `CLUBHOUSE_URL` - use `https://api.clubhouse.io/api/v3`
  - `CLUBHOUSE_API_KEY` - create an [api key in clubhouse](https://app.clubhouse.io/dashhudson/settings/account/api-tokens)
3. Run `npm run serve`
4. Visit `http://localhost:<SERVER_PORT>/epics/<epic_id>`
