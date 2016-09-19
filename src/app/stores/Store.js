import alt from 'dgx-alt-center';

import Actions from '../actions/Actions.js';

class BlogStore {
  constructor() {
    this.bindListeners({
      handleBlogs: Actions.UPDATE_BLOGS,
      handleBlogPost: Actions.UPDATE_BLOG_POST,
      addMoreBlogs: Actions.ADD_MORE_BLOGS,
      fromCache: Actions.FROM_CACHE,
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
    };
  }

  handleBlogs(blogs) {
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
    };

    /* store now knows the last url so components know if they have the right data */
    if (blogs.goingToUrl) {
      newState.lastUrl = blogs.goingToUrl;
    }

    /* cache the last value just in case the user press back or returns in some other way */
    if (this.state.lastUrl) {
      this.state.cache[this.state.lastUrl] = this.state.blogs;
    }

    this.setState(newState);
  }

  handleBlogPost(blogPost) {
    this.setState({
      blogs: this.state.blogs,
      cache: this.state.cache,
      blogPost,
    });
  }

  addMoreBlogs(blogs) {
    if (!blogs.error) {
      const newBlogList = this.state.blogs.blogList.concat(blogs.blogList);
      const currentPage = this.state.blogs.currentPage + 1;

      this.setState({
        blogs: {
          blogList: newBlogList,
          meta: this.state.blogs.meta,
          currentPage,
        },
        blogPost: this.state.blogPost,
        cache: this.state.cache,
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
      });
    } else {
      console.log('STORE: value is not on cache');
    }
  }
}

BlogStore.displayName = 'BlogStore';

export default alt.createStore(BlogStore);
