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

function fetchApiData(url) {
  return axios.get(url);
}

function getHeaderData() {
  const headerApiUrl = parser.getCompleteApi(headerOptions);
  return fetchApiData(headerApiUrl);
}

function fetchData(url, storeValue, req, res, next) {
  axios
    .all([getHeaderData(), fetchApiData(url)])
    .then(axios.spread((headerData, blogsData) => {
      const headerParsed = parser.parse(headerData.data, headerOptions);
      const headerModelData = HeaderItemModel.build(headerParsed)

      const blogsParsed = parser.parse(blogsData.data, blogsOptions);
      const blogsModelData = BlogsModel.build(blogsParsed);

      res.locals.data = {
        BlogStore: {
          [storeValue]: blogsModelData,
        },
        HeaderStore: {
          headerData: headerModelData,
        },
      };
      next();
    }))
    .catch(error => {
      console.log(`error calling API : ${error}`);
      console.log(`Attempted to call : ${url}`);

      res.locals.data = {
        BlogStore: {
          [storeValue]: []
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

// For the main /blog route
function BlogsMainList(req, res, next) {
  // Needs to be called before `parser.getCompleteApi()`
  blogsOptions.filters = {};
  const blogsApiUrl = parser.getCompleteApi(blogsOptions); // + blogsApi.pageSize;

  fetchData(blogsApiUrl, 'blogs', req, res, next);
}

// This will be used to any route on:
// /blog/:blog /blog/subjects/:subject /blog/series/:series blog/author/:author
function BlogQuery(req, res, next) {
  const param = req.params[0];
  const paramArray = param.split('/');
  blogsOptions.filters = {};

  let storeValue = 'blogs';

  if (paramArray[0] === 'author') {
    if (paramArray[1] !== '') {
      blogsOptions.filters = { relationships: { 'blog-profiles': paramArray[1] } };
    }
  } else if (paramArray[0] === 'series') {
    if (paramArray[1] !== '') {
      blogsOptions.filters = { relationships: { 'blog-series': paramArray[1] } };
    }
  } else if (paramArray[0] === 'subjects') {
    if (paramArray[1] !== '') {
      blogsOptions.filters = { relationships: { 'blog-subjects': paramArray[1] } };
    }
  } else {
    // Single blog post, query by blog post alias:
    blogsOptions.filters = { alias: `blog/${req.params[0]}`};
    storeValue = 'blogPost';
  }

  const blogsApiUrl = parser.getCompleteApi(blogsOptions); // + blogsApi.pageSize;
  console.log(blogsApiUrl);

  fetchData(blogsApiUrl, storeValue, req, res, next);
}

router
  .route('/blog')
  .get(BlogsMainList);

router
  .route(/\/blog\/([^]+)\/?/)
  .get(BlogQuery);


export default router;
