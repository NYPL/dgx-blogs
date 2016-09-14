import React from 'react';

import AppStatusStore from '../../stores/AppStatusStore';

import LoadingDots from '../LoadingDots/LoadingDots';

class LoadingLayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = AppStatusStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    AppStatusStore.listen(this.onChange);
  }

  componentWillUnmount() {
    AppStatusStore.unlisten(this.onChange);
  }

  onChange() {
    this.setState(AppStatusStore.getState());
  }
  
  render() {
    if (this.state.status === 'ready') {
      return null;
    }

    return (
      <div className="loadingLayer">
        <div className="loadingLayer-layer"></div>
        <div className="loadingLayer-texts">
          <span className="loadingLayer-texts-loadingWord">Loading...</span>
          <span className="loadingLayer-texts-title">
            {this.state.title}
          </span>
          <LoadingDots />
        </div>
      </div>
    );
  }
}

export default LoadingLayer;
