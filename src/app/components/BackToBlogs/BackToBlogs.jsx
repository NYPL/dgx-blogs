import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import Actions from '../../actions/Actions';

import appConfig from '../../../../appConfig.js';

const appBaseUrl = appConfig.appBaseUrl;

class BackToBlogs extends React.Component {
  constructor(props) {
    super(props);

    this.fetchBlogList = this.fetchBlogList.bind(this);
  }

  fetchBlogList(e) {
    e.preventDefault();

    Actions.switchToLoading('Blogs Home | NYPL');

    axios
      .get(`${appBaseUrl}api?blog=all`)
      .then(response => {
        Actions.updateBlogs({
          blogs: response.data,
          goingToUrl: this.props.appBaseUrl,
        });
      })
      .then(() => {
        Actions.returnToReady('Blogs Home | NYPL');
        this.routeHandler();
      })
      .catch(error => {
        console.log(`error making ajax call: ${error}`);
      }); /* end Axios call */
  }

  routeHandler() {
    this.context.router.push(appBaseUrl);
  }

  render() {
    return (
      <Link
        className="backToLink"
        to={appBaseUrl}
        onClick={this.fetchBlogList}
      >
        <span className="nypl-icon-wedge-left"></span> {this.props.text}
      </Link>
    );
  }
}

BackToBlogs.defaultProps = {
  text: 'back to blogs',
};

BackToBlogs.contextTypes = {
  router: function contextType() {
    return React.PropTypes.func.isRequired;
  },
};

export default BackToBlogs;
