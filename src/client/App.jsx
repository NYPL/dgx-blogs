import React from 'react';
import ReactDOM from 'react-dom';
import { Router, useRouterHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import useScroll from 'scroll-behavior/lib/useStandardScroll';

import FeatureFlags from 'dgx-feature-flags';

import alt from 'dgx-alt-center';
import Iso from 'iso';

import './styles/main.scss';

import routes from '../app/routes/routes.js';

window.onload = () => {

  // Fire off the Feature Flag prior to render
  FeatureFlags.utils.activateFeature('shop-link');

  Iso.bootstrap((state, container) => {

    alt.bootstrap(state);

    const appHistory = useScroll(useRouterHistory(createBrowserHistory))();

    ReactDOM.render(
      <Router history={appHistory}>{routes.client}</Router>,
      container
      );
  });
};

