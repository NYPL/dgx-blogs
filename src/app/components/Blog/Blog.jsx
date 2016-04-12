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
        <p className="blogContent-date">{this.props.date}</p>
      	<h1 
          className="blogContent-title">
          {this.props.title}
        </h1>
        <div className="blogContent-author">
          by <b>{this.props.author.fullName}</b>. {this.props.author.title}
        </div>
        <p className="blogContent-date">{this.props.date}</p>
        <img className="blogContent-mainPicture" src={this.props.mainPicture} />
        <div className="blogContent-bodyText">
          {this.props.dangerouslySetInnerHTML}
        </div>
      </div>
    );
  }
}

export default Blog;