import React from 'react';

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
        <Footer id="footer" className="footer" />
      </div>
    );
  }
}

export default App;
