
import React from 'react';

import { DefaultRoute, Route, Router } from 'react-router';

/*
 * Components
 */
import Application from '../components/Application/Application';
import BlogPage from '../components/BlogPage/BlogPage';
import BlogsLandingPage from '../components/BlogsLandingPage/BlogsLandingPage';
import BlogsWrapper from '../components/BlogsWrapper/BlogsWrapper';

const routes = {
  client: (
    <Route path="/" component={Application}>
      <Route path='blog' component={BlogsWrapper} />
      <Route path='blog/author/:author' component={BlogsWrapper} />
      <Route path='blog/series/:series' component={BlogsWrapper} />
      <Route path='blog/subjects/:subjects' component={BlogsWrapper} />
      <Route path='blog/:year/:month/:day/:blogId' component={BlogPage} />
    </Route>
  ),
  server: (
    <Route path="/" component={Application}>
      <Route path='blog' component={BlogsWrapper} />
      <Route path='blog/author/:author' component={BlogsWrapper} />
      <Route path='blog/series/:series' component={BlogsWrapper} />
      <Route path='blog/subjects/:subjects' component={BlogsWrapper} />
      <Route path='blog/:year/:month/:day/:blogId' component={BlogPage} />
    </Route>
  ),
};

export default routes;
