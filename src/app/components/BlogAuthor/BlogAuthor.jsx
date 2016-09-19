/*
 * BlogAuthor
 */
import React from 'react';
import { LionLogoIcon } from 'dgx-svg-icons';
import BlogAuthorName from '../BlogAuthorName/BlogAuthorName';

class BlogAuthor extends React.Component {
  renderAuthorPicture() {
    if (this.props.data.profileImgUrl) {
      return (
        <img
          className="blogAuthor-profilePicWrap-picture"
          src={this.props.data.profileImgUrl}
          alt=""
        />
      );
    }
    return (
      <LionLogoIcon
        className="blogAuthor-profilePicWrap-picture"
        fill="transparent"
        ariaHidden
      />
    );
  }

  renderAuthorTitle() {
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
          {this.renderAuthorPicture()}
        </div>
        <BlogAuthorName
          fullName={this.props.data.fullName}
          slug={this.props.data.id}
          appBaseUrl={this.props.appBaseUrl}
        />
        {this.renderAuthorTitle()}
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
    id: React.PropTypes.string,
  }),
  appBaseUrl: React.PropTypes.string,
};

BlogAuthor.defaultProps = {
  data: {
    title: '',
    slug: '',
    fullName: '',
    id: '',
  },
};

export default BlogAuthor;
