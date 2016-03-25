// React libraries
import React from 'react';
// Import Router
import { DefaultRoute, NotFoundRoute, Route } from 'react-router';
// Import components
import Application from '../components/Application/Application.jsx';
import ReactApps from '../components/Lists/ReactApps.jsx';
import AngularApps from '../components/Lists/AngularApps.jsx';

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
