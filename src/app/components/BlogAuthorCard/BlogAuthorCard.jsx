/*
 * BlogAuthorCard
 */
import React from 'react';
import { Link } from 'react-router';
import { LionLogoIcon } from 'dgx-svg-icons';

class BlogAuthorCard extends React.Component {
  constructor(props) {
    super(props);
  }

  _renderAuthorPicture() {

    if (this.props.data.profileImgUrl) {
      return (
        <img
          className="blogAuthorCard-profilePicWrap-picture"
          src={this.props.data.profileImgUrl}
        /> 
      );
    }

    return (
      <LionLogoIcon 
        className="blogAuthorCard-profilePicWrap-picture" 
        fill="transparent" 
      />
    );
  }

  render() {

    return (
      <div className="blogAuthorCard">
        <div className="blogAuthorCard-profilePicWrap">
          { this._renderAuthorPicture() }
        </div>
        <h4 className="blogAuthorCard-name">{ this.props.data.fullName }</h4>
        <p className="blogAuthorCard-title">{ this.props.data.profileText }</p>
        <Link
          to="author"
          params={{ author: this.props.data.slug }}
          className="authorLink"
        >
          <b>View all posts by</b> {this.props.data.fullName}
        </Link>
      </div>
    );
  }
}

BlogAuthorCard.propTypes = {
  data: React.PropTypes.shape({
    fullName: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    slug: React.PropTypes.string.isRequired,
  }),
  className: React.PropTypes.string,
};

BlogAuthorCard.defaultProps = {
  data: {
    title: '',
    fullName: '',
    slug: '',
  }
};

export default BlogAuthorCard;
