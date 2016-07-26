import Actions from '../actions/Actions.js';
import alt from 'dgx-alt-center';
import ImmutableUtil from 'alt-utils/lib/ImmutableUtil';
import Immutable from 'immutable';

class BlogStore {
  constructor() {
    this.bindListeners({
      handleBlogs: Actions.UPDATE_BLOGS,
      handleBlogPost: Actions.UPDATE_BLOG_POST,
      addMoreBlogs: Actions.ADD_MORE_BLOGS,
    });

    this.state = Immutable.Map({
      blogs: Immutable.List([]),
      blogPost: Immutable.List([]),
    });
  }

  handleBlogs(blogs) {
    this.setState(this.state.setIn(['blogs'], Immutable.fromJS(blogs)));
  }

  handleBlogPost(blogPost) {
    this.setState(this.state.setIn(['blogPost'], Immutable.List(Immutable.fromJS(blogPost))));
  }

  addMoreBlogs(blogs) {
    /* add blogs to the store state here */
    const jsStore = this.state.toJS();
    console.log('jsStore', jsStore);
    jsStore.blogs = jsStore.blogs.concat(blogs);
    this.setState(Immutable.fromJS(jsStore));
    console.log('state after adding blogs', this.state);
  }
}

BlogStore.displayName = 'BlogStore';

export default alt.createStore(ImmutableUtil(BlogStore));
