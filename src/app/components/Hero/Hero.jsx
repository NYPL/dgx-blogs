import React from 'react';

class Hero extends React.Component {
  constructor(props) {
    super(props);
  }

  _renderPicture() {
    if(this.props.picture) { 
      return (
          <img className="hero-content-picture" src={this.props.picture} />
        );
    }

    return null;
  }
  
  render() {
    return (
      <div className="hero">
        <div className="hero-content">
          {this._renderPicture()}
          <p className="hero-content-serie">{this.props.serieType}</p>
          <h1 className="hero-content-title">{this.props.title} <span className="nypl-icon-wedge-down"></span></h1>
          <p className="hero-content-description">{this.props.description}</p>
          <p className="hero-content-seriesCount">{this.props.postCount} Post</p>
        </div>
      </div>
    );
  }
}

Hero.defaultProps = {

  picture: 'http://placehold.it/350?text=sampleImage',
  serieType: '',
  title: '',
  description: '',
  postCount: 0,
}

export default Hero;