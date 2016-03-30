
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
      <Route name='blog' path='/blogs/:blogId' handler={BlogPage} ignoreScrollBehavior />
    </Route>
  ),
  server: (
    <Route name="root" path="/" handler={Application}>
      <Route name='blogs' path='/blogs/?' handler={BlogsWrapper} ignoreScrollBehavior />
      <Route name='blog' path='/blogs/:blogId' handler={BlogPage} ignoreScrollBehavior />
    </Route>
  ),
};

export default routes;
