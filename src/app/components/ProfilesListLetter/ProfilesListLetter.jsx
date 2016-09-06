import React from 'react';
import { Link } from 'react-router';

import ProfilesAuthor from '../ProfilesAuthor/ProfilesAuthor';

class ProfilesList extends React.Component {

  constructor(props) {
    super(props);
  }

  createMarkup(bioText) {
    return { __html: bioText };
  }

  renderProfiles() {

    const _this = this;

    return this.props.profiles.map( function(profile) {

      const unescapedBio = _this.createMarkup(profile.bio);

      return (
        <article
          key={profile.id}
          className="profilesListLetter-item"
        >
          <ProfilesAuthor
            id={profile.id}
            name={profile.name}
            picture={profile.picture}
            title={profile.title}
          />
          <div
            className="profilesListLetter-bio"
            dangerouslySetInnerHTML={unescapedBio}
          >
          </div>
        </article>
      );
    });
  }

  render() {

    return (
      <section className="profilesListLetter">
        {this.renderProfiles()}
      </section>
    );
  }
};

ProfilesList.defaultProps = {
  profiles: []
};

export default ProfilesList;
