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
          goingToUrl: appBaseUrl,
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
  text: 'BLOG',
};

BackToBlogs.contextTypes = {
  router: function contextType() {
    return React.PropTypes.func.isRequired;
  },
};

BackToBlogs.propTypes = {
  text: React.PropTypes.string,
};

export default BackToBlogs;
