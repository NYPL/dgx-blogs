// ACTIONS
import alt from 'dgx-alt-center';

class Actions {
  updateBlogs(data) {
    this.dispatch(data);
  }

  addMoreBlogs(data) {
	this.dispatch(data);
  }

  updateBlogPost(data) {
    this.dispatch(data);
  }

  fromCache(cacheKey) {
  	this.dispatch(cacheKey);
  }
}

export default alt.createActions(Actions);
