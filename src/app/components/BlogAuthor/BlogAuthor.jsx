/*
 * BlogAuthor
 */
import React from 'react';
import { Link } from 'react-router';
import { LionLogoIcon } from 'dgx-svg-icons';

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

  _renderAuthorName() {
    if( this.props.data.fullName ) {
      return (
        <h4 className="blogAuthor-name">
          <Link
            to="author"
            params={{author: 1}}
            className="blogAuthor-name-link"
          >
            { this.props.data.fullName }
          </Link>
        </h4>
      );
    }

    return null; 
  }

  render() {
    return (
      <div className="blogAuthor">
        <div className="blogAuthor-profilePicWrap">
          { this._renderAuthorPicture() }
        </div>
        { this._renderAuthorName() }
        <p className="blogAuthor-title">{ this.props.data.title }</p>
      </div>
    );
  }
}

BlogAuthor.propTypes = {
  data: React.PropTypes.shape({
    fullName: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    slug: React.PropTypes.string.isRequired,
  }),
  className: React.PropTypes.string,
};

BlogAuthor.defaultProps = {
  data: {
    title: '',
    slug: '',
  },
};

export default BlogAuthor;
