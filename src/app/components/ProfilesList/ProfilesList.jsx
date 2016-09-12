import React from 'react';
import { Link } from 'react-router';

import _ from 'underscore';

import LoadingLayer from '../LoadingLayer/LoadingLayer';
import ProfilesListLetter from '../ProfilesListLetter/ProfilesListLetter';
import ProfilesListLetterTitle from '../ProfilesListLetterTitle/ProfilesListLetterTitle';

class ProfilesList extends React.Component {

  constructor(props) {
    super(props);
  }

  renderAlphabet() {

    if (this.props.profiles.length <= 0) {
      return (
        <LoadingLayer 
          status="loading"
          title="Blogger Profiles | NYPL"
        />
      );
    }

    return _.map(this.props.profiles, function(letterItem) {

      return (
        <article className="profilesList-item">
          <ProfilesListLetterTitle letter={letterItem.letter} />
          <ProfilesListLetter profiles={letterItem.authors} />
        </article>
      );
    });
  }

  render() {

    return (
      <main className="profilesList">
        {this.renderAlphabet()}
      </main>
    );
  }
};

ProfilesList.defaultProps = {
  profiles: []
};

export default ProfilesList;
