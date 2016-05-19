import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import Actions from '../../actions/Actions';

class BackToBlogs extends React.Component {
  constructor(props) {
    super(props);

    this._fetchBlogList = this._fetchBlogList.bind(this);
  }

  _fetchBlogList(e) {
    e.preventDefault();

    axios
      .get('/api?blog=all')
      .then(response => {
        Actions.updateBlogs(response.data);
      })
      .then(response => {
        this.routeHandler();
      })
      .catch(error => {
        console.log(`error making ajax call: ${error}`);
      }); /* end Axios call */
  }

  routeHandler() {
    this.context.router.push('/blog');
  }

  render() {
    return (
      <Link
        className="backToLink"
        to={'/blog'}
        onClick={this._fetchBlogList}
      >
        <span className="nypl-icon-wedge-left"></span> back to blogs
      </Link>
    );
  }
}

BackToBlogs.contextTypes = {
  router: function contextType() {
    return React.PropTypes.func.isRequired;
  },
};

export default BackToBlogs;
