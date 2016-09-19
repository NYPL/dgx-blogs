import React from 'react';
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
        this.routeHandler();
      })
      .catch(error => {
        console.log(`error making ajax call: ${error}`);
      }); /* end Axios call */
  }

  routeHandler() {
    this.context.router.push(`/blog/beta/authors/${this.props.slug}`);
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
  slug: React.PropTypes.string,
  fullName: React.PropTypes.string,
};

BlogAuthorViewMoreLink.defaultProps = {
  fullName: undefined,
};

/*
 * @see http://stackoverflow.com/questions/32033247/react-router-transitionto-is-not-a-function
 */

BlogAuthorViewMoreLink.contextTypes = {
  router: function contextType() {
    return React.PropTypes.func.isRequired;
  },
};

export default BlogAuthorViewMoreLink;
