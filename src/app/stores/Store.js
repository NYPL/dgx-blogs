import Actions from '../actions/Actions.js';
import alt from 'dgx-alt-center';

class BlogStore {
  constructor() {
    this.bindListeners({
      handleBlogs: Actions.UPDATE_BLOGS,
    });

    this.on('init', () => {
      this.blogs = [];
      this.blogPost = [];
    });
  }

  handleBlogs(blogs) {
    this.blogs = blogs;
  }
}

export default alt.createStore(BlogStore, 'BlogStore');
