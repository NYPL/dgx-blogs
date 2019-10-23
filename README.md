# NYPL Blogs app

## Version
> v0.3.13

## Install

Checkout the `development` branch and perform `nvm use; npm install`

**In OSX, if you encounter install issues**, you may be helped by [this SO post](https://stackoverflow.com/a/52633713/2092409) - which, depending on the state of your Command Line Tools, may just boil down to running:

```
CXXFLAGS="-mmacosx-version-min=10.9" LDFLAGS="-mmacosx-version-min=10.9" npm install
```

## Running Locally

*Note: Running `npm start` or `npm run dist` may dump a bunch of stack traces to stdout. [They may be safe to ignore](#stacktraces-in-logs)*

### Dev Server

To run the app locally, run `npm start` and go to http://localhost:3001/blog/beta/
The Webpack Dev Server will serve static files from localhost:3000

### Production

To run the app in production mode, run:

* npm run dist
* NODE_ENV=production npm start

`npm run dist` will compile and minify the Javascript and SCSS.
`NODE_ENV=production` is an environment variable that tells the app to run in production mode,
and to not start the webpack dev server.

## Contributing

### Git Workflow

 - Cut feature branch from `development`
 - Create PR against `development`
 - After approval, author merges feature into `development` (Note development CD currently disabled)
 - Merge `development` > `qa`
 - Merge `qa` > `master` (production)

## Troubleshooting

### Stacktraces in logs

Under Node v6.11.5 (and v6.10.3), installed dependencies seem to spew a lot of warnings like this:

```
$ npm run dist
> dgx-blogs@0.3.10 dist /Users/_/projects/nypl/dgx-blogs
> NODE_ENV=production webpack --config webpack.config.js

clean-webpack-plugin: /Users/_/projects/nypl/dgx-blogs/dist has been removed.
(node) v8::ObjectTemplate::Set() with non-primitive values is deprecated
(node) and will stop working in the next major release.

==== JS stack trace =========================================

Security context: 0x2f2a10cf781 <JS Object>#0#
    1: .node [module.js:597] [pc=0x1ff6ea41bc44] (this=0x7e9e1695969 <an Object with deprecated map 0x1b1113e1ba11>#1#,module=0x146cb484181 <a Module with map 0x1b1113e1cf61>#2#,filename=0x146cb482859 <String[100]: /Users/_/projects/nypl/dgx-blogs/node_modules/node-sass/vendor/darwin-x64-48/binding.node>)
    2: load [module.js:~478] [pc=0x1ff6ea6aaec3] (this=0x146cb484181 <a Module with map 0x1b1113e1cf61>#2#,filename=0x146cb482859 <String[100]: /Users/_/projects/nypl/dgx-blogs/node_modules/node-sass/vendor/darwin-x64-48/binding.node>)
    3: tryModuleLoad(aka tryModuleLoad) [module.js:446] [pc=0x1ff6ea342afd] (this=0x2f2a1004381 <undefined>,module=0x146cb484181 <a Module with map 0x1b1113e1cf61>#2#,filename=0x146cb482859 <String[100]: /Users/_/projects/nypl/dgx-blogs/node_modules/node-sass/vendor/darwin-x64-48/binding.node>)
    4: _load [module.js:~412] [pc=0x1ff6eaae3e6c] (this=0x7e9e16959e9 <JS Function Module (SharedFunctionInfo 0x7e9e1638c99)>#3#,request=0x146cb481439 <String[100]: /Users/_/projects/nypl/dgx-blogs/node_modules/node-sass/vendor/darwin-x64-48/binding.node>,parent=0x146cb468901 <a Module with map 0x1b1113e1cf61>#4#,isMain=0x2f2a1004271 <false>)
```

Apparently these are [just warnings](https://stackoverflow.com/questions/36897992/nodejs-upgrade-causing-stack-trace) where old packages are hitting deprecation warnings in Node v6. Upgrading a few packages may cause the warnings to disappear.

Note a similar thing is happening in [dgx-new-arrivals](https://github.com/NYPL/dgx-new-arrivals), which seems to share Node version and a lot of boilerplate.

### "error calling API" in logs

At writing, connecting the app to production refinery produces a lot of errors in the logs, which appear to be 404s against this URL:

https://www.nypl.org/refinery/api/v0.1/node/blog?limit=25&offset=1&filter[_enhanced][uri_relative]=blog%2Fbeta%2F

This is also happening in the production EB deployment.

### Front-end bugs

At writing (in OSX 10.14.5, using both FF 67.0.4 & Chrome 75.0.3770.100) following "READ MORE" links from the main blog index (/blob/beta) has a bug where the "LOADING..." overlay never disappears - although blog content is faintly visible beneath.
