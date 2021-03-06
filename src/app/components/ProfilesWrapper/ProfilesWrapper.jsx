import React from 'react';

import ProfileStore from '../../stores/ProfileStore.js';
import Actions from '../../actions/Actions';

/* metatags */
import DocMeta from 'react-doc-meta';

import BackToBlogs from '../BackToBlogs/BackToBlogs';
import GenericHero from '../GenericHero/GenericHero';
import LoadingLayer from '../LoadingLayer/LoadingLayer';
import ProfilesList from '../ProfilesList/ProfilesList';
import SkinnyBanner from '../SkinnyBanner/SkinnyBanner.jsx';

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

    return 'https://d2720ur5668dri.cloudfront.net/sites/default/files/styles/' +
      'extralarge/public/blog.jpg';
  }

  render() {
    let homeMetas = [
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'NYPL | Blog: Library Voices' },
      { property: 'og:site_name', content: 'The New York Public Library' },
      {
        property: 'og:description',
        content: 'From great literature or children\'s books to job search help and New' +
        ' York City history, our librarians, curators, and staff offer valuable insight. ' +
        'See what\'s on their minds.',
      },
      { property: 'og:image', content: this.imageMeta(null) },
      { property: 'og:url', content: `http://nypl.org${appBaseUrl}` },
      { name: 'twitter:title', content: 'NYPL | Blog: Library Voices' },
      {
        name: 'twitter:description',
        content: 'From great literature or children\'s books to job search help and New' +
        ' York City history, our librarians, curators, and staff offer valuable insight. ' +
        'See what\'s on their minds.',
      },
      { name: 'twitter:image', content: this.imageMeta(null) },
      { name: "twitter:card", content: 'summary_large_image' },
      { name: "twitter:site", content: '@nypl' },
      { name: "twitter:creator", content: '@nypl' },
    ];

    return (
      <section className="profilesWrapper">
        <DocMeta tags={homeMetas} />
        <LoadingLayer />
        <GenericHero title="NYPL Bloggers" />
        <SkinnyBanner path={this.props.location.pathname} />
        <div className="content">
          <nav className="sidebar" role="navigation">
            <div className="sidebar-breadCrumb">
              <BackToBlogs text="blog" />
            </div>
            <h3 className="sidebar-title">Blogger Profiles</h3>
          </nav>
          <ProfilesList profiles={this.state.profiles.profiles} />
        </div>
      </section>
    );
  }
}

ProfilesWrapper.propTypes = {};

export default ProfilesWrapper;
