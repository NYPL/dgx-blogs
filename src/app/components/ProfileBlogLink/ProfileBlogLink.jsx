import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import axios from 'axios';
import Actions from '../../actions/Actions';

/* @todo investigate using context for this */
import appConfig from '../../../../appConfig.js';
const appBaseUrl = appConfig.appBaseUrl;

class ProfileBlogLink extends React.Component {
  constructor(props) {
    super(props);

    this.fetchSingleBlog = this.fetchSingleBlog.bind(this);
  }

  /* @todo this request is repeated in various components, it would be ideal
   * to move it to the store and reuse this code with an Action
   */
  fetchSingleBlog(e) {
    e.preventDefault();

    Actions.switchToLoading(this.props.title);

    axios
      .get(`${appBaseUrl}api?blog=${this.props.url}`)
      .then(response => {
        // console.log('BLOGLISTING: result', response.data);
        Actions.updateBlogPost(response.data);
      })
      .then(() => {
        Actions.returnToReady();
        this.routeHandler(`${appBaseUrl}${this.props.url}`);
      })
      .catch(error => {
        console.log(`error making ajax call: ${error}`);
        this.routeHandler(`${this.props.appBaseUrl}not-found`);
      }); /* end Axios call */
  }

  routeHandler(url) {
    this.context.router.push(url);
  }

  render() {
    return (
      <Link
        className="profileBlogLink"
        to={`${appBaseUrl}${this.props.url}`}
        onClick={this.fetchSingleBlog}
      >
        {this.props.title}
      </Link>
    );
  }
}

ProfileBlogLink.contextTypes = {
  router: PropTypes.object,
};

ProfileBlogLink.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
};

export default ProfileBlogLink;
