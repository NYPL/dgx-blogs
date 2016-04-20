/*
 * BlogAuthor
 */
import React from 'react';
import { Link } from 'react-router';
import { LionLogoIcon } from 'dgx-svg-icons';

class BlogAuthor extends React.Component {
  constructor(props) {
    super(props);

    this._fetchAuthor = this._fetchAuthor.bind(this);
  }

  _fetchAuthor(author) {
    axios
      .get(`/api?author=${author}`)
      .then(response => {
        Actions.updateBlogs(response.data);
      })
      .catch(error => {
        console.log(`error making ajax call: ${error}`);
      }); /* end Axios call */
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
    if (this.props.data.fullName) {
      return (
        <p className="blogAuthor-name">
          <Link
            to="author"
            params={{ author: this.props.data.slug }}
            className="blogAuthor-name-link"
            onClick={this._fetchAuthor.bind(this, this.props.data.slug)}
          >
            { this.props.data.fullName }
          </Link>
        </p>
      );
    }

    return null;
  }

  _renderAuthorTitle() {
    if (this.props.data.title) {
      return (
        <p className="blogAuthor-title">{ this.props.data.title }</p>
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
        { this._renderAuthorTitle() }
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
  },
};

export default BlogAuthor;
