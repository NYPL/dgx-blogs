import React from 'react';
import Router from 'react-router';

import Store from '../../stores/Store.js';

import Header from 'dgx-header-component';
import Footer from 'dgx-react-footer';

const RouteHandler = Router.RouteHandler;

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="app-wrapper">
        <Header />

        <RouteHandler {...this.props} />

        <Footer />
      </div>
    );
  }
}

export default App;
