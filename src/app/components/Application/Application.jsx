import React from 'react';

import { Header, navConfig } from 'dgx-header-component';
import Footer from 'dgx-react-footer';

class App extends React.Component {
  render() {
    return (
      <div className="app-wrapper">
        {this.props.children}
        <Footer id="footer" className="footer" />
      </div>
    );
  }
}

export default App;
