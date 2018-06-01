# NYPL Blogs app

# Version
> v0.3.1

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
