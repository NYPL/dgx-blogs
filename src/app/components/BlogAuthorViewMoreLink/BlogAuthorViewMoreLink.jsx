import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import axios from 'axios';
import Actions from '../../actions/Actions';

class BlogAuthorViewMoreLink extends React.Component {
  constructor(props) {
    super(props);

    this.fetchAuthor = this.fetchAuthor.bind(this);
  }

  fetchAuthor(e) {
    e.preventDefault();

    Actions.switchToLoading(`${this.props.fullName} | NYPL Author`);

    axios
      .get(`/blog/beta/api?author=${this.props.slug}`)
      .then(response => {
        Actions.updateBlogs({ blogs: response.data });
      })
      .then(response => {
        Actions.returnToReady();
        this.routeHandler(`authors/${this.props.slug}`);
      })
      .catch(error => {
        console.log(`error making ajax call: ${error}`);
        this.routeHandler('not-found');
      }); /* end Axios call */
  }

  routeHandler(location) {
    this.context.router.push(`/blog/beta/${location}`);
  }

  render() {
    return (
      <Link
        className="authorLink"
        to={`/blog/beta/authors/${this.props.slug}`}
        onClick={this.fetchAuthor}
      >
        <b>View all posts by</b> {this.props.fullName}
      </Link>
      );
  }
}

BlogAuthorViewMoreLink.propTypes = {
  slug: PropTypes.string,
  fullName: PropTypes.string,
};

BlogAuthorViewMoreLink.defaultProps = {
  fullName: undefined,
};

/*
 * @see http://stackoverflow.com/questions/32033247/react-router-transitionto-is-not-a-function
 */

BlogAuthorViewMoreLink.contextTypes = {
  router: PropTypes.object,
};

export default BlogAuthorViewMoreLink;
