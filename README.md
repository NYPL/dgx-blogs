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

### v0.1.12
#### Updated
- Updated the Header Component to v1.5.5. The updates include integrating the log in related functions with login server, removing console loggings for patron token expiration, and turning off the feature flag of OAuth Login and set it as default.

### v0.1.11
#### Updated
- Updated the Header Component to v1.5.1. The update includes HTTPS fix and the JavaScript fallback for the log in button on the Header Component.

### v0.1.10
#### Added
- Enabled Feature Flags plugin on the client-side and added Optimizely script in the index.ejs file.
