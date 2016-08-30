import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import Actions from '../../actions/Actions';

class BackToBlogs extends React.Component {
  constructor(props) {
    super(props);

    this.fetchBlogList = this.fetchBlogList.bind(this);
  }

  fetchBlogList(e) {
    e.preventDefault();

    Actions.turnToLoadingState({
      loadingTitle: 'Blogs Home | NYPL',
    });

    axios
      .get(`${this.props.appBaseUrl}api?blog=all`)
      .then(response => {
        Actions.updateBlogs({
          blogs: response.data,
          goingToUrl: this.props.appBaseUrl,
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
    this.context.router.push(this.props.appBaseUrl);
  }

  render() {
    return (
      <Link
        className="backToLink"
        to={this.props.appBaseUrl}
        onClick={this.fetchBlogList}
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
