import React from 'react';

import Store from '../../stores/Store.js';

class AngularApps extends React.Component {
  constructor(props) {
    super(props);

    this.state = Store.getState();
    this._getList = this._getList.bind(this);
  }
  
  render() {
    const angularApps = this._getList(this.state._angularApps);

    return (
      <div className='app-wrapper'>
        <p>Our Angular Apps</p>
        <ul>
          {angularApps}
        </ul>
      </div>
    );
  }

  // Helper functions below the render() function:
  _getList(appsArray) {
    return appsArray.map((appName, index) => {
      return (<li key={index}>{appName}</li>);
    });
  }
}

export default AngularApps;
