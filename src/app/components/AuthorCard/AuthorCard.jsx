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
      <div className={this.props.className}>
      	<img className={this.props.className + "-profilePic"} src={this.props.data.picture} />
        <h4 className={this.props.className + "-name"}>{this.props.data.fullName}</h4>
        <p className={this.props.className + "-title"}>{this.props.data.title}</p>
      </div>
    );
  }
}

AuthorCard.propTypes = {
  data: React.PropTypes.object.isRequired,
  className: React.PropTypes.string
};

AuthorCard.defaultProps = {
  data: {
    picture: 'http://cdn-prod.www.aws.nypl.org/sites/default/files/styles/square_thumb/public/pictures/picture-800-1456857570.jpg',
    title: ''
  },
  className: 'authorCard'
};

export default AuthorCard;
