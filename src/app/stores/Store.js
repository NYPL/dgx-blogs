import Actions from '../actions/Actions.js';
import alt from 'dgx-alt-center';

class BlogStore {
  constructor() {
    this.bindListeners({
      handleBlogs: Actions.UPDATE_BLOGS,
      handleBlogPost: Actions.UPDATE_BLOG_POST,
    });

    this.on('init', () => {
      this.blogs = [];
      this.blogPost = [];
    });
  }

  handleBlogs(blogs) {
    this.blogs = blogs;
  }

  handleBlogPost(blogPost) {
    this.blogPost = blogPost;
  }
}

export default alt.createStore(BlogStore, 'BlogStore');
