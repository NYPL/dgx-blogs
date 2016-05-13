import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'

import alt from 'dgx-alt-center';
import Iso from 'iso';

import './styles/main.scss';

import routes from '../app/routes/routes.js';

window.onload = () => {

  Iso.bootstrap((state, container) => {

    alt.bootstrap(state);

    let history = createBrowserHistory();

    ReactDOM.render(
      <Router history={history}>{routes.client}</Router>,
      container
      );
  });
};

