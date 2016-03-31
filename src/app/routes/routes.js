
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
    <Route name="root" path="blog/?" handler={Application}>
      <Route name='angularApps' path='author/?' handler={AngularApps} ignoreScrollBehavior />
      <Route name='reactApps' path='series/?' handler={ReactApps} ignoreScrollBehavior />
      <Route name='all' path='*' handler={ReactApps} ignoreScrollBehavior />
    </Route>
  ),
  server: (
    <Route name="root" path="blog/?" handler={Application}>
      <Route name='angularApps' path='author/?' handler={AngularApps} ignoreScrollBehavior />
      <Route name='reactApps' path='series/?' handler={ReactApps} ignoreScrollBehavior />
      <Route name='all' path='*' handler={ReactApps} ignoreScrollBehavior />
    </Route>
  ),
};

export default routes;
