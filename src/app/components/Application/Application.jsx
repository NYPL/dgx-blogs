import React from 'react';

import { Header, navConfig } from '@nypl/dgx-header-component';
import Footer from '@nypl/dgx-react-footer';

class App extends React.Component {
  render() {
    return (
      <div className="app-wrapper">
        <Header
          skipNav={{ target: 'mainContent' }}
          navData={navConfig.current}
        />
        {this.props.children}
        <Footer id="footer" className="footer" />
      </div>
    );
  }
}

export default App;
