import React from 'react';

class HeroSinglePost extends React.Component {
  constructor(props) {
    super(props);
  }

  _renderCoverImage() {

    if(this.props.coverUrl) { 
      return (
        <img src={this.props.coverUrl} alt="" />
      );
    }

    return null;
  }
  
  render() {

    /*Change hero class depending if it has image*/
    const heroSinglePostClass = this.props.coverUrl ? 'heroSinglePost' : 'heroSinglePostNoImage';

    return (
      <div className={heroSinglePostClass}>
        <h2 className="heroSinglePost-title">Blogs <span className="nypl-icon-wedge-down"></span></h2>
        {this._renderCoverImage()}
      </div>
    );
  }
}

export default HeroSinglePost;