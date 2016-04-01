/*
 * AuthorCard
 */
import React from 'react';

class AuthorCard extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    // console.log(this.props.data);

    return (
      <div className="authorCard">
        <p>date here</p>
      	<img className="authorCard-profilePic" src="http://placehold.it/50x50" />
        <h4 className="authorCard-name">{this.props.data.fullName}</h4>
        <p className="authorCard-title">{this.props.data.unit}</p>
      </div>
    );
  }
}

AuthorCard.propTypes = {
  data: React.PropTypes.array.isRequired
};

AuthorCard.defaultProps = {
  data: [],
};

export default AuthorCard;
