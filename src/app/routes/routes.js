// React libraries
import React from 'react';
// Import Router
import { DefaultRoute, NotFoundRoute, Route } from 'react-router';
// Import components
import Application from '../components/Application/Application';
import BlogPage from '../components/Blogs/BlogPage/BlogPage';
import BlogsLandingPage from '../components/Blogs/ListPages/BlogsLandingPage';

//TODO delete these two
import ReactApps from '../components/Lists/ReactApps.jsx';
import AngularApps from '../components/Lists/AngularApps.jsx';


const routes = {
  client: (
    <Route name="root" path="/" handler={Application}>
      <Route name='blogs' path='/blogs' handler={BlogsLandingPage} ignoreScrollBehavior />
      <Route name='blog' path='/blogs/:blogId' handler={BlogPage} ignoreScrollBehavior />
    </Route>
  ),
  server: (
    <Route name="root" path="/" handler={Application}>
      <Route name='blogs' path='/blogs' handler={BlogsLandingPage} ignoreScrollBehavior />
      <Route name='blog' path='/blogs/:blogId' handler={BlogPage} ignoreScrollBehavior />
    </Route>
  ),
};

export default routes;
