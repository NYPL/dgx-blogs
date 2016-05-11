import React from 'react';

class HeroSinglePost extends React.Component {
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
    const heroSinglePostClass = this.props.coverUrl ? 'heroSinglePost' : 'heroSinglePostNoImage';

    return (
      <div className={heroSinglePostClass}>
        <h1 className="heroSinglePost-title">Blogs <span className="nypl-icon-wedge-down"></span></h1>
        {this._renderCoverImage()}
      </div>
    );
  }
}

export default HeroSinglePost;