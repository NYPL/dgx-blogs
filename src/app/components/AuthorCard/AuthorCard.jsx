/*
 * AuthorCard
 */
import React from 'react';

class AuthorCard extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const profileImgUrl = this.props.data.profileImgUrl ?
      this.props.data.profileImgUrl :
      'http://cdn-prod.www.aws.nypl.org/sites/default/files/styles/square_thumb/public/pictures/picture-800-1456857570.jpg';

    return (
      <div className={this.props.className}>
      	<img className={this.props.className + "-profilePic"} src={profileImgUrl} />
        <h4 className={this.props.className + "-name"}>{this.props.data.fullName}</h4>
        <p className="authorCard-title">{this.props.data.title}</p>
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
    profileImgUrl: 'http://cdn-prod.www.aws.nypl.org/sites/default/files/styles/square_thumb/public/pictures/picture-800-1456857570.jpg',
    title: ''
  },
  className: 'authorCard'
};

export default AuthorCard;
