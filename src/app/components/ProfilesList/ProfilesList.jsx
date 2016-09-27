import React from 'react';

import {
  map as _map,
} from 'underscore';

import ProfilesListLetter from '../ProfilesListLetter/ProfilesListLetter';
import ProfilesListLetterTitle from '../ProfilesListLetterTitle/ProfilesListLetterTitle';

class ProfilesList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderAlphabet() {
    return _map(this.props.profiles, (letterItem, i) => (
      <article className="profilesList-item" key={i}>
        <ProfilesListLetterTitle letter={letterItem.letter} />
        <ProfilesListLetter profiles={letterItem.authors} />
      </article>
    ));
  }

  render() {
    return (
      <main className="profilesList">
        {this.renderAlphabet()}
      </main>
    );
  }
}

ProfilesList.defaultProps = {
  profiles: [],
};

ProfilesList.propTypes = {
  profiles: React.PropTypes.array,
};

export default ProfilesList;
