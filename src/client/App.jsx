import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'

import alt from 'dgx-alt-center';
import Iso from 'iso';

import './styles/main.scss';

import routes from '../app/routes/routes.js';

window.onload = () => {
  // Render Isomorphically
  Iso.bootstrap((state, meta, container) => { console.log('container', container);

    console.log('Application rendered Isomorphically.');

    alt.bootstrap(state);

    let history = createBrowserHistory();

    ReactDOM.render(
      <Router history={history}>{routes.client}</Router>,
      container
      );
  });
};

