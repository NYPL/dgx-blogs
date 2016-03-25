import express from 'express';
import axios from 'axios';
import parser from 'jsonapi-parserinator';

import Model from 'dgx-model-data';

import appConfig from '../../../appConfig.js';

const { HeaderItemModel } = Model;
const { api, headerApi, blogsApi } = appConfig;
const router = express.Router();
const appEnvironment = process.env.APP_ENV || 'production';
const apiRoot = api.root[appEnvironment];
const headerOptions = createOptions(headerApi);
const blogsOptions = createOptions(blogsApi);

function createOptions(api) {
  return {
    endpoint: `${apiRoot}${api.endpoint}`,
    includes: api.includes,
    filters: api.filters,
  };
}

function fetchApiData(url) {
  return axios.get(url);
}

function getHeaderData() {
  const headerApiUrl = parser.getCompleteApi(headerOptions);
  return fetchApiData(headerApiUrl);
}

function BlogsApp(req, res, next) {
  // Uncomment out the end of the next line to limit to 10 blogs.
  const blogsApiUrl = parser.getCompleteApi(blogsOptions); // + blogsApi.pageSize;
  console.log('ALL BLOGS');
  console.log(req.params);

  axios
    .all([getHeaderData(), fetchApiData(blogsApiUrl)])
    .then(axios.spread((headerData, blogsData) => {
      const headerParsed = parser.parse(headerData.data, headerOptions);
      const headerModelData = HeaderItemModel.build(headerParsed)
      const blogsParsed = parser.parse(blogsData.data, blogsOptions);
      // Still need to model the blog data.

      res.locals.data = {
        BlogStore: {
          _angularApps: ['Locations', 'Divisions', 'Profiles'],
          _reactApps: ['Staff Picks', 'Header', 'Book Lists'],
          blogs: blogsParsed,
        },
        HeaderStore: {
          headerData: headerModelData,
        },
      };
      next();
    }))
    .catch(error => {
      console.log('error calling API : ' + error);
      console.log('Attempted to call : ' + blogsApiUrl);

      res.locals.data = {
        BlogStore: {
          _angularApps: ['Locations', 'Divisions', 'Profiles'],
          _reactApps: ['Staff Picks', 'Header', 'Book Lists'],
        },
      };

      // The next is needed so that Express knows to go to the
      // next middleware in the line.
      // This would be the app.use('/', ...) call in server.js.
      next();
    }); /* end Axios call */
}

function SingleBlog(req, res, next) {
  blogsOptions.filters = { alias: `blog/${req.params[0]}`};
  console.log(blogsOptions);
  const blogsApiUrl = parser.getCompleteApi(blogsOptions); // + blogsApi.pageSize;
  console.log('SINGLE BLOG');
  console.log(req.params[0]);

  axios
    .all([getHeaderData(), fetchApiData(blogsApiUrl)])
    .then(axios.spread((headerData, blogsData) => {
      const headerParsed = parser.parse(headerData.data, headerOptions);
      const headerModelData = HeaderItemModel.build(headerParsed)
      const blogsParsed = parser.parse(blogsData.data, blogsOptions);
      // Still need to model the blog data.

      res.locals.data = {
        BlogStore: {
          _angularApps: ['Locations', 'Divisions', 'Profiles'],
          _reactApps: ['Staff Picks', 'Header', 'Book Lists'],
          blogs: blogsParsed,
        },
        HeaderStore: {
          headerData: headerModelData,
        },
      };
      next();
    }))
    .catch(error => {
      console.log('error calling API : ' + error);
      console.log('Attempted to call : ' + blogsApiUrl);

      res.locals.data = {
        BlogStore: {
          _angularApps: ['Locations', 'Divisions', 'Profiles'],
          _reactApps: ['Staff Picks', 'Header', 'Book Lists'],
        },
      };

      // The next is needed so that Express knows to go to the
      // next middleware in the line.
      // This would be the app.use('/', ...) call in server.js.
      next();
    }); /* end Axios call */
}

router
  .route('/blog')
  .get(BlogsApp);

router
  .route(/\/blog\/author/)
  .get(BlogsApp);

router
  .route(/\/blog\/series/)
  .get(BlogsApp);

router
  .route(/\/blog\/([^]+)\/?/)
  .get(SingleBlog);

export default router;
