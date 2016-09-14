import React from 'react';
import { Link } from 'react-router';
import { LeftWedgeIcon } from 'dgx-svg-icons';

import ProfileStore from '../../stores/ProfileStore.js';
import Actions from '../../actions/Actions';

/* metatags */
import DocMeta from 'react-doc-meta';

import GenericHero from '../GenericHero/GenericHero';
import LoadingLayer from '../LoadingLayer/LoadingLayer';
import ProfilesList from '../ProfilesList/ProfilesList';

import appConfig from '../../../../appConfig.js';

const appBaseUrl = appConfig.appBaseUrl;


class ProfilesWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = ProfileStore.getState();
    this.onChange = this.onChange.bind(this);

    Actions.loadProfiles();
    Actions.switchToLoading('NYPL | Blogger Profiles');
  }

  componentDidMount() {
    ProfileStore.listen(this.onChange);
  }

  componentWillUnmount() {
    ProfileStore.unlisten(this.onChange);
  }

  onChange() {
    this.setState(ProfileStore.getState());
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

    return (
      <section className="profilesWrapper">
        <DocMeta tags={homeMetas} />
        <LoadingLayer />
        <GenericHero title="NYPL Bloggers" />
        <div className="content">
          <nav className="sidebar">
            <div className="sidebar-breadCrumb">
              <LeftWedgeIcon ariahidden />
              <a href="https://www.nypl.org">Home</a>
            </div>
            <h3 className="sidebar-title">Blogger Profiles</h3>
            <Link to={`${appBaseUrl}`} className="sidebar-link">Blog</Link>
            <a href="#" className="sidebar-link">Blog Topics</a>
          </nav>
          <ProfilesList profiles={this.state.profiles.profiles} /> 
        </div>
      </section>
    );
  }
}

export default ProfilesWrapper;
