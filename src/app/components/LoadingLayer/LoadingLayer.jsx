import React from 'react';

class LoadingLayer extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {

    return (
      <div className="loadingLayer">
        {this.props.status}
      </div>
    );
  }
}

LoadingLayer.defaultProps = {
  status: 'ready',
}

export default LoadingLayer;