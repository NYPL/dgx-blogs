import React from 'react';
import {Link} from 'react-router';

class ReadMoreButton extends React.Component {
  constructor(props) {
    super(props);
  }

  _svgDots() {
    return(
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" className="svgIcon blue">
       <title>circle.more.icon.v1</title>
       <circle cx="16" cy="16" r="1.9029" />
       <circle cx="24" cy="16" r="1.9029" />
       <circle cx="8" cy="16" r="1.9029" />
      </svg>
      );
  }
  
  render() {
    const params = this.props.slug.split('/');

    return (
      <Link 
        className="readMoreButton" 
        to="blog"
        params={{
          year: params[0],
          month: params[1],
          day: params[2],
          blogId: params[3], 
        }}
      >
        {this._svgDots()}
        <span>Read More</span>
      </Link>
    );
  }
}

ReadMoreButton.propTypes = {
  slug: React.PropTypes.string,
};

export default ReadMoreButton;