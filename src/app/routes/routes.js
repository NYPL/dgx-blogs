
import React from 'react';

import { DefaultRoute, NotFoundRoute, Route } from 'react-router';

/*
 * Components
 */
import Application from '../components/Application/Application';
import BlogPage from '../components/BlogPage/BlogPage';
import BlogsLandingPage from '../components/BlogsLandingPage/BlogsLandingPage';
import BlogsWrapper from '../components/BlogsWrapper/BlogsWrapper';

const routes = {
  client: (
    <Route name="root" path="/" handler={Application}>
      <Route name='blogs' path='/blogs/?' handler={BlogsWrapper} ignoreScrollBehavior />
      <Route name='author' path='/blogs/author/?' handler={BlogsWrapper} ignoreScrollBehavior />
      <Route name='series' path='/blogs/series/?' handler={BlogPage} ignoreScrollBehavior />
      <Route name='blog' path='/blogs/**' handler={BlogPage} ignoreScrollBehavior />
    </Route>
  ),
  server: (
    <Route name="root" path="/" handler={Application}>
      <Route name='blogs' path='/blogs/?' handler={BlogsWrapper} ignoreScrollBehavior />
      <Route name='author' path='/blogs/author/?' handler={BlogsWrapper} ignoreScrollBehavior />
      <Route name='series' path='/blogs/series/?' handler={BlogPage} ignoreScrollBehavior />
      <Route name='blog' path='/blogs/**' handler={BlogPage} ignoreScrollBehavior />
    </Route>
  ),
};

export default routes;
