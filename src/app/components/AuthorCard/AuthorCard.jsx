/*
 * AuthorCard
 */
import React from 'react';

class AuthorCard extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    console.log(this.props.data.title);

    return (
      <div className={this.props.renderAs}>
      	<img className={this.props.renderAs + "-profilePic"} src={this.props.data.picture} />
        <h4 className={this.props.renderAs + "-name"}>{this.props.data.fullName}</h4>
        <p className="authorCard-title">{this.props.data.title}</p>
      </div>
    );
  }
}

AuthorCard.propTypes = {
  data: React.PropTypes.object.isRequired,
  renderAs: React.PropTypes.string
};

AuthorCard.defaultProps = {
  data: {
    picture: 'http://cdn-prod.www.aws.nypl.org/sites/default/files/styles/square_thumb/public/pictures/picture-800-1456857570.jpg',
    title: ''
  },
  renderAs: 'authorCard'
};

export default AuthorCard;
