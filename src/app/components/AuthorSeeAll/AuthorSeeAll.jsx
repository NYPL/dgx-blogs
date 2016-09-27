import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import Actions from '../../actions/Actions';

/* @todo investigate using context for this */
import appConfig from '../../../../appConfig.js';
const appBaseUrl = appConfig.appBaseUrl;

class AuthorSeeAll extends React.Component {
  constructor(props) {
    super(props);

    this.fetchAuthor = this.fetchAuthor.bind(this);
  }

  /* @todo this request is repeated in various components, it would be ideal
   * to move it to the store and reuse this code with an Action
   */
  fetchAuthor(e) {
    e.preventDefault();

    Actions.switchToLoading(`${this.props.name} | NYPL Author`);

    axios
      .get(`${appBaseUrl}api?author=${this.props.id}`)
      .then(response => {
        Actions.updateBlogs({ blogs: response.data });
      })
      .then(response => {
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
      <Link
        className="authorSeeAll"
        to={`${appBaseUrl}authors/${this.props.id}`}
        onClick={this.fetchAuthor}
      >
        <span>{`See all ${this.props.firstName}'s posts`}</span>
      </Link>
      );
  }
}

AuthorSeeAll.contextTypes = {
  router: function contextType() {
    return React.PropTypes.func.isRequired;
  },
};

AuthorSeeAll.propTypes = {
  name: React.PropTypes.string,
  id: React.PropTypes.string,
  firstName: React.PropTypes.string,
};

export default AuthorSeeAll;
