import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import Actions from '../../actions/Actions';

class BlogAuthorName extends React.Component {
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

  render() {
    if (this.props.fullName) {
      return (
        <p className="blogAuthor-name">
          <Link
          	{...this.props}
            to={`/blog/author/${this.props.slug}`}
            className="blogAuthor-name-link"
            onClick={this._fetchAuthor.bind(this, this.props.slug)}
          >
            {this.props.fullName}
          </Link>
        </p>
      );
    }

    return null;
  }
}

BlogAuthorName.propTypes = {
  fullName: React.PropTypes.string.isRequired,
  slug: React.PropTypes.string,
};

BlogAuthorName.defaultProps = {
  fullName: undefined,
};

export default BlogAuthorName;
