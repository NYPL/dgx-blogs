import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import Actions from '../../actions/Actions';

/* @todo investigate using context for this */
import appConfig from '../../../../appConfig.js';
const appBaseUrl = appConfig.appBaseUrl;

import AuthorPicture from '../AuthorPicture/AuthorPicture';

class ProfilesAuthor extends React.Component {
  constructor(props) {
    super(props);

    this.fetchAuthor = this.fetchAuthor.bind(this);
  }

  fetchAuthor(e) {
    e.preventDefault();

    Actions.turnToLoadingState({
      loadingTitle: this.props.name + ' | author',
    });

    axios
      .get(`${appBaseUrl}api?author=${this.props.id}`)
      .then(response => {
        Actions.updateBlogs({
          blogs: response.data,
          goingToUrl: `${appBaseUrl}author/${this.props.id}`,
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
    this.context.router.push(`${appBaseUrl}author/${this.props.id}`);
  }

  render() {
      return (
        <header>
          <AuthorPicture picture={this.props.picture} />
          <h2 className="profilesAuthor-name">
            <Link
              to={`${appBaseUrl}author/${this.props.id}`}
              className="blogAuthor-name-link"
              onClick={this.fetchAuthor}
            >
              {this.props.firstName} {this.props.lastName}
            </Link>
          </h2>
          <p className="profilesAuthor-title">{this.props.title}</p>
        </header>
      );
  }
}

ProfilesAuthor.contextTypes = {
  router: function contextType() {
    return React.PropTypes.func.isRequired;
  },
};

export default ProfilesAuthor;
