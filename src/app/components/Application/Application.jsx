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
    return (
      <div className="app-wrapper">
       <Header />
        {this.props.children}
      </div>
    );
  }
}
       // <Footer />

export default App;
