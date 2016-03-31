import React from 'react';

class BlogListing extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {

    return (
      <div className="blogListing">
      	<h2 className="blogListing-title">{this.props.title}</h2>
        <img className="blogListing-image" src="http://placehold.it/200x300" />
        <p>{this.props.body}</p>
      </div>
    );
  }
}

BlogListing.propTypes = {
  title: React.PropTypes.string.isRequired,
  body: React.PropTypes.string.isRequired
};

export default BlogListing;