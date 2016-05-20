/*
 * BlogAuthorCard
 */
import React from 'react';
import { LionLogoIcon } from 'dgx-svg-icons';

import BlogAuthorName from '../BlogAuthorName/BlogAuthorName';
import BlogAuthorViewMoreLink from '../BlogAuthorViewMoreLink/BlogAuthorViewMoreLink';

import { isEmpty as _isEmpty } from 'underscore';

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

  _renderAuthorFullname() {
    if (this.props.data.fullName) {
      return (
        <p className="blogAuthorCard-name">{this.props.data.fullName}</p>
      );
    }

    return null;
  }

  render() {
    /* if there is not author data nothing should be shown */
    if (! this.props.data || _isEmpty(this.props.data.fullName)) {
      return null;
    }

    return (
      <div className="blogAuthorCard">
        <div className="blogAuthorCard-profilePicWrap">
          {this._renderAuthorPicture()}
        </div>
        <BlogAuthorName
          className="blogAuthorCard-name"
          fullName={this.props.data.fullName}
          slug={this.props.data.slug}
        />
        <p className="blogAuthorCard-title">{this.props.data.profileText}</p>
        <BlogAuthorViewMoreLink
          fullName={this.props.data.fullName}
          slug={this.props.data.slug}
        />
      </div>
    );
  }
}

BlogAuthorCard.propTypes = {
  data: React.PropTypes.shape({
    fullName: React.PropTypes.string,
    title: React.PropTypes.string,
    slug: React.PropTypes.string,
    profileImgUrl: React.PropTypes.string,
    profileText: React.PropTypes.string,
  }),
  className: React.PropTypes.string,
};

BlogAuthorCard.defaultProps = {
  data: {
    title: '',
    slug: '',
    fullName: '',
  },
};

export default BlogAuthorCard;
