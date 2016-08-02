
import React from 'react';

import { IndexRoute, DefaultRoute, Route, Router } from 'react-router';

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
      <Route path='blog/beta' component={BlogsWrapper} />
      <Route path='blog/beta/author/:author' component={BlogsWrapper} />
      <Route path='blog/beta/series/:series' component={BlogsWrapper} />
      <Route path='blog/beta/subjects/:subjects' component={BlogsWrapper} />
      <Route path='blog/beta/:year/:month/:day/:blogId' component={BlogPage} />
      <Route path='blog/beta/not-found' component={NotFoundAlert} />
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
