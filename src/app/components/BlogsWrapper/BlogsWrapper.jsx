import React from 'react';

import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions';

import { Link } from 'react-router';

import HeroSinglePost from '../HeroSinglePost/HeroSinglePost';
import Hero from '../Hero/Hero';
import BlogRow from '../BlogRow/BlogRow';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';
import LoadingLayer from '../LoadingLayer/LoadingLayer';

import { LeftWedgeIcon } from 'dgx-svg-icons';

import appConfig from '../../../../appConfig.js';
const appBaseUrl = appConfig.appBaseUrl;

/* metatags */
import DocMeta from 'react-doc-meta';

import {
  map as _map,
  isEmpty as _isEmpty,
  keys as _keys,
  findWhere as _findWhere,
} from 'underscore';

class BlogsWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = Store.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    Store.listen(this.onChange);

    // if (this.state.blogs[0] === undefined) {
    //   this.context.router.push('/blog/beta/not-found');
    //   return;
    // }
  }

  componentWillUnmount() {
    Store.unlisten(this.onChange);
  }

  onChange() {
    this.setState(Store.getState());
  }

  getList(blogsList) {
    return _map(blogsList, (blogRow, index) => {
      return ( 
        <BlogRow 
          data={blogRow} 
          key={index}
          appBaseUrl={appBaseUrl}
        /> );
    });
  }

  componentWillReceiveProps(nextProps) {

    /* comparing new url with the url for the data we have */
    if (this.state.lastUrl) {

      /* if data is different we try to get the right one from cache */
      if (nextProps.location.pathname !== this.state.lastUrl) {

        if (this.state.cache[nextProps.location.pathname]) {
          
          Actions.fromCache(nextProps.location.pathname);
        }
      }
    }
  }

  renderLoadMoreButton(currentState, filter) {
    const postsLeft = currentState.meta.count - currentState.blogList.length;

    if (postsLeft <= 0) {
      return null;
    }

    return (
      <LoadMoreButton
        postsLeft={postsLeft}
        filter={filter}
        currentPage={currentState.currentPage}
        appBaseUrl={appBaseUrl}
      />
    );
  }

  imageMeta(imageField) {

    if (imageField && imageField.length !== 0) {
      return imageField;
    }

    return 'https://d2720ur5668dri.cloudfront.net/sites/default/files/styles/extralarge/public/blog.jpg';
  }

  render() {
    const currentState = this.state.blogs;
    const blogs = this.getList(currentState.blogList);

    /* this image will be used in case of missing images */
    const imageFallback = 'https://d2720ur5668dri.cloudfront.net/sites/default/files/styles/extralarge/public/blog.jpg';

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

    let pageType;
    let param;
    let series;
    let subjects;
    let author;
    let hero = <HeroSinglePost />;

    /* default filter to get the content through ajax */
    let filter = 'blog=all';

    if (! _isEmpty(this.props.params)) {
      pageType = _keys(this.props.params)[0];
      param = this.props.params[pageType];

      if (pageType === 'author') {

        author = currentState.blogList[0][pageType];

        hero = (<Hero
          type="author"
          title={author.fullName}
          description={author.title}
          picture={author.profileImgUrl}
          postCount={currentState.meta.count}
        />);

        /* override the metas according to an author page */
        homeMetas = [
          { property: 'og:type', content: 'website' },
          { property: 'og:title', content: `${author.fullName } | The New York Public Library` },
          { property: 'og:description', content: (author.profileText) ? author.profileText.replace(/(<([^>]+)>)/ig, '') : '' },
          { property: 'og:image', content: this.imageMeta(author.profileImgUrl) },
          //{ property: 'og:url', content: `http://blogs.nypl.org${appBaseUrl}` },
          { name: 'twitter:title', content: `${author.fullName} | The New York Public Library` },
          { name: 'twitter:description', content: (author.profileText) ? author.profileText.replace(/(<([^>]+)>)/ig, '') : '' },
          { name: 'twitter:image', content: this.imageMeta(author.profileImgUrl) }
        ];

        /* set filter to get ajax content only for an author */
        filter = `author=${author.id}`;

      } else if (pageType === 'series') {

        series = _findWhere(currentState.blogList[0][pageType], { id: param });

        hero = (<Hero
          type="Blog Series"
          title={series.title}
          description={series.body.replace(/(<([^>]+)>)/ig, '')}
          picture={series.image.url}
          postCount={currentState.meta.count}
        />);

        /* set filter to get ajax content only for a series */
        filter = `series=${series.id}`;

        /* override the metas according to a series page */
        homeMetas = [
          { property: 'og:type', content: 'website' },
          { property: 'og:title', content: `${series.title} | The New York Public Library` },
          { property: 'og:description', content: series.body.replace(/(<([^>]+)>)/ig, '') },
          { property: 'og:image', content: this.imageMeta(series.image.url) },
          //{ property: 'og:url', content: `http://blogs.nypl.org${appBaseUrl}` },
          { name: 'twitter:title', content: `${series.title} | The New York Public Library` },
          { name: 'twitter:description', content: series.body.replace(/(<([^>]+)>)/ig, '') },
          { name: 'twitter:image', content: this.imageMeta(series.image.url) }
        ];

      } else if (pageType === 'subjects') {

        subjects = _findWhere(currentState.blogList[0][pageType], { id: param });
        hero = (<Hero
          type="Blog Subject"
          title={subjects.name}
          postCount={currentState.meta.count}
        />);

        /* set filter to get ajax content only for a subject */
        filter = `subject=${subjects.id}`;

        /* override the metas according to a subject page */
        homeMetas = [
          { property: 'og:type', content: 'website' },
          { property: 'og:title', content: `${subjects.name} | The New York Public Library` },
          { property: 'og:image', content: this.imageMeta(null) },
          //{ property: 'og:url', content: `http://blogs.nypl.org${appBaseUrl}` },
          { name: 'twitter:title', content: `${subjects.name} | The New York Public Library` },
          { name: 'twitter:image', content: this.imageMeta(null) }
        ];
      }
    }

    return (
      <div className="blogsWrapper">
        <DocMeta tags={homeMetas} />
        <LoadingLayer
          status={this.state.appLoading} 
          title={this.state.loadingTitle}
        />
        {hero}
        <section className="content" id="mainContent">
          <nav className="sidebar">
            <div className="sidebar-breadCrumb">
              <LeftWedgeIcon ariahidden />
              <a href="https://www.nypl.org">Home</a>
            </div>
            <h3 className="sidebar-title">Blog</h3>
            <Link to={`${appBaseUrl}authors`} className="sidebar-link">Blogger Profiles</Link>
          </nav>
          <main className="blogsList">
            {blogs}
          </main>
          {this.renderLoadMoreButton(currentState, filter)}
        </section>
      </div>
    );
  }
}

BlogsWrapper.contextTypes = {
  router: function contextType() {
    return React.PropTypes.func.isRequired;
  },
};

export default BlogsWrapper;
