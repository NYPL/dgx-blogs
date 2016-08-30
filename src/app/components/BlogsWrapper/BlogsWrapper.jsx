import React from 'react';

import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions';

import HeroSinglePost from '../HeroSinglePost/HeroSinglePost';
import Hero from '../Hero/Hero';
import BlogRow from '../BlogRow/BlogRow';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';
import LoadingLayer from '../LoadingLayer/LoadingLayer';

import appConfig from '../../../../appConfig.js';
const appBaseUrl = appConfig.appBaseUrl;

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

  render() {
    const currentState = this.state.blogs;
    const blogs = this.getList(currentState.blogList);

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

      } else if (pageType === 'subjects') {

        subjects = _findWhere(currentState.blogList[0][pageType], { id: param });
        hero = (<Hero
          type="Blog Subject"
          title={subjects.name}
          postCount={currentState.meta.count}
        />);

        /* set filter to get ajax content only for a subject */
        filter = `subject=${subjects.id}`;
      }
    }

    return (
      <div className="blogsWrapper">
        <LoadingLayer
          status={this.state.appLoading} 
          title={this.state.loadingTitle}
        />
        {hero}
        <section className="content" id="mainContent">
          <nav className="sidebar">
            <h3 className="sidebar-title">Blog</h3>
            <a href="#" className="sidebar-link">Blogger Profiles</a>
            <a href="#" className="sidebar-link">Blog Topics</a>
          </nav>
          <main className="blogsList">
            {blogs}
            {this.renderLoadMoreButton(currentState, filter)}
          </main>
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
