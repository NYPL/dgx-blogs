import React from 'react';

class Hero extends React.Component {
  constructor(props) {
    super(props);
  }

  _renderCoverImage() {

    if(this.props.coverUrl) { 
      return (
          <img src={this.props.coverUrl} />
        );
    }

    return null;
  }
  
  render() {

    /*Change hero class depending if it has image*/
    const heroClass = this.props.coverUrl ? 'hero' : 'heroNoImage';

    return (
      <div className={heroClass}>
        <h1 className="hero-title">Blogs <span className="nypl-icon-wedge-down"></span></h1>
        {this._renderCoverImage()}
      </div>
    );
  }
}

export default Hero;