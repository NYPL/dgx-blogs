import Actions from '../actions/Actions.js';
import alt from 'dgx-alt-center';
import ImmutableUtil from 'alt-utils/lib/ImmutableUtil';
import Immutable from 'immutable';

class BlogStore {
  constructor() {
    this.bindListeners({
      handleBlogs: Actions.UPDATE_BLOGS,
      handleBlogPost: Actions.UPDATE_BLOG_POST,
    });

    this.state = Immutable.Map({
      blogs: Immutable.List([]),
      blogPost: Immutable.List([]),
    });
  }

  handleBlogs(blogs) { console.log('updating blogs in store', blogs);
    this.setState(this.state.setIn(['blogs'], Immutable.List(blogs)));
  }

  handleBlogPost(blogPost) {
    this.setState(this.state.setIn(['blogPost'], Immutable.List( Immutable.Map(blogPost))));
  }
}

BlogStore.displayName = 'BlogStore';

export default alt.createStore(ImmutableUtil(BlogStore));
