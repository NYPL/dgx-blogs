import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import Actions from '../../actions/Actions';

class BlogAuthorName extends React.Component {
  constructor(props) {
    super(props);

    this._fetchAuthor = this._fetchAuthor.bind(this);
  }

  _fetchAuthor(e) {
    e.preventDefault();

    axios
      .get(`/api?author=${this.props.slug}`)
      .then(response => {
        console.log(response);
        Actions.updateBlogs(response.data);
      })
      .then(response => {
        this.routeHandler();
      })
      .catch(error => {
        console.log(`error making ajax call: ${error}`);
      }); /* end Axios call */
  }

  routeHandler(){
    console.log('router transition to: ', `/blog/author/${this.props.slug}`);
    this.context.router.push(`/blog/author/${this.props.slug}`);
    console.log('after transition');
  }

  render() {
    if (this.props.fullName) {
      return (
        <p className="blogAuthor-name">
          <Link
            to={`/blog/author/${this.props.slug}`}
            className="blogAuthor-name-link"
            onClick={this._fetchAuthor}
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

/*
 * @see http://stackoverflow.com/questions/32033247/react-router-transitionto-is-not-a-function
 */

BlogAuthorName.contextTypes = {
  router: function contextType() {
    return React.PropTypes.func.isRequired;
  }
};

export default BlogAuthorName;
