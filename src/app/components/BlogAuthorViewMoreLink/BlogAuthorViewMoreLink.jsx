import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import Actions from '../../actions/Actions';

class BlogAuthorViewMoreLink extends React.Component {
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
    return(
      <Link
        to={`/blog/author/${this.props.slug}`}
        className="authorLink"
        onClick={this._fetchAuthor.bind(this, this.props.slug)}
      >
        <b>View all posts by</b> {this.props.fullName}
      </Link>    
      );
  }

}

BlogAuthorViewMoreLink.propTypes = {
  slug: React.PropTypes.string,
};

BlogAuthorViewMoreLink.defaultProps = {
  fullName: undefined,
};

export default BlogAuthorViewMoreLink;
