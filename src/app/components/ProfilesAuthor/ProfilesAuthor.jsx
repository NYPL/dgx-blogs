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

    Actions.switchToLoading(`${this.props.firstName} ${this.props.lastName} | Author`);

    axios
      .get(`${appBaseUrl}api?author=${this.props.id}`)
      .then(response => {
        Actions.updateBlogs({
          blogs: response.data,
          goingToUrl: `${appBaseUrl}authors/${this.props.id}`,
        });
      })
      .then(() => {
        Actions.returnToReady();
        this.routeHandler(`authors/${this.props.id}`);
      })
      .catch(error => {
        console.log(`error making ajax call: ${error}`);
        this.routeHandler('not-found');
      }); /* end Axios call */
  }

  routeHandler(location) {
    this.context.router.push(`${appBaseUrl}${location}`);
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

ProfilesAuthor.propTypes = {
  firstName: React.PropTypes.string,
  lastName: React.PropTypes.string,
  id: React.PropTypes.string,
  picture: React.PropTypes.string,
  title: React.PropTypes.string,
};

export default ProfilesAuthor;
