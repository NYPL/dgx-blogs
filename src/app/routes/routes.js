
import React from 'react';

import { IndexRoute, DefaultRoute, Route, Router } from 'react-router';

import appConfig from '../../../appConfig.js';
const appBaseUrl = appConfig.appBaseUrl;

/*
 * Components
 */
import Application from '../components/Application/Application';
import BlogPage from '../components/BlogPage/BlogPage';
import BlogsLandingPage from '../components/BlogsLandingPage/BlogsLandingPage';
import BlogsWrapper from '../components/BlogsWrapper/BlogsWrapper';
import NotFoundAlert from '../components/NotFoundAlert/NotFoundAlert';

const routes = {
  client: (
    <Route path="/" component={Application}>
      <Route path={appBaseUrl} component={BlogsWrapper} />
      <Route path={`${appBaseUrl}author/:author`} component={BlogsWrapper} />
      <Route path={`${appBaseUrl}series/:series`} component={BlogsWrapper} />
      <Route path={`${appBaseUrl}subjects/:subjects`} component={BlogsWrapper} />
      <Route path={`${appBaseUrl}:year/:month/:day/:blogId`} component={BlogPage} />
      <Route path={`${appBaseUrl}not-found`} component={NotFoundAlert} />
    </Route>
  ),
  server: (
    <Route path="/" component={Application}>
      <IndexRoute component={BlogsWrapper}/>
      <Route path='author/:author' component={BlogsWrapper} />
      <Route path='series/:series' component={BlogsWrapper} />
      <Route path='subjects/:subjects' component={BlogsWrapper} />
      <Route path=':year/:month/:day/:blogId' component={BlogPage} />
      <Route path='not-found' component={NotFoundAlert} />
    </Route>
  ),
};

export default routes;
