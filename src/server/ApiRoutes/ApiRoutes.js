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
  blogsOptions.filters = {};
  const blogsApiUrl = parser.getCompleteApi(blogsOptions);

  fetchData(blogsApiUrl, 'blogs', req, res, next);
}

// This will be used to any route on:
// /blog/:blog /blog/subjects/:subject /blog/series/:series blog/author/:author
function BlogQuery(req, res, next) {
  const param = req.params[0];
  const paramArray = param.split('/');
  let blogType = paramArray[0];
  let queryValue = paramArray[1];
  let storeValue = 'blogs';

  blogsOptions.filters = {};

  // For the reverse proxy, the main path `/` is read here.
  if (!paramArray[0] && !paramArray[1]) {
    return BlogsMainList(req, res, next);
  }

  // This is for the reverse proxy since the reverse proxy site reads the
  // server path without `/blog`.
  // Example: /blog/author/karen-gisonny is read as /author/karen-gisonny
  if (paramArray[1] !== '' &&  paramArray[1] !== 'blog') {
    blogType = paramArray[1];
    queryValue = paramArray[2];
  }

  if (blogType === 'author') {
    if (queryValue !== '') {
      blogsOptions.filters = { relationships: { 'blog-profiles': queryValue } };
    }
  } else if (blogType === 'series') {
    if (queryValue !== '') {
      blogsOptions.filters = { relationships: { 'blog-series': queryValue } };
    }
  } else if (blogType === 'subjects') {
    if (queryValue !== '') {
      blogsOptions.filters = { relationships: { 'blog-subjects': queryValue } };
    }
  } else {
    // Single blog post, query by blog post alias:
    blogsOptions.filters = { alias: `blog/${req.params[0].substring(1)}`};
    storeValue = 'blogPost';
  }

  const blogsApiUrl = parser.getCompleteApi(blogsOptions);

  fetchData(blogsApiUrl, storeValue, req, res, next);
}

function fetchThroughAjax(req, res, next) {
  const query = req.query;
  const subject = query.subject || '';
  const series = query.series || '';
  const author = query.author || '';
  const post = query.post || '';

  if (subject !== '') {
    blogsOptions.filters = { relationships: { 'blog-subjects': subject } };
  } else if (series !== '') {
    blogsOptions.filters = { relationships: { 'blog-series': series } };
  } else if (author !== '') {
    blogsOptions.filters = { relationships: { 'blog-profiles': author } };
  } else {
    blogsOptions.filters = { alias: `blog/${post}`};
  }

  const apiUrl = parser.getCompleteApi(blogsOptions);

  axios
    .get(apiUrl)
    .then(response => {
      const blogsParsed = parser.parse(response.data, blogsOptions);
      const blogsModelData = BlogsModel.build(blogsParsed);

      res.json(blogsModelData);
    })
    .catch(error => {
      console.log(`Error calling API : ${error}`);
      console.log(`Attempted to call : ${apiUrl}`);

      res.json({
        error
      });
    }); /* end axios call */
}

router
  .route(/([^]+)?/)
  .get(BlogQuery);

router
  .route('/blog')
  .get(BlogsMainList);

router
  .route(/\/blog\/([^]+)\/?/)
  .get(BlogQuery);

router
  .route('/api')
  .get(fetchThroughAjax);

export default router;
