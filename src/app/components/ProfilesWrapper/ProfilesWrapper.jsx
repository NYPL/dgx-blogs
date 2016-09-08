import React from 'react';

import ProfileStore from '../../stores/ProfileStore.js';
import Actions from '../../actions/Actions';

import appConfig from '../../../../appConfig.js';
const appBaseUrl = appConfig.appBaseUrl;

/* metatags */
import DocMeta from 'react-doc-meta';

import GenericHero from '../GenericHero/GenericHero';
import ProfilesList from '../ProfilesList/ProfilesList';

class ProfilesWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = ProfileStore.getState();
    this.onChange = this.onChange.bind(this);

    Actions.loadProfiles();
  }

  componentDidMount() {
    ProfileStore.listen(this.onChange);
  }

  componentWillUnmount() {
    ProfileStore.unlisten(this.onChange);
  }

  onChange() {
    this.setState(ProfileStore.getState());
    console.log('PROFILES-WRAPPER: current state', this.state);
  }

  imageMeta(imageField) {
    if (imageField && imageField.length !== 0) {
      return imageField;
    }

    return 'https://d2720ur5668dri.cloudfront.net/sites/default/files/styles/extralarge/public/blog.jpg';
  }

  render() {

    let homeMetas = [
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'Library Voices | The New York Public Library' },
      { property: 'og:description', content: 'From great literature or children\'s books to job search help and New York City history, our librarians, curators, and staff offer valuable insight. See what\'s on their minds.' },
      { property: 'og:image', content: this.imageMeta(null) },
      //{ property: 'og:url', content: `http://blogs.nypl.org${appBaseUrl}` },
      { name: 'twitter:title', content: 'Library Voices | The New York Public Library' },
      { name: 'twitter:description', content: 'From great literature or children\'s books to job search help and New York City history, our librarians, curators, and staff offer valuable insight. See what\'s on their minds.' },
      { name: 'twitter:image', content: this.imageMeta(null) }
    ];

    console.log('PROFILES-WRAPPER: render this profiles:', this.state);

    return (
      <section className="profilesWrapper">
        <DocMeta tags={homeMetas} />
        <GenericHero title="NYPL Bloggers" />
        <ProfilesList profiles={this.state.profiles.profiles} /> 
      </section>
    );
  }
}

export default ProfilesWrapper;
