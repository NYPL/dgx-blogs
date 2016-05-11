
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
      <Route path='blog' component={BlogsWrapper} ignoreScrollBehavior />
      <Route path='blog/author/:author?/?' component={BlogsWrapper} ignoreScrollBehavior />
      <Route path='blog/series/:series?/?' component={BlogsWrapper} ignoreScrollBehavior />
      <Route path='blog/subjects/:subjects?/?' component={BlogsWrapper} ignoreScrollBehavior />
      <Route path='blog/:year/:month/:day/:blogId' component={BlogPage} ignoreScrollBehavior />
    </Route>
  ),
  server: (
    <Route path="/" component={Application}>
      <Route path='blog' component={BlogsWrapper} ignoreScrollBehavior />
      <Route path='blog/author/:author?/?' component={BlogsWrapper} ignoreScrollBehavior />
      <Route path='blog/series/:series?/?' component={BlogsWrapper} ignoreScrollBehavior />
      <Route path='blog/subjects/:subjects?/?' component={BlogsWrapper} ignoreScrollBehavior />
      <Route path='blog/:year/:month/:day/:blogId' component={BlogPage} ignoreScrollBehavior />
    </Route>
  ),
};

export default routes;
