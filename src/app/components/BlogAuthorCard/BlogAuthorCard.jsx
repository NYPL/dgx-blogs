/*
 * BlogAuthorCard
 */
import React from 'react';
import { LionLogoIcon } from 'dgx-svg-icons';

import BlogAuthorName from '../BlogAuthorName/BlogAuthorName';
import BlogAuthorViewMoreLink from '../BlogAuthorViewMoreLink/BlogAuthorViewMoreLink';

import { isEmpty as _isEmpty } from 'underscore';

class BlogAuthorCard extends React.Component {
  createMarkup(bodyText) {
    return { __html: bodyText };
  }

  renderAuthorPicture() {
    if (this.props.data.profileImgUrl) {
      return (
        <img
          className="blogAuthorCard-profilePicWrap-picture"
          src={this.props.data.profileImgUrl}
          alt="''"
        />
      );
    }

    return (
      <LionLogoIcon
        className="blogAuthorCard-profilePicWrap-picture"
        fill="transparent"
        ariaHidden
      />
    );
  }

  renderAuthorFullname() {
    if (this.props.data.fullName) {
      return (
        <p className="blogAuthorCard-name">{this.props.data.fullName}</p>
      );
    }

    return null;
  }

  render() {
    const profileText = this.props.data.active ?
      this.props.data.profileText : '';
    const unescapedBio = this.createMarkup(profileText);

    /* if there is not author data nothing should be shown */
    if (! this.props.data || _isEmpty(this.props.data.fullName)) {
      return null;
    }

    return (
      <address className="blogAuthorCard">
        <div className="blogAuthorCard-profilePicWrap">
          {this.renderAuthorPicture()}
        </div>
        <BlogAuthorName
          className="blogAuthorCard-name"
          fullName={this.props.data.fullName}
          slug={this.props.data.id}
          appBaseUrl={this.props.appBaseUrl}
        />
        <div
          className="blogAuthorCard-title"
          dangerouslySetInnerHTML={unescapedBio}
        >
        </div>
        <BlogAuthorViewMoreLink
          fullName={this.props.data.fullName}
          slug={this.props.data.id}
          appBaseUrl={this.props.appBaseUrl}
        />
      </address>
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
  appBaseUrl: React.PropTypes.string,
};

BlogAuthorCard.defaultProps = {
  data: {
    title: '',
    slug: '',
    fullName: '',
  },
};

export default BlogAuthorCard;
