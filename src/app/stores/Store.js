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
    }
    this.setState(newState);
  }

  handleBlogPost(blogPost) {

    this.setState({
      blogs: this.state.blogs,
      blogPost: blogPost,
    });
  }

  addMoreBlogs(blogs) {

    const newBlogList = this.state.blogs.blogList.concat(blogs.blogList);
    const currentPage = this.state.blogs.currentPage + 1;

    this.setState({
        blogs: {
          blogList: newBlogList,
          meta: this.state.blogs.meta,
          currentPage: currentPage,
        },
        blogPost: this.state.blogPost,
      });
  }
}

BlogStore.displayName = 'BlogStore';

export default alt.createStore(BlogStore);

// export default alt.createStore(ImmutableUtil(BlogStore));
