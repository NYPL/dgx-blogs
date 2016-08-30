import React from 'react';

import LoadingDots from '../LoadingDots/LoadingDots';

class LoadingLayer extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {

    let seriesTitlePart = '';
    if (this.props.seriesTitle.length > 0) {
      seriesTitlePart = ' | ' + this.props.seriesTitle;
    }

    if (this.props.status === 'ready') {
      return null;
    }

    return (
      <div className="loadingLayer">
        <div className="loadingLayer-layer"></div>
        <div className="loadingLayer-texts">
          <span className="loadingLayer-texts-loadingWord">Loading...</span>
          <span className="loadingLayer-texts-title">
            {this.props.title}{seriesTitlePart}
          </span>
          <LoadingDots />
        </div>
      </div>
    );
  }
}

LoadingLayer.defaultProps = {
  status: 'ready',
  title: '',
  seriesTitle: '',
}

export default LoadingLayer;
