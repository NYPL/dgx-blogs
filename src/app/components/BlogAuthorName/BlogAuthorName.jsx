import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router';
import Actions from '../../actions/Actions';

class BlogAuthorName extends React.Component {
  constructor(props) {
    super(props);

    this.fetchAuthor = this.fetchAuthor.bind(this);
  }

  fetchAuthor(e) {
    e.preventDefault();

    Actions.switchToLoading(`${this.props.fullName} | author`);

    axios
      .get(`${this.props.appBaseUrl}api?author=${this.props.slug}`)
      .then(response => {
        Actions.updateBlogs({
          blogs: response.data,
          goingToUrl: `${this.props.appBaseUrl}authors/${this.props.slug}`,
        });
      })
      .then(() => {
        Actions.returnToReady();
        this.routeHandler(`authors/${this.props.slug}`);
      })
      .catch(error => {
        console.log(`error making ajax call: ${error}`);
        this.routeHandler('not-found');
      }); /* end Axios call */
  }

  routeHandler(location) {
    this.context.router.push(`${this.props.appBaseUrl}${location}`);
  }

  render() {
    if (this.props.fullName) {
      return (
        <p className={this.props.className}>
          <Link
            to={`${this.props.appBaseUrl}authors/${this.props.slug}`}
            className="blogAuthor-name-link"
            onClick={this.fetchAuthor}
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
  fullName: PropTypes.string.isRequired,
  slug: PropTypes.string,
  className: PropTypes.string,
  appBaseUrl: PropTypes.string,
};

BlogAuthorName.defaultProps = {
  fullName: '',
  className: 'blogAuthor-name',
};

/*
 * @see http://stackoverflow.com/questions/32033247/react-router-transitionto-is-not-a-function
 */

BlogAuthorName.contextTypes = {
  router: PropTypes.object,
};

export default BlogAuthorName;
