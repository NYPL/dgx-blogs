import React from 'react';
import { Link } from 'react-router';

import AuthorSeeAll from '../AuthorSeeAll/AuthorSeeAll';
import ProfilesAuthor from '../ProfilesAuthor/ProfilesAuthor';
import ProfilesTopPosts from '../ProfilesTopPosts/ProfilesTopPosts';

class ProfilesListLetter extends React.Component {

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
            firstName={profile.authorData.attributes['first-name']}
            lastName={profile.authorData.attributes['last-name']}
            picture={profile.picture}
            title={profile.authorData.attributes.title}
          />
          <div
            className="profilesListLetter-bio"
            dangerouslySetInnerHTML={unescapedBio}
          >
          </div>
          <ProfilesTopPosts maxPostsShown={3} posts={profile.postsData}/>
          <AuthorSeeAll
            id={profile.id}
            firstName={profile.authorData.attributes['first-name']}
          />
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

ProfilesListLetter.defaultProps = {
  profiles: []
};

export default ProfilesListLetter;
