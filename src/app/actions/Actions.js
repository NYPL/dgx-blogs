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

  turnToLoadingState(data) {
    this.dispatch(data);
  }

  handleProfiles(data) {
    this.dispatch(data);
  }

  loadProfiles() {
    this.dispatch();
  }

  /* Actions for app status */
  switchToLoading(title) {
    this.dispatch(title);
  }

  returnToReady() {
    this.dispatch();
  }
}

export default alt.createActions(Actions);
