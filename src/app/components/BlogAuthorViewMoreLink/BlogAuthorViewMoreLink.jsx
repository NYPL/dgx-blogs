import React from 'react';
import { Link, Navigation } from 'react-router';
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
        console.log('view more for author response', response);
        Actions.updateBlogs(response.data);
      })
      .then(response => {
        console.log('transition done.')
        this.routeHandler();
      })
      .catch(error => {
        console.log(`error making ajax call: ${error}`);
      }); /* end Axios call */
  }

  routeHandler(){
    console.log('routeHandler executed');
    this.context.router.push(`/blog/author/${this.props.slug}`);
  }

  render() {
    return(
      <p
        className="authorLink"
        onClick={this._fetchAuthor.bind(this, this.props.slug)}
      >
        <b>View all posts by</b> {this.props.fullName}
      </p>    
      );
  }
}

BlogAuthorViewMoreLink.propTypes = {
  slug: React.PropTypes.string,
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
  }
};

export default BlogAuthorViewMoreLink;
