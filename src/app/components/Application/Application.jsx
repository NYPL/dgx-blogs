import React from 'react';

import { Header, navConfig } from 'dgx-header-component';
import Footer from '@nypl/dgx-react-footer';
import SkinnyBanner from '../SkinnyBanner/SkinnyBanner.jsx';

class App extends React.Component {
  render() {
    return (
      <div className="app-wrapper">
        <Header
          skipNav={{ target: 'mainContent' }}
          navData={navConfig.current}
        />
        <SkinnyBanner path={this.props.location.pathname} />
        {this.props.children}
        <Footer id="footer" className="footer" />
      </div>
    );
  }
}

export default App;
