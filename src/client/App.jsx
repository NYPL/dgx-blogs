import React from 'react';
import ReactDOM from 'react-dom';
import { Router, useRouterHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import useScroll from 'scroll-behavior/lib/useStandardScroll';

import alt from 'dgx-alt-center';
import Iso from 'iso';

import './styles/main.scss';

import routes from '../app/routes/routes.js';

window.onload = () => {

  Iso.bootstrap((state, container) => {

    alt.bootstrap(state);

    const appHistory = useScroll(useRouterHistory(createBrowserHistory))();

    ReactDOM.render(
      <Router history={appHistory}>{routes.client}</Router>,
      container
      );
  });
};

