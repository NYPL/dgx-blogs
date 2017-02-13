# NYPL Blogs app

# Install
Checkout the `development` branch and perform `npm install`

# Dev Server
To run the app locally, run `npm start` and go to localhost:3001
The Webpack Dev Server will serve static files from localhost:3000

# Production
To run the app in production mode, run:

* npm run dist
* NODE_ENV=production npm start

`npm run dist` will compile and minify the Javascript and SCSS.
`NODE_ENV=production` is an environment variable that tells the app to run in production mode,
and to not start the webpack dev server.

## Changelog

### v0.1.11
#### Added
- Added HTTPS fix and the JavaScript fallback for the log in button on the Header Component.

### v0.1.10
#### Added
- Enabled Feature Flags plugin on the client-side and added Optimizely script in the index.ejs file.
