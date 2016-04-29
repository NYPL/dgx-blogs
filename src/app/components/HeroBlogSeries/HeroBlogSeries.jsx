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
          <p className="heroBlogSeries-content-serie">{this.props.serieType}</p>
          <h1 className="heroBlogSeries-content-title">{this.props.title} <span className="nypl-icon-wedge-down"></span></h1>
          <p className="heroBlogSeries-content-description">{this.props.description}</p>
          <p className="heroBlogSeries-content-seriesCount">{this.props.postCount} Post</p>
        </div>
      </div>
    );
  }
}

HeroBlogSeries.defaultProps = {

  picture: 'http://placehold.it/350?text=sampleImage',
  serieType: '',
  title: '',
  description: '',
  postCount: 0,
}

export default HeroBlogSeries;