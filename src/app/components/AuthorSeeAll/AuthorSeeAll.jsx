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

    Actions.switchToLoading();

    axios
      .get(`${appBaseUrl}api?author=${this.props.id}`)
      .then(response => {
        console.log('gotten data', response);
      })
      .then(response => {
        Actions.returnToReady();
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
      <Link
        className="authorSeeAll"
        to={`${appBaseUrl}author/${this.props.id}`}
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

export default AuthorSeeAll;
