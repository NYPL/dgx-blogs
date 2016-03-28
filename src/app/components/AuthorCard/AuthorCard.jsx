/*
 * AuthorCard
 */
import React from 'react';

class AuthorCard extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {

    return (
      <div className="authorCard">
        <p>date here</p>
      	<img className="authorCard-profilePic" src="http://placehold.it/50x50" />
        <h4 className="authorCard-name">{this.props.data ? this.props.data[0].attributes['full-name'] : null}</h4>
        <p className="authorCard-title">{this.props.data ? this.props.data[0].attributes.title : null}</p>
      </div>
    );
  }
}

export default AuthorCard;
