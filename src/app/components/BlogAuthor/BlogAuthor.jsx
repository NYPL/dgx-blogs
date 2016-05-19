/*
 * BlogAuthor
 */
import React from 'react';
import { LionLogoIcon } from 'dgx-svg-icons';
import BlogAuthorName from '../BlogAuthorName/BlogAuthorName';

class BlogAuthor extends React.Component {
  constructor(props) {
    super(props);
  }

  _renderAuthorPicture() {
    if (this.props.data.profileImgUrl) {
      return (
        <img
          className="blogAuthor-profilePicWrap-picture"
          src={this.props.data.profileImgUrl}
        />
      );
    }
    return (
      <LionLogoIcon
        className="blogAuthor-profilePicWrap-picture"
        fill="transparent"
      />
    );
  }

  _renderAuthorTitle() {
    if (this.props.data.title) {
      return (
        <p className="blogAuthor-title">{this.props.data.title}</p>
      );
    }

    return null;
  }

  render() {
    return (
      <div className="blogAuthor">
        <div className="blogAuthor-profilePicWrap">
          {this._renderAuthorPicture()}
        </div>
        <BlogAuthorName
          fullName={this.props.data.fullName}
          slug={this.props.data.slug}
        />
        {this._renderAuthorTitle()}
      </div>
    );
  }
}

BlogAuthor.propTypes = {
  data: React.PropTypes.shape({
    fullName: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    slug: React.PropTypes.string.isRequired,
    profileImgUrl: React.PropTypes.string,
  }),
};

BlogAuthor.defaultProps = {
  data: {
    title: '',
    slug: '',
    fullName: '',
  },
};

export default BlogAuthor;
