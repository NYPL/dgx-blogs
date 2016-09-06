import React from 'react';
import { Link } from 'react-router';

import _ from 'underscore';

import ProfilesListLetter from '../ProfilesListLetter/ProfilesListLetter';
import ProfilesListLetterTitle from '../ProfilesListLetterTitle/ProfilesListLetterTitle';

class ProfilesList extends React.Component {

  constructor(props) {
    super(props);
  }

  renderProfiles(profiles) {

    return profiles.map( function(profile) {
      return (
        <li key={profile.id}>{profile.id} -- {profile.name}</li>
      );
    });
  }

  renderAlphabet() {

    if (this.props.profiles.length <= 0) {
      return (
        <li> Loading ...</li>
      );
    }

    return _.map(this.props.profiles, function(letterArray, index) {

      return (
        <article>
          <ProfilesListLetterTitle letter={index} />
          <ProfilesListLetter profiles={letterArray} />
        </article>
      );
    });
  }

  render() {

    return (
      <main>
        {this.renderAlphabet()}
      </main>
    );
  }
};

ProfilesList.defaultProps = {
  profiles: []
};

export default ProfilesList;
