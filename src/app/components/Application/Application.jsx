import React from 'react';
import { Router, Link } from 'react-router';

import Store from '../../stores/Store.js';

import Header from 'dgx-header-component';
import Footer from 'dgx-react-footer';

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log('app props', this.props.children);
    return (
      <div className="app-wrapper">
        hello

      </div>
    );
  }
}
        //{this.props.children}
/* @todo header and footer throw error because they're created with a different version of react */
//        <Header />
//        <Footer />

export default App;
