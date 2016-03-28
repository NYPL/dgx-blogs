import React from 'react';

class BlogListing extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {

    return (
      <div className="blogListing">
      	<h2 className="blogListing-title">{this.props.data.title.en.text}</h2>
        <img className="blogListing-image" src="http://placehold.it/200x300" />
        <p>{this.props.data.body.en['short-text']}</p>
      </div>
    );
  }
}

export default BlogListing;