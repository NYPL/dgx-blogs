import express from 'express';
import axios from 'axios';
import parser from 'jsonapi-parserinator';

import Model from 'dgx-model-data';
// import Immutable from 'immutable';

import { navConfig } from 'dgx-header-component';

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

function createOptions(api) {
  return {
    endpoint: `${apiRoot}${api.endpoint}`,
    includes: api.includes,
    filters: api.filters,
  };
}

const headerOptions = createOptions(headerApi);
const blogsOptions = createOptions(blogsApi);

function fetchApiData(url) {
  return axios.get(url);
}

function getHeaderData() {
  const headerApiUrl = parser.getCompleteApi(headerOptions);
  return fetchApiData(headerApiUrl);
}

function fetchData(url, storeValue, req, res, next) {

  url = `${url}&page[number]=1&page[size]=25`;
  console.log('API-ROUTES: first api call:', url);

  axios
    .all([getHeaderData(), fetchApiData(url)])
    .then(axios.spread((headerData, blogsData) => {
      const headerParsed = parser.parse(headerData.data, headerOptions);
      const headerModelData = HeaderItemModel.build(headerParsed);

      const blogsParsed = parser.parse(blogsData.data, blogsOptions);
      const blogsModelData = BlogsModel.build(blogsParsed);

      res.locals.data = {
        BlogStore: {
          [storeValue]: {
            meta: { 
              count: blogsData.data.meta.count,
            },
            blogList: blogsModelData,
            currentPage: 2,
          },
          cache: {
            '/blog/beta/': {
              meta: { 
                count: blogsData.data.meta.count,
              },
              blogList: blogsModelData,
              currentPage: 2,
            }
          },
        },
        HeaderStore: {
          headerData: navConfig.current,
        },
      };    
      next();
    }))
    .catch(error => {
      console.log(`error calling API : ${error}`);
      console.log(`Attempted to call : ${url}`);

      res.locals.data = {
        BlogStore: {
          [storeValue]: [],
        },
        HeaderStore: {
          headerData: navConfig.current,
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
  if (!paramArray[0] && !paramArray[1] || (paramArray[1] == 'blog' && !paramArray[2])) {
    return BlogsMainList(req, res, next);
  }

  if (paramArray[0] === '') {
    blogType = paramArray[1];
    queryValue = paramArray[2];

    if (paramArray[1] === 'blog') {
      blogType = paramArray[2];
      queryValue = paramArray[3];
    }
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
    let blogPost = req.params[0];
    if (blogPost[0] === '/') {
      blogPost = blogPost.substring(1);
    }

    const blogPostUrl = req.params[0].indexOf('blog') !== -1 ? blogPost : `blog/${blogPost}`;
    blogsOptions.filters = { alias: blogPostUrl };
    storeValue = 'blogPost';
  }

  const blogsApiUrl = parser.getCompleteApi(blogsOptions);

  fetchData(blogsApiUrl, storeValue, req, res, next);
}

function fetchThroughAjax(req, res, next) {
  const query = req.query;
  const subject = query.subject || '';
  const author = query.author || '';
  const series = query.series || '';
  const blog = query.blog || '';
  const page = query.page || 1;
  const pageSize = query.pageSize || 25;

  if (subject !== '') {
    blogsOptions.filters = { relationships: { 'blog-subjects': subject } };
  }

  if (author !== '') {
    blogsOptions.filters = { relationships: { 'blog-profiles': author } };
  }

  if (series !== '') {
    blogsOptions.filters = { relationships: { 'blog-series': series } };
  }

  if (blog !== '') {
    blogsOptions.filters = { alias: `blog/${blog}` };

    if (blog === 'all') {
      blogsOptions.filters = {};
    }
  }
  /* is there a better way to do this using the parser */
  const pageSuffix = `&page[number]=${page}&page[size]=${pageSize}`;
  const apiUrl = parser.getCompleteApi(blogsOptions);
  const completeUrl = apiUrl + pageSuffix;

  axios
    .get(apiUrl + pageSuffix)
    .then(response => {
      console.log('ajax call to:', completeUrl);
      const blogsParsed = parser.parse(response.data, blogsOptions);
      const blogsModelData = BlogsModel.build(blogsParsed);

      res.json({ 
        blogList: blogsModelData,
        meta: {
          count: response.data.meta.count },
      });
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
  .route('/blog/beta')
  .get(BlogsMainList);

router
  .route(/\/blog\/beta\/([^]+)\/?/)
  .get(BlogQuery);

router
  .route('/api')
  .get(fetchThroughAjax);

router
  .route('/blog/beta/api')
  .get(fetchThroughAjax);

export default router;
