
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
      <Route name="blogs" path="/blogs/?" handler={BlogsWrapper} ignoreScrollBehavior />
      <Route name="author" path="/blogs/author/:author?/?" handler={BlogsWrapper} ignoreScrollBehavior />
      <Route name="series" path="/blogs/series/:series?/?" handler={BlogsWrapper} ignoreScrollBehavior />
      <Route name="subjects" path="/blogs/subjects/:subjects?/?" handler={BlogsWrapper} ignoreScrollBehavior />
      <Route name="blog" path="/blogs/:year/:month/:day/:blogId" handler={BlogPage} ignoreScrollBehavior />
    </Route>
  ),
  server: (
    <Route name="root" handler={Application}>
      <Route name="blogs" path="/?" handler={BlogsWrapper} ignoreScrollBehavior />
      <Route name="author" path="/author/:author?/?" handler={BlogsWrapper} ignoreScrollBehavior />
      <Route name="series" path="/series/:series?/?" handler={BlogsWrapper} ignoreScrollBehavior />
      <Route name="subjects" path="/subjects/:subjects?/?" handler={BlogsWrapper} ignoreScrollBehavior />
      <Route name="blog" path="/:year/:month/:day/:blogId" handler={BlogPage} ignoreScrollBehavior />
    </Route>
  ),
};

export default routes;
