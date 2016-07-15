import React from 'react';

class Hero extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="hero">
        <div className="hero-content">
          <p className="hero-content-serie">{this.props.type}</p>
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
  type: '',
  title: '',
  description: '',
  postCount: 0,
}

export default Hero;