import React from 'react';
import {Link} from 'react-router';

class BlogListing extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {

    return (
      <div className="blogListing">
      	<h2>
          <a className="blogListing-title" href={'/blogs/' + this.props.slug}>
            {this.props.title}
          </a>
        </h2>
        <img className="blogListing-image" src={this.props.mainPicture} />
        <p className="blogListing-paragraph">{this.props.body}</p>
      </div>
    );
  }
}

BlogListing.propTypes = {
  title: React.PropTypes.string.isRequired,
  body: React.PropTypes.string.isRequired
};

export default BlogListing;