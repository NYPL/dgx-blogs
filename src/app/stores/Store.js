import Actions from '../actions/Actions.js';
import alt from 'dgx-alt-center';
// import ImmutableUtil from 'alt-utils/lib/ImmutableUtil';
// import Immutable from 'immutable';

class BlogStore {
  constructor() {
    this.bindListeners({
      handleBlogs: Actions.UPDATE_BLOGS,
      handleBlogPost: Actions.UPDATE_BLOG_POST,
      addMoreBlogs: Actions.ADD_MORE_BLOGS,
      fromCache: Actions.FROM_CACHE,
      turnToLoadingState: Actions.TURN_TO_LOADING_STATE,
    });

    this.state = {
      blogs: {
        blogList: [],
        meta: {
          count: 0,
        },
        currentPage: 2,
      },
      blogPost: [],
      cache: {},
      appLoading: 'ready',
      loadingTitle: '',
    };
  }

  handleBlogs(blogs) {

    console.log('STORE: me está llegando', blogs);

    const newState = {
      blogs: {
        blogList: blogs.blogs.blogList,
        meta: {
          count: blogs.blogs.meta.count,
        },
        currentPage: 2,
      },
      blogPost: this.state.blogPost,
      cache: this.state.cache,
      appLoading: 'ready',
      loadingTitle: '',
    };

    /* store now knows the last url so components know if they have the right data */
    if (blogs.goingToUrl) {
      newState.lastUrl = blogs.goingToUrl;
      console.log('STORE: storing new ulr in the store', newState.lastUrl);
    }

    /* cache the last value just in case the user press back or returns in some other way */
    if (this.state.lastUrl) {
      this.state.cache[this.state.lastUrl] = this.state.blogs;
      console.log('STORE: new value added to cache:', this.state.cache);
    }

    this.setState(newState);
  }

  handleBlogPost(blogPost) {

    this.setState({
      blogs: this.state.blogs,
      blogPost: blogPost,
      cache: this.state.cache,
      appLoading: 'ready',
      loadingTitle: '',
    });
  }

  addMoreBlogs(blogs) {

    if (! blogs.error) {

      const newBlogList = this.state.blogs.blogList.concat(blogs.blogList);
      const currentPage = this.state.blogs.currentPage + 1;

      this.setState({
        blogs: {
          blogList: newBlogList,
          meta: this.state.blogs.meta,
          currentPage: currentPage,
        },
        blogPost: this.state.blogPost,
        cache: this.state.cache,
        appLoading: 'ready',
        loadingTitle: '',
      });
    } else {

      console.log('STORE: error on api response');
    }

  }

  fromCache(cacheKey) {

    if (this.state.cache[cacheKey]) {

      this.setState({
        blogs: this.state.cache[cacheKey],
        blogPost: this.state.blogPost,
        cache: this.state.cache,
        appLoading: 'ready',
        loadingTitle: '',
      });    
    } else {
      console.log('STORE: value is not on cache');
    }
  }

  turnToLoadingState(data) {

    if (! data) {
      data = {
        loadingTitle: '',
      };
    }

    this.setState({
      blogs: this.state.blogs,
      blogPost: this.state.blogPost,
      cache: this.state.cache,
      appLoading: 'loading',
      loadingTitle: data.loadingTitle,
    });
  }
}

BlogStore.displayName = 'BlogStore';

export default alt.createStore(BlogStore);
