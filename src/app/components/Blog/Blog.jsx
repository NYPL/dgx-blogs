/*
 * Blog component
 */
import React from 'react';

class Blog extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {

    return (
      <div className="blogContent">
      	<h1 
          className="blogContent-title">
          {this.props.title}
        </h1>
        <div className="blogContent-author">
          by <b>{this.props.author.fullName}</b>. {this.props.author.unit}
        </div>
        {this.props.body}
      </div>
    );
  }
}

export default Blog;