import React from 'react';
import Router from 'react-router';

import alt from 'dgx-alt-center';
import Iso from 'iso';

import './styles/main.scss';

import routes from '../app/routes/routes.js';

window.onload = () => {
  // Render Isomorphically
  Iso.bootstrap((state, container) => {
    alt.bootstrap(state);

    Router.run(routes.client, Router.HistoryLocation, (Root, state) => {
      React.render(<Root />, container);
    });
  });
};

