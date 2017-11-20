// Polyfill Promise for legacy browsers
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, useRouterHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import Iso from 'iso';

import alt from 'dgx-alt-center';
import FeatureFlags from 'dgx-feature-flags';
import { gaUtils, config } from 'dgx-react-ga';

import routes from '../app/routes/routes.js';

import './styles/main.scss';

window.onload = () => {
  if (!window.dgxFeatureFlags) {
    window.dgxFeatureFlags = FeatureFlags.utils;
  }

  if (!window.ga) {
    const isProd = process.env.NODE_ENV === 'production';
    const gaOpts = { debug: !isProd, titleCase: false };

    gaUtils.initialize(config.google.code(isProd), gaOpts);
  }

  Iso.bootstrap((state, container) => {
    alt.bootstrap(state);

    const appHistory = useScroll(useRouterHistory(createBrowserHistory))();

    ReactDOM.render(
      <Router history={appHistory}>{routes.client}</Router>,
      container
    );
  });
  gaUtils.trackPageview(window.location.pathname);
};
