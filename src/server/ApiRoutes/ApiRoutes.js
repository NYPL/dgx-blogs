import express from 'express';
import axios from 'axios';
import parser from 'jsonapi-parserinator';

import Model from 'dgx-model-data';

/*
 * @todo check how to make this work as in homepage 
 */
import BlogsModel from '../../app/utils/BlogsModel';

import appConfig from '../../../appConfig.js';

const { HeaderItemModel } = Model;
const { api, headerApi, blogsApi } = appConfig;
const router = express.Router();
const appEnvironment = 'qa'; //process.env.APP_ENV || 'production';
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

function getBlogEndpoint(endpoint) {
  return `${apiRoot}${blogsApi.common}${endpoint}`;
}

function fetchApiData(url) {
  console.log(url)
  return axios.get(url);
}

function getHeaderData() {
  const headerApiUrl = parser.getCompleteApi(headerOptions);
  return fetchApiData(headerApiUrl);
}

function BlogsMainList(req, res, next) {
  blogsOptions.endpoint = getBlogEndpoint(blogsApi.mainEndpoint);
  blogsOptions.filters = {};

  const blogsApiUrl = parser.getCompleteApi(blogsOptions); // + blogsApi.pageSize;


  axios
    .all([getHeaderData(), fetchApiData(blogsApiUrl)])
    .then(axios.spread((headerData, blogsData) => {
      const headerParsed = parser.parse(headerData.data, headerOptions);
      const headerModelData = HeaderItemModel.build(headerParsed)

      const blogsParsed = parser.parse(blogsData.data, blogsOptions);
      const blogsModelData = BlogsModel.build(blogsParsed);

      res.locals.data = {
        BlogStore: {
          blogs: blogsModelData,
        },
        HeaderStore: {
          headerData: headerModelData,
        },
      };
      next();
    }))
    .catch(error => {
      console.log('error calling API : ', error);
      console.log('Attempted to call : ' + blogsApiUrl);

      res.locals.data = {
        BlogStore: {
          blogs: []
        },
        HeaderStore: {
          headerData: [],
        },
      };

      // The next is needed so that Express knows to go to the
      // next middleware in the line.
      // This would be the app.use('/', ...) call in server.js.
      next();
    }); /* end Axios call */
}

function BlogQuery(req, res, next) {
  const param = req.params[0];
  let blogsApiUrl = '';

  blogsOptions.filters = {};

  if (param.indexOf('author') !== -1) {
    console.log('hit the author url');
  } else if (param.indexOf('series') !== -1) {
    console.log('hit the series url');
  } else if (param.indexOf('subject') !== -1) {
    console.log('hit the subject url');
  } else {
    // Single blog post, query by blog post alias:
    blogsOptions.filters = { alias: `blog/${req.params[0]}`};
    // blogsOptions.includes = blogsOptions.includes.concat(['blog-subjects', 'blog-series']);
  }

  blogsApiUrl = parser.getCompleteApi(blogsOptions); // + blogsApi.pageSize;
  // console.log(blogsApiUrl);

  axios
    .all([getHeaderData(), fetchApiData(blogsApiUrl)])
    .then(axios.spread((headerData, blogsData) => {
      const headerParsed = parser.parse(headerData.data, headerOptions);
      const headerModelData = HeaderItemModel.build(headerParsed);

      const blogsParsed = parser.parse(blogsData.data, blogsOptions);
      const blogsModelData = BlogsModel.build(blogsParsed);

      res.locals.data = {
        BlogStore: {
          blogPost: blogsModelData,
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
          blogPost: [],
        },
        HeaderStore: {
          headerData: [],
        },
      };

      // The next is needed so that Express knows to go to the
      // next middleware in the line.
      // This would be the app.use('/', ...) call in server.js.
      next();
    }); /* end Axios call */
}


router
  .route('/blogs')
  .get(BlogsMainList);

router
  .route(/\/blogs\/([^]+)\/?/)
  .get(BlogQuery);


export default router;
