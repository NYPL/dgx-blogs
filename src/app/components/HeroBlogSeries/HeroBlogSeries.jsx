import React from 'react';

class HeroBlogSeries extends React.Component {
  constructor(props) {
    super(props);
  }

  _renderPicture() {
    if(this.props.picture) { 
      return (
          <img className="heroBlogSeries-content-picture" src={this.props.picture} />
        );
    }

    return null;
  }
  
  render() {
    return (
      <div className="heroBlogSeries">
        <div className="heroBlogSeries-content">
          {this._renderPicture()}
          <p className="heroBlogSeries-content-serie">blog series</p>
          <h1 className="heroBlogSeries-content-title">Dynamic series title <span className="nypl-icon-wedge-down"></span></h1>
          <p className="heroBlogSeries-content-description">This is a description text about the blog series.</p>
          <p className="heroBlogSeries-content-seriesCount">85 posts</p>
        </div>
      </div>
    );
  }
}

HeroBlogSeries.defaultProps = {
  picture: 'http://placehold.it/350?text=sampleImage',
}

export default HeroBlogSeries;