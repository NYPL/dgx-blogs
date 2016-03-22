import React from 'react';
import Router from 'react-router';

import Store from '../../stores/Store.js';

import Header from 'dgx-header-component';
import Footer from 'dgx-react-footer';

import DummyBlogs from  '../DummyBlogs/DummyBlogs.jsx';

const RouteHandler = Router.RouteHandler;
const Navigation = Router.Navigation;
const App = React.createClass({
  getInitialState() {
    return Store.getState();
  },

  mixins: [Navigation],
  
  render() {
    let angularApps = this._getList(this.state._angularApps),
      reactApps = this._getList(this.state._reactApps);

    return (
      <div className='app-wrapper'>
        <Header />

        <RouteHandler {...this.props} />

        <DummyBlogs />

        <Footer />
      </div>
    );
  },

  // Helper functions below the render() function:
  _getList(appsArray) {
    return appsArray.map((appName, index) => {
      return (<li key={index}>{appName}</li>);
    });
  },
});

export default App;
