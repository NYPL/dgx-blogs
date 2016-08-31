import React from 'react';
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

    axios
      .get(`${this.props.appBaseUrl}api?author=${this.props.slug}`)
      .then(response => {
        Actions.updateBlogs({
          blogs: response.data,
          goingToUrl: `${this.props.appBaseUrl}author/${this.props.slug}`,
        });
      })
      .then(() => {
        this.routeHandler();
      })
      .catch(error => {
        console.log(`error making ajax call: ${error}`);
      }); /* end Axios call */
  }

  routeHandler() {
    this.context.router.push(`${this.props.appBaseUrl}author/${this.props.slug}`);
  }

  render() {
    if (this.props.fullName) {
      return (
        <p className={this.props.className}>
          <Link
            to={`${this.props.appBaseUrl}author/${this.props.slug}`}
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
  fullName: React.PropTypes.string.isRequired,
  slug: React.PropTypes.string,
  className: React.PropTypes.string,
};

BlogAuthorName.defaultProps = {
  fullName: '',
  className: 'blogAuthor-name',
};

/*
 * @see http://stackoverflow.com/questions/32033247/react-router-transitionto-is-not-a-function
 */

BlogAuthorName.contextTypes = {
  router: function contextType() {
    return React.PropTypes.func.isRequired;
  },
};

export default BlogAuthorName;
