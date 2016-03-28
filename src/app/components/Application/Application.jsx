import React from 'react';
import Router from 'react-router';

import Store from '../../stores/Store.js';

import Header from 'dgx-header-component';
import Footer from 'dgx-react-footer';

const RouteHandler = Router.RouteHandler;
const Navigation = Router.Navigation;
const App = React.createClass({

  mixins: [Navigation],

  getInitialState() {
    return Store.getState();
  },

  _getList(appsArray) {
    return appsArray.map((appName, index) => {
      return (<li key={index}>{appName}</li>);
    });
  },

  render() {
    return (
      <div className="app-wrapper">
        <Header />
        <RouteHandler {...this.props} />
        <Footer />
      </div>
    );
  },

});

export default App;
