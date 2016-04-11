import Actions from '../actions/Actions.js';
import alt from 'dgx-alt-center';

class BlogStore {
  constructor() {
    this.bindListeners({
      
    });

    this.on('init', () => {
      this.blogs = [];
      this.blogPost = [];
    });
  }
}

export default alt.createStore(BlogStore, 'BlogStore');
