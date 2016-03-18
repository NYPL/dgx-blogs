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
  const blogsApiUrl = parser.getCompleteApi(blogsOptions);

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
  .route('/*')
  .get(BlogsApp);

export default router;
