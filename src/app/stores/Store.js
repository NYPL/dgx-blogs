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

    console.log('STORE: state before initialization', this.store);

    // this.state = Immutable.Map({
    //   blogs: Immutable.Map({ blogList: [], meta: { count: 0 } }),
    //   blogPost: Immutable.List([]),
    // });

    this.state = {
      blogs: {
        blogList: [],
        meta: {
          count: 0,
        },
      },
      blogPost: []
    };
  }

  handleBlogs(blogs) {
    console.log('handleBlogs executed');
    //this.setState(this.state.setIn(['blogs'], Immutable.fromJS(blogs)));
    console.log('STORE: data received by handleBlogs', blogs);
    const newState = {
      blogs: {
        blogList: blogs.blogs.blogList,
        meta: {
          count: blogs.blogs.meta.count
        },
      },
      blogPost: this.state.blogPost
    }
    this.setState(newState);
  }

  handleBlogPost(blogPost) {
    console.log('handleBlogPost executed');
    //this.setState(this.state.setIn(['blogPost'], Immutable.List(Immutable.fromJS(blogPost))));
    this.setState({
      blogs: this.state.blogs,
      blogPost: blogPost,
    });
  }

  addMoreBlogs(blogs) {
    console.log('addMoreBlogs executed');
    console.log('STORE: state before convertion to js', this.state);
    /* add blogs to the store state here */
    // const jsStore = this.state.toJS();
    // jsStore.blogs.blogList = jsStore.blogs.blogList;
    // console.log('state converted to js', jsStore);
    // jsStore.blogs = jsStore.blogs.blogList.concat(blogs);
    // this.setState(Immutable.fromJS(jsStore));
    console.log('we have to add this to the store', blogs);

    const newBlogList = this.state.blogs.blogList.concat(blogs.blogList);

    this.setState({
        blogs: {
          blogList: newBlogList,
          meta: this.state.blogs.meta,
        },
        blogPost: this.state.blogPost,
      });
  }
}

BlogStore.displayName = 'BlogStore';

export default alt.createStore(BlogStore);

//export default alt.createStore(ImmutableUtil(BlogStore));
