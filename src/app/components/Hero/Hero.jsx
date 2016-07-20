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
    const alignClass = (this.props.picture) ? '' : 'no-picture';

    return (
      <div className="hero">
        <div className="hero-content">
          {this._renderPicture()}
          <div className={`hero-content-texts ${alignClass}`}>
            <p className="hero-content-texts-serie">{this.props.type}</p>
            <h1 className="hero-content-texts-title">{this.props.title} <span className="nypl-icon-wedge-down"></span></h1>
            <p className="hero-content-texts-description">{this.props.description}</p>
            <p className="hero-content-texts-seriesCount">{this.props.postCount} Post</p>
          </div>
        </div>
      </div>
    );
  }
}

Hero.defaultProps = {

  picture: null,
  type: '',
  title: '',
  description: '',
  postCount: 0,
}

export default Hero;